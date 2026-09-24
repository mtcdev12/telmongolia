import { createHash, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { recordAssistantEvent } from "@/lib/chatbot/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const searchSchema = z.object({
  pattern: z
    .string()
    .trim()
    .regex(/^[\d_]{8}$/, "Хайх дугаарын загвар буруу байна.")
    .default("________"),
  grade: z.enum(["A", "G1", "G2", "G3", "S", "C", "N"]).default("A"),
  page: z.coerce.number().int().min(1).max(10_000).default(1),
});

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalSearchRateLimit = globalThis as typeof globalThis & {
  telecomNumberSearchRateLimit?: Map<string, RateLimitEntry>;
};
const numberSearchRateLimit =
  globalSearchRateLimit.telecomNumberSearchRateLimit ??
  (globalSearchRateLimit.telecomNumberSearchRateLimit = new Map<
    string,
    RateLimitEntry
  >());

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_REQUESTS = 30;
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
  const current = numberSearchRateLimit.get(key);

  if (!current || current.resetAt <= now) {
    numberSearchRateLimit.set(key, {
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

function getSearchEndpoint() {
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

function readAvailableNumbers(value: unknown) {
  if (!value || typeof value !== "object") return [];

  const response = value as {
    data?: {
      objects?: unknown;
    };
  };
  const objects = response.data?.objects;
  if (!Array.isArray(objects)) return [];

  return objects
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as { num?: unknown; grade?: unknown };
      const number = String(record.num ?? "").trim();
      if (!/^\d{8}$/.test(number)) return null;

      return {
        number,
        grade:
          typeof record.grade === "string"
            ? record.grade.slice(0, 10)
            : null,
      };
    })
    .filter(
      (
        item
      ): item is {
        number: string;
        grade: string | null;
      } => item !== null
    )
    .slice(0, 12);
}

export async function GET(request: NextRequest) {
  const requestId = randomUUID();
  const fetchSite = request.headers.get("sec-fetch-site");
  const requestOrigin = request.headers.get("origin");

  if (
    fetchSite === "cross-site" ||
    (requestOrigin && requestOrigin !== request.nextUrl.origin)
  ) {
    return json({ error: "Зөвшөөрөгдөөгүй хүсэлт байна." }, 403);
  }

  const rateLimit = checkRateLimit(getClientKey(request));
  if (!rateLimit.allowed) {
    return json(
      { error: "Түр хүлээгээд дахин оролдоно уу." },
      429,
      { "Retry-After": String(rateLimit.retryAfter) }
    );
  }

  const parsed = searchSchema.safeParse({
    pattern: request.nextUrl.searchParams.get("pattern") ?? undefined,
    grade: request.nextUrl.searchParams.get("grade") ?? undefined,
    page: request.nextUrl.searchParams.get("page") ?? undefined,
  });
  if (!parsed.success) {
    return json(
      {
        error:
          parsed.error.issues[0]?.message ?? "Хайлтын мэдээлэл буруу байна.",
      },
      400
    );
  }

  const endpoint = getSearchEndpoint();
  if (!endpoint) {
    await recordAssistantEvent({
      type: "number-search",
      outcome: "error",
      action: "number-order",
      source: "not-configured",
    });
    return json(
      {
        error: "Одоогоор сул дугаарын жагсаалт авах боломжгүй байна.",
        requestId,
      },
      503
    );
  }

  endpoint.searchParams.set("pattern", parsed.data.pattern);
  endpoint.searchParams.set("grade", parsed.data.grade);
  endpoint.searchParams.set("page", String(parsed.data.page));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      await recordAssistantEvent({
        type: "number-search",
        outcome: "error",
        action: "number-order",
        source: "upstream",
      });
      return json(
        {
          error: "Сул дугаарын жагсаалт авах боломжгүй байна.",
          requestId,
        },
        502
      );
    }

    const result = (await response.json()) as {
      result?: string;
      message?: string;
      data?: unknown;
    };
    const numbers = readAvailableNumbers(result);

    await recordAssistantEvent({
      type: "number-search",
      outcome: "success",
      action: "number-order",
      source: "upstream",
    });

    return json({
      result: numbers.length > 0 ? "ok" : "not found",
      numbers,
      page: parsed.data.page,
      hasMore: numbers.length === 12,
      message:
        numbers.length > 0
          ? ""
          : typeof result.message === "string"
          ? result.message.slice(0, 200)
          : "Сул дугаар олдсонгүй.",
      requestId,
    });
  } catch (error) {
    const timedOut =
      error instanceof DOMException && error.name === "AbortError";
    await recordAssistantEvent({
      type: "number-search",
      outcome: "error",
      action: "number-order",
      source: timedOut ? "timeout" : "upstream",
    });
    return json(
      {
        error: timedOut
          ? "Сул дугаарын жагсаалт удааширлаа."
          : "Сул дугаарын жагсаалт авах боломжгүй байна.",
        requestId,
      },
      502
    );
  } finally {
    clearTimeout(timeout);
  }
}
