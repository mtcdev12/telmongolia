import { createHash, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { recordAssistantEvent } from "@/lib/chatbot/analytics";
import { VERIFIED_SERVICE_LOCATIONS } from "@/lib/chatbot/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const serviceNumber = z
  .string()
  .trim()
  .regex(/^\d{4,12}$/, "Үйлчилгээний дугаар буруу байна.");
const phone = z
  .string()
  .trim()
  .regex(/^\d{8}$/, "Холбоо барих утас 8 оронтой байна.");
const shortText = z.string().trim().min(2).max(120);
const appointmentDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const date = new Date(`${value}T00:00:00+08:00`);
    if (Number.isNaN(date.getTime())) return false;
    const normalized = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Ulaanbaatar",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
    return normalized === value;
  }, "Өдрийн утга буруу байна.");
const appointmentServices = [
  "Лавлагаа, зөвлөгөө",
  "Шинэ үйлчилгээ",
  "Гэрээ, шилжилт хөдөлгөөн",
  "Төлбөр, тооцоо",
] as const;

const actionSchema = z
  .discriminatedUnion("action", [
  z
    .object({
      action: z.literal("outage-check"),
      locale: z.enum(["mn", "en"]).default("mn"),
      serviceNumber: serviceNumber.optional(),
      location: shortText.optional(),
    })
    .strict(),
  z
    .object({
      action: z.literal("bill-explain"),
      locale: z.enum(["mn", "en"]).default("mn"),
      serviceNumber,
    })
    .strict(),
  z
    .object({
      action: z.literal("ticket-create"),
      locale: z.enum(["mn", "en"]).default("mn"),
      serviceNumber,
      phone,
      location: shortText,
      issue: z.string().trim().min(5).max(500),
      preferredTime: z.string().trim().max(60).optional(),
    })
    .strict(),
  z
    .object({
      action: z.literal("appointment-book"),
      locale: z.enum(["mn", "en"]).default("mn"),
      branch: shortText.refine(
        (value) =>
          VERIFIED_SERVICE_LOCATIONS.some((location) => location.name === value),
        "Салбараа жагсаалтаас сонгоно уу."
      ),
      service: z.enum(appointmentServices),
      date: appointmentDate,
      phone,
    })
    .strict(),
  z
    .object({
      action: z.literal("human-handoff"),
      locale: z.enum(["mn", "en"]).default("mn"),
      phone,
      channel: z.enum(["chat", "phone"]),
      summary: z.string().trim().min(5).max(1_500),
    })
    .strict(),
  ])
  .superRefine((value, context) => {
    if (
      value.action === "outage-check" &&
      !value.serviceNumber &&
      !value.location
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Үйлчилгээний дугаар эсвэл байршлаа оруулна уу.",
      });
    }

    if (value.action === "appointment-book") {
      const now = new Date();
      const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Ulaanbaatar",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(now);
      if (value.date < today) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["date"],
          message: "Өнгөрсөн өдөр сонгох боломжгүй.",
        });
      }
    }
  });

type ActionName = z.infer<typeof actionSchema>["action"];
type RateLimitEntry = { count: number; resetAt: number };
const globalStore = globalThis as typeof globalThis & {
  telecomActionRateLimit?: Map<string, RateLimitEntry>;
};
const rateLimitStore =
  globalStore.telecomActionRateLimit ??
  (globalStore.telecomActionRateLimit = new Map<string, RateLimitEntry>());

const ACTION_URL_ENV: Record<ActionName, string> = {
  "outage-check": "TELECOM_OUTAGE_API_URL",
  "bill-explain": "TELECOM_BILLING_API_URL",
  "ticket-create": "TELECOM_TICKET_API_URL",
  "appointment-book": "TELECOM_APPOINTMENT_API_URL",
  "human-handoff": "TELECOM_HANDOFF_API_URL",
};

const UPSTREAM_TIMEOUT_MS = 15_000;

