import "server-only";
import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

type Limit = { count: number; resetAt: number };
const voiceGlobal = globalThis as typeof globalThis & { telecomVoiceLimits?: Map<string, Limit> };
const limits = voiceGlobal.telecomVoiceLimits ??= new Map<string, Limit>();

export class VoiceError extends Error {
  constructor(public status: number, public code: string) { super(code); }
}

export function guardVoiceRequest(request: NextRequest) {
  const origin = request.headers.get("origin");
  // Next.js may canonicalize nextUrl to localhost while the browser uses 127.0.0.1.
  // Compare with the actual requested Host (also preserves reverse-proxy hosts).
  let sameOrigin = !origin;
  if (origin) {
    try {
      const originUrl = new URL(origin);
      sameOrigin = ["http:", "https:"].includes(originUrl.protocol)
        && originUrl.host === (request.headers.get("host") || request.nextUrl.host);
    } catch { sameOrigin = false; }
  }
  if (request.headers.get("sec-fetch-site") === "cross-site" || !sameOrigin) {
    throw new VoiceError(403, "ORIGIN");
  }
  const now = Date.now();
  limits.forEach((value, key) => { if (value.resetAt <= now) limits.delete(key); });
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = createHash("sha256").update(address).digest("hex");
  const entry = limits.get(key);
  if ((entry && entry.count >= 12) || (!entry && limits.size >= 10_000)) throw new VoiceError(429, "RATE_LIMIT");
  if (entry) entry.count++;
  else limits.set(key, { count: 1, resetAt: now + 60_000 });
}

export async function readVoiceBody(request: NextRequest, maxBytes: number) {
  if (Number(request.headers.get("content-length")) > maxBytes) throw new VoiceError(413, "SIZE");
  if (!request.body) throw new VoiceError(400, "EMPTY");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new VoiceError(413, "SIZE"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks);
}

export async function chimegeRequest(endpoint: "transcribe" | "synthesize", body: BodyInit, contentType: string) {
  const token = process.env.CHIMEGE_TOKEN?.trim();
  if (!token) throw new VoiceError(503, "CHIMEGE_NOT_CONFIGURED");
  const response = await fetch(`https://api.chimege.com/v1.2/${endpoint}`, {
    method: "POST",
    headers: {
      Token: token,
      "Content-Type": contentType,
      ...(endpoint === "transcribe" ? { Punctuate: "true" } : { "voice-id": process.env.CHIMEGE_VOICE?.trim() || "FEMALE3v2" }),
    },
    body,
    signal: AbortSignal.timeout(25_000),
    redirect: "error",
    cache: "no-store",
  });
  if (!response.ok) {
    await response.body?.cancel();
    throw new VoiceError(502, `CHIMEGE_HTTP_${response.status}`);
  }
  return response;
}

export function voiceErrorResponse(error: unknown) {
  const status = error instanceof VoiceError ? error.status : 502;
  console.warn("Telecom voice request failed", { code: error instanceof VoiceError ? error.code : "VOICE_UNAVAILABLE" });
  const message = status === 429
    ? "Түр хүлээгээд дахин оролдоно уу."
    : status < 500
    ? "Дууны мэдээллийг хүлээн авч чадсангүй. Дахин бичиж үзнэ үү."
    : "Дууны үйлчилгээ түр боломжгүй байна. Асуултаа бичгээр оруулна уу.";
  return NextResponse.json({ error: message }, {
    status,
    headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "60" } : {}) },
  });
}
