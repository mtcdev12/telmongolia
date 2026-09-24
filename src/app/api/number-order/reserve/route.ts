import { createHash, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { recordAssistantEvent } from "@/lib/chatbot/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const reservationSchema = z.object({
  number: z
    .string()
    .trim()
    .regex(/^\d{8}$/, "Дугаар 8 оронтой байна."),
  email: z
    .string()
    .trim()
    .email("И-мэйл хаяг буруу байна.")
    .max(50, "И-мэйл хаяг хэт урт байна."),
  register: z
    .string()
    .trim()
    .min(10, "Регистрийн дугаар дутуу байна.")
    .max(20, "Регистрийн дугаар хэт урт байна.")
    .transform((value) => value.toLocaleUpperCase("mn")),
  place: z
    .string()
    .trim()
    .min(2, "Байршлаа оруулна уу.")
    .max(35, "Байршлын нэр хэт урт байна."),
});

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalReservationRateLimit = globalThis as typeof globalThis & {
  telecomReservationRateLimit?: Map<string, RateLimitEntry>;
};
const reservationRateLimit =
  globalReservationRateLimit.telecomReservationRateLimit ??
  (globalReservationRateLimit.telecomReservationRateLimit = new Map<
    string,
    RateLimitEntry
  >());

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_REQUESTS = 5;
const MAX_REQUEST_BYTES = 2_000;
const UPSTREAM_TIMEOUT_MS = 15_000;

function json(body: unknown, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address = forwardedFor?.split(",")[0]?.trim() || "local";
  return createHash("sha256").update(address).digest("hex");
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = reservationRateLimit.get(key);

  if (!current || current.resetAt <= now) {
    reservationRateLimit.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function getReservationEndpoint() {
  const configuredOrigin = (
    process.env.NUMBER_ORDER_API_ORIGIN ??
    process.env.API ??
    ""
  ).trim();
  if (!configuredOrigin) return null;

  try {
    const origin = new URL(configuredOrigin);
    const isLocal =
      origin.protocol === "http:" &&
      ["127.0.0.1", "localhost"].includes(origin.hostname);
    if (origin.protocol !== "https:" && !isLocal) return null;
    return new URL("/booknumber", origin.origin);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const fetchSite = request.headers.get("sec-fetch-site");
  const requestOrigin = request.headers.get("origin");

  if (
    fetchSite === "cross-site" ||
    (requestOrigin && requestOrigin !== request.nextUrl.origin)
  ) {
    return json({ error: "Зөвшөөрөгдөөгүй хүсэлт байна." }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ error: "JSON хүсэлт шаардлагатай." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return json({ error: "Хүсэлтийн хэмжээ хэтэрсэн байна." }, 413);
  }

  const rateLimit = checkRateLimit(getClientKey(request));
  if (!rateLimit.allowed) {
    return json(
      { error: "Хэт олон захиалгын хүсэлт илгээлээ. Түр хүлээнэ үү." },
      429,
      { "Retry-After": String(rateLimit.retryAfter) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "JSON өгөгдөл буруу байна." }, 400);
  }

  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        error:
          parsed.error.issues[0]?.message ??
          "Захиалгын мэдээлэл буруу байна.",
      },
      400
    );
  }

  const endpoint = getReservationEndpoint();
  if (!endpoint) {
    await recordAssistantEvent({
      type: "number-order",
      outcome: "error",
      action: "number-order",
      source: "not-configured",
    });
    return json(
      {
        error:
          "Дугаар захиалгын серверийн тохиргоо одоогоор бэлэн биш байна.",
        requestId,
      },
      503
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
      signal: controller.signal,
    });

    const result = (await response.json()) as {
      result?: string;
      message?: string;
      data?: unknown;
    };

    if (!response.ok) {
      await recordAssistantEvent({
        type: "number-order",
        outcome: "error",
        action: "number-order",
        source: "upstream",
      });
      return json(
        {
          error: "Дугаар захиалгын сервер хүсэлтийг боловсруулж чадсангүй.",
          requestId,
        },
        502
      );
    }

    await recordAssistantEvent({
      type: "number-order",
      outcome: result.result === "ok" ? "success" : "error",
      action: "number-order",
      source: "upstream",
    });

    return json({
      result: result.result ?? "error",
      message:
        typeof result.message === "string"
          ? result.message.slice(0, 500)
          : "Захиалгын хариу тодорхойгүй байна.",
      data:
        typeof result.data === "string" || typeof result.data === "number"
          ? result.data
          : null,
      requestId,
    });
  } catch (error) {
    const timedOut =
      error instanceof DOMException && error.name === "AbortError";
    await recordAssistantEvent({
      type: "number-order",
      outcome: "error",
      action: "number-order",
      source: timedOut ? "timeout" : "upstream",
    });
    return json(
      {
        error: timedOut
          ? "Дугаар захиалгын сервер хариу өгөхгүй удлаа."
          : "Дугаар захиалгын сервертэй холбогдож чадсангүй.",
        requestId,
      },
      502
    );
  } finally {
    clearTimeout(timeout);
  }
}