function json(body: unknown, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function checkRateLimit(request: NextRequest) {
  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = createHash("sha256").update(address).digest("hex");
  const now = Date.now();
  const current = rateLimitStore.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + 10 * 60_000 });
    return { allowed: true, retryAfter: 0 };
  }
  if (current.count >= 12) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }
  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function getEndpoint(action: ActionName) {
  const value = process.env[ACTION_URL_ENV[action]]?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    const isLocal =
      url.protocol === "http:" &&
      ["127.0.0.1", "localhost"].includes(url.hostname);
    return url.protocol === "https:" || isLocal ? url : null;
  } catch {
    return null;
  }
}

function readPrimitive(
  value: Record<string, unknown>,
  keys: string[]
) {
  return Object.fromEntries(
    keys.flatMap((key) => {
      const item = value[key];
      return ["string", "number", "boolean"].includes(typeof item)
        ? [[key, item]]
        : [];
    })
  );
}

function sanitizeActionData(action: ActionName, data: unknown) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const value = data as Record<string, unknown>;

  if (action === "outage-check") {
    return readPrimitive(value, [
      "status",
      "affectedArea",
      "startedAt",
      "estimatedResolution",
      "description",
    ]);
  }
  if (action === "bill-explain") {
    return readPrimitive(value, [
      "period",
      "previousBalance",
      "serviceCharge",
      "additionalCharge",
      "payments",
      "total",
      "dueDate",
      "status",
    ]);
  }
  return null;
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const requestOrigin = request.headers.get("origin");
  if (
    request.headers.get("sec-fetch-site") === "cross-site" ||
    (requestOrigin && requestOrigin !== request.nextUrl.origin)
  ) {
    return json({ error: "Зөвшөөрөгдөөгүй хүсэлт байна." }, 403);
  }

  const rateLimit = checkRateLimit(request);
  if (!rateLimit.allowed) {
    return json(
      { error: "Түр хүлээгээд дахин оролдоно уу." },
      429,
      { "Retry-After": String(rateLimit.retryAfter) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Мэдээлэл буруу байна." }, 400);
  }

  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        error:
          parsed.error.issues[0]?.message ?? "Оруулсан мэдээллээ шалгана уу.",
      },
      400
    );
  }

  const endpoint = getEndpoint(parsed.data.action);
  if (!endpoint) {
    await recordAssistantEvent({
      type: "action",
      outcome: "error",
      action: parsed.data.action,
      source: "not-configured",
    });
    return json(
      {
        error: "Энэ үйлчилгээг одоогоор чатаас ашиглах боломжгүй байна.",
        requestId,
      },
      503
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const token = process.env.TELECOM_INTEGRATION_TOKEN?.trim();
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
      signal: controller.signal,
    });
    const result = (await response.json()) as {
      result?: string;
      message?: string;
      referenceId?: string | number;
      data?: unknown;
    };

    if (!response.ok) {
      await recordAssistantEvent({
        type: "action",
        outcome: "error",
        action: parsed.data.action,
        source: "upstream",
      });
      return json(
        {
          error:
            typeof result.message === "string"
              ? result.message.slice(0, 300)
              : "Хүсэлтийг боловсруулж чадсангүй.",
          requestId,
        },
        response.status >= 400 && response.status < 500 ? 400 : 502
      );
    }

    await recordAssistantEvent({
      type: "action",
      outcome: "success",
      action: parsed.data.action,
      source: "upstream",
    });

    return json({
      result: result.result ?? "ok",
      message:
        typeof result.message === "string"
          ? result.message.slice(0, 500)
          : "Хүсэлт амжилттай хүлээн авлаа.",
      referenceId:
        typeof result.referenceId === "string" ||
        typeof result.referenceId === "number"
          ? result.referenceId
          : null,
      data:
        parsed.data.action === "outage-check" ||
        parsed.data.action === "bill-explain"
          ? sanitizeActionData(parsed.data.action, result.data)
          : null,
      requestId,
    });
  } catch (error) {
    const timedOut =
      error instanceof DOMException && error.name === "AbortError";
    await recordAssistantEvent({
      type: "action",
      outcome: "error",
      action: parsed.data.action,
      source: timedOut ? "timeout" : "upstream",
    });
    return json(
      {
        error: timedOut
          ? "Хариу удааширлаа. Дахин оролдоно уу."
          : "Хүсэлтийг одоогоор илгээх боломжгүй байна.",
        requestId,
      },
      502
    );
  } finally {
    clearTimeout(timeout);
  }
}
