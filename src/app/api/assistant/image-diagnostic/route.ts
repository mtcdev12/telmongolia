import { createHash, randomUUID } from "node:crypto";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { z } from "zod";

import { recordAssistantEvent } from "@/lib/chatbot/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requestSchema = z
  .object({
    image: z
      .string()
      .max(7_000_000)
      .regex(/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/),
    question: z.string().trim().max(500).default(""),
    sessionId: z.string().regex(/^[A-Za-z0-9_-]{16,128}$/),
    locale: z.enum(["mn", "en"]).default("mn"),
  })
  .strict();

type RateLimitEntry = { count: number; resetAt: number };
const globalStore = globalThis as typeof globalThis & {
  telecomImageRateLimit?: Map<string, RateLimitEntry>;
};
const rateLimitStore =
  globalStore.telecomImageRateLimit ??
  (globalStore.telecomImageRateLimit = new Map<string, RateLimitEntry>());

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const AI_TIMEOUT_MS = 30_000;
const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

const DIAGNOSTIC_INSTRUCTIONS = `
Та Монголын Цахилгаан Холбооны хэрэглэгчийн төхөөрөмжийн зураг шалгах туслах.
Зөвхөн зурагт бодитоор харагдаж байгаа модем, ONT, router, set-top box, кабель,
гэрлийн төлөв болон алдааны бичгийг тайлбарла. Харагдахгүй зүйл зохиохгүй.
Эхлээд ажигласан зүйлээ нэг өгүүлбэрээр хэлээд, дараа нь хэрэглэгч өөрөө аюулгүй
хийж болох 3-5 богино алхам өг. Цахилгааны ил утас, түлэгдсэн хэсэг, утаа
харагдвал төхөөрөмжид хүрэхгүй салгаж 7000-8000 дугаарт хандахыг хэл.
Монгол хэлээр энгийн, товч хариул. Зураг төхөөрөмжийнх биш бол үүнийг шууд хэл.
`;

const ENGLISH_DIAGNOSTIC_INSTRUCTIONS = `
You are a device-photo troubleshooting assistant for Telecom Mongolia.
Describe only what is genuinely visible in the image: modem, ONT, router,
set-top box, cables, indicator lights and error messages. Never invent details.
Begin with one sentence describing the observation, then give 3–5 short and
safe steps the customer can perform. If exposed wiring, burns or smoke are
visible, tell the customer not to touch the device, disconnect power only when
safe, and call 7000-8000. Reply in clear, concise English. If the image is not
of a relevant device, say so directly.
`;

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
  if (current.count >= 8) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }
  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function getProvider() {
  const configured = process.env.AI_PROVIDER?.trim().toLowerCase();
  if (configured === "gemini" || configured === "openai") return configured;
  if (process.env.GEMINI_API_KEY?.trim()) return "gemini";
  if (process.env.OPENAI_API_KEY?.trim()) return "openai";
  return null;
}

async function normalizeImage(dataUrl: string) {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const original = Buffer.from(base64, "base64");
  if (original.length === 0 || original.length > MAX_IMAGE_BYTES) {
    throw new Error("IMAGE_SIZE");
  }

  const metadata = await sharp(original).metadata();
  if (
    !metadata.width ||
    !metadata.height ||
    metadata.width < 64 ||
    metadata.height < 64 ||
    metadata.width > 8_000 ||
    metadata.height > 8_000
  ) {
    throw new Error("IMAGE_DIMENSIONS");
  }

  const optimized = await sharp(original)
    .rotate()
    .resize({
      width: 1_600,
      height: 1_600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return `data:image/jpeg;base64,${optimized.toString("base64")}`;
}

async function diagnoseWithGemini(
  image: string,
  question: string,
  locale: "mn" | "en"
) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error("AI_NOT_CONFIGURED");
  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model
      )}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text:
                  locale === "en"
                    ? ENGLISH_DIAGNOSTIC_INSTRUCTIONS
                    : DIAGNOSTIC_INSTRUCTIONS,
              },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    question ||
                    (locale === "en"
                      ? "Please inspect this device photo and help me troubleshoot it."
                      : "Энэ төхөөрөмжийн зураг дээр юу харагдаж байгааг шалгаад туслаарай."),
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: image.slice(image.indexOf(",") + 1),
                  },
                },
              ],
            },
          ],
          generationConfig: { maxOutputTokens: 900 },
        }),
        cache: "no-store",
        signal: controller.signal,
      }
    );
    if (!response.ok) throw new Error("AI_REQUEST_FAILED");
    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };
    const answer =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim() ?? "";
    if (!answer) throw new Error("AI_EMPTY");
    return answer;
  } finally {
    clearTimeout(timeout);
  }
}

async function diagnoseWithOpenAI(
  image: string,
  question: string,
  locale: "mn" | "en"
) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) throw new Error("AI_NOT_CONFIGURED");
  const client = new OpenAI({
    apiKey,
    timeout: AI_TIMEOUT_MS,
    maxRetries: 2,
  });
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL?.trim() || "gpt-5.6-sol",
    instructions:
      locale === "en"
        ? ENGLISH_DIAGNOSTIC_INSTRUCTIONS
        : DIAGNOSTIC_INSTRUCTIONS,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              question ||
              (locale === "en"
                ? "Please inspect this device photo and help me troubleshoot it."
                : "Энэ төхөөрөмжийн зураг дээр юу харагдаж байгааг шалгаад туслаарай."),
          },
          { type: "input_image", image_url: image, detail: "low" },
        ],
      },
    ],
    max_output_tokens: 900,
    store: false,
  });
  const answer = response.output_text.trim();
  if (!answer) throw new Error("AI_EMPTY");
  return answer;
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
    return json({ error: "Зургийн мэдээлэл буруу байна." }, 400);
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "JPEG, PNG эсвэл WebP зураг сонгоно уу." }, 400);
  }

  const provider = getProvider();
  if (!provider) {
    await recordAssistantEvent({
      type: "image",
      outcome: "error",
      source: "not-configured",
    });
    return json({ error: "Зураг шалгах боломж одоогоор идэвхгүй байна." }, 503);
  }

  try {
    const image = await normalizeImage(parsed.data.image);
    const answer =
      provider === "gemini"
        ? await diagnoseWithGemini(
            image,
            parsed.data.question,
            parsed.data.locale
          )
        : await diagnoseWithOpenAI(
            image,
            parsed.data.question,
            parsed.data.locale
          );
    await recordAssistantEvent({
      type: "image",
      outcome: "success",
      source: provider,
    });
    return json({ answer, requestId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN";
    if (message === "IMAGE_SIZE" || message === "IMAGE_DIMENSIONS") {
      await recordAssistantEvent({
        type: "image",
        outcome: "error",
        source: "invalid-image",
      });
      return json({ error: "Зургийн хэмжээ эсвэл нягтралыг шалгана уу." }, 400);
    }
    console.error("Image diagnostic failed", { requestId, provider, message });
    await recordAssistantEvent({
      type: "image",
      outcome: "error",
      source: provider,
    });
    return json(
      { error: "Зургийг одоогоор шалгаж чадсангүй. Дахин оролдоно уу." },
      502
    );
  }
}
