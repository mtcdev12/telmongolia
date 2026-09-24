export const VOICE_SAMPLE_RATE = 16_000;
export const MAX_VOICE_SECONDS = 30;
export const MAX_VOICE_BYTES = 44 + VOICE_SAMPLE_RATE * MAX_VOICE_SECONDS * 2;

// Canonical mono, 16 kHz, signed PCM16 WAV. No server transcoder is required.
export function encodeVoiceWav(channels: Float32Array[], sampleRate: number): ArrayBuffer {
  if (!channels.length || !channels[0].length || !Number.isFinite(sampleRate) || sampleRate < VOICE_SAMPLE_RATE) {
    throw new Error("INVALID_AUDIO");
  }
  const sourceLength = channels[0].length;
  if (channels.some((channel) => channel.length !== sourceLength)) throw new Error("INVALID_AUDIO");
  const frames = Math.min(Math.floor(sourceLength * VOICE_SAMPLE_RATE / sampleRate), VOICE_SAMPLE_RATE * MAX_VOICE_SECONDS);
  const result = new ArrayBuffer(44 + frames * 2);
  const view = new DataView(result);
  const writeText = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
  };
  writeText(0, "RIFF"); view.setUint32(4, result.byteLength - 8, true);
  writeText(8, "WAVE"); writeText(12, "fmt "); view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, VOICE_SAMPLE_RATE, true); view.setUint32(28, VOICE_SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  writeText(36, "data"); view.setUint32(40, frames * 2, true);
  for (let i = 0; i < frames; i++) {
    const start = Math.floor(i * sampleRate / VOICE_SAMPLE_RATE);
    const end = Math.min(sourceLength, Math.floor((i + 1) * sampleRate / VOICE_SAMPLE_RATE));
    let sum = 0;
    for (let j = start; j < end; j++) for (const channel of channels) sum += channel[j];
    const sample = Math.max(-1, Math.min(1, sum / ((end - start) * channels.length)));
    view.setInt16(44 + i * 2, sample < 0 ? sample * 32768 : sample * 32767, true);
  }
  return result;
}

export function isVoiceWav(bytes: Uint8Array) {
  if (bytes.byteLength < 44 + VOICE_SAMPLE_RATE / 5 || bytes.byteLength > MAX_VOICE_BYTES) return false;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const text = (start: number, length: number) => String.fromCharCode(...Array.from(bytes.slice(start, start + length)));
  return text(0, 4) === "RIFF" && text(8, 4) === "WAVE" && text(12, 4) === "fmt " && text(36, 4) === "data"
    && view.getUint32(4, true) === bytes.byteLength - 8 && view.getUint32(16, true) === 16
    && view.getUint16(20, true) === 1 && view.getUint16(22, true) === 1
    && view.getUint32(24, true) === VOICE_SAMPLE_RATE && view.getUint32(28, true) === VOICE_SAMPLE_RATE * 2
    && view.getUint16(32, true) === 2 && view.getUint16(34, true) === 16
    && view.getUint32(40, true) === bytes.byteLength - 44 && (bytes.byteLength - 44) % 2 === 0;
}
