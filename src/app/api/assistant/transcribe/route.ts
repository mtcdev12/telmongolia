import { NextRequest, NextResponse } from "next/server";
import { isVoiceWav, MAX_VOICE_BYTES } from "@/lib/chatbot/audio";
import { chimegeRequest, guardVoiceRequest, readVoiceBody, VoiceError, voiceErrorResponse } from "@/lib/chatbot/voice-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    guardVoiceRequest(request);
    if (request.headers.get("content-type")?.split(";")[0] !== "audio/wav") throw new VoiceError(415, "TYPE");
    const audio = await readVoiceBody(request, MAX_VOICE_BYTES);
    if (!isVoiceWav(audio)) throw new VoiceError(400, "INVALID_WAV");
    const response = await chimegeRequest("transcribe", new Uint8Array(audio), "application/octet-stream");
    const text = (await response.text()).trim();
    if (!text || text.length > 2000) throw new VoiceError(502, "INVALID_TRANSCRIPT");
    return NextResponse.json({ text }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return voiceErrorResponse(error); }
}
