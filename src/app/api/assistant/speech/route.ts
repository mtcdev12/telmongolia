import { NextRequest } from "next/server";
import { z } from "zod";
import { chimegeRequest, guardVoiceRequest, readVoiceBody, VoiceError, voiceErrorResponse } from "@/lib/chatbot/voice-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const schema = z.object({ text: z.string().trim().min(1).max(4000) }).strict();

export async function POST(request: NextRequest) {
  try {
    guardVoiceRequest(request);
    if (request.headers.get("content-type")?.split(";")[0] !== "application/json") throw new VoiceError(415, "TYPE");
    const bytes = await readVoiceBody(request, 24_000);
    let body: unknown;
    try { body = JSON.parse(bytes.toString("utf8")); } catch { throw new VoiceError(400, "JSON"); }
    const parsed = schema.safeParse(body);
    if (!parsed.success) throw new VoiceError(400, "TEXT");
    const response = await chimegeRequest("synthesize", parsed.data.text, "text/plain; charset=utf-8");
    const audio = await response.arrayBuffer();
    const header = new TextDecoder().decode(audio.slice(0, 12));
    if (audio.byteLength <= 44 || audio.byteLength > 20_000_000 || !header.startsWith("RIFF") || !header.endsWith("WAVE")) {
      throw new VoiceError(502, "INVALID_SYNTHESIS");
    }
    return new Response(audio, { headers: { "Content-Type": "audio/wav", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  } catch (error) { return voiceErrorResponse(error); }
}
