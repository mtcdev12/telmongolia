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
    const locale = request.headers.get("x-voice-locale") === "en" ? "en" : "mn";
    let text: string;
    if (locale === "en") {
      const apiKey = process.env.OPENAI_API_KEY?.trim();
      if (!apiKey) throw new VoiceError(503, "OPENAI_NOT_CONFIGURED");
      const form = new FormData();
      form.set("model", "whisper-1");
      form.set("language", "en");
      form.set("file", new Blob([audio], { type: "audio/wav" }), "voice.wav");
      const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
        body: form,
        signal: AbortSignal.timeout(25_000),
      });
      if (!response.ok) {
        await response.body?.cancel();
        throw new VoiceError(502, `OPENAI_TRANSCRIBE_HTTP_${response.status}`);
      }
      const result = await response.json() as { text?: unknown };
      text = typeof result.text === "string" ? result.text.trim() : "";
    } else {
      const response = await chimegeRequest("transcribe", new Uint8Array(audio), "application/octet-stream");
      text = (await response.text()).trim();
    }
    if (!text || text.length > 2000) throw new VoiceError(502, "INVALID_TRANSCRIPT");
    return NextResponse.json({ text }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return voiceErrorResponse(error); }
}
