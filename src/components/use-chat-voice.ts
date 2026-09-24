"use client";

import { useEffect, useRef, useState } from "react";
import { encodeVoiceWav, MAX_VOICE_SECONDS } from "@/lib/chatbot/audio";

type Recognition = {
  lang: string; interimResults: boolean; continuous: boolean;
  onresult: ((event: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void) | null;
  onend: (() => void) | null; onerror: (() => void) | null;
  start(): void; stop(): void;
};
type VoiceWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
  SpeechRecognition?: new () => Recognition;
  webkitSpeechRecognition?: new () => Recognition;
};
type Capture = { recorder: MediaRecorder; stream: MediaStream; context: AudioContext; timer: number };

export function useChatVoice({ locale, enabled, onTranscript, onError }: {
  locale: "mn" | "en"; enabled: boolean;
  onTranscript: (text: string) => void; onError: (text: string) => void;
}) {
  const [available, setAvailable] = useState(false);
  const [isListening, setListening] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const capture = useRef<Capture | null>(null);
  const recognition = useRef<Recognition | null>(null);
  const captureEpoch = useRef(0);
  const captureBusy = useRef(false);
  const upload = useRef<AbortController | null>(null);
  const speechRequest = useRef<AbortController | null>(null);
  const speechContext = useRef<AudioContext | null>(null);
  const activeSpeech = useRef<string | null>(null);
  const callbacks = useRef({ onTranscript, onError });
  callbacks.current = { onTranscript, onError };

  const voiceError = () => locale === "en"
    ? "Voice is temporarily unavailable. Please type your question."
    : "Дууны үйлчилгээ түр боломжгүй байна. Асуултаа бичгээр оруулна уу.";

  function releaseCapture() {
    const current = capture.current;
    if (!current) return;
    capture.current = null;
    window.clearTimeout(current.timer);
    current.recorder.onstop = null;
    if (current.recorder.state !== "inactive") current.recorder.stop();
    current.stream.getTracks().forEach((track) => track.stop());
    if (current.context.state !== "closed") void current.context.close();
  }

  function stopSpeech() {
    speechRequest.current?.abort();
    speechRequest.current = null;
    const context = speechContext.current;
    speechContext.current = null;
    if (context && context.state !== "closed") void context.close();
    window.speechSynthesis?.cancel();
    activeSpeech.current = null;
    setSpeakingId(null);
  }

  function cancelCapture() {
    captureEpoch.current++;
    captureBusy.current = false;
    upload.current?.abort();
    if (recognition.current) {
      recognition.current.onresult = null;
      recognition.current.onend = null;
      recognition.current.onerror = null;
      recognition.current.stop();
      recognition.current = null;
    }
    releaseCapture();
    setListening(false);
    setProcessing(false);
  }

  useEffect(() => {
    const browser = window as VoiceWindow;
    setAvailable(locale === "mn"
      ? typeof navigator.mediaDevices?.getUserMedia === "function" && typeof window.MediaRecorder === "function" && typeof (browser.AudioContext || browser.webkitAudioContext) === "function"
      : Boolean(browser.SpeechRecognition || browser.webkitSpeechRecognition));
    return () => {
      cancelCapture();
      stopSpeech();
    };
    // Closing the widget or switching language stops the microphone and playback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, enabled]);

  async function toggleRecording() {
    if (!enabled) return;
    if (isListening) {
      if (locale === "en") recognition.current?.stop();
      else if (capture.current?.recorder.state === "recording") capture.current.recorder.stop();
      return;
    }
    if (captureBusy.current) return;
    callbacks.current.onError("");
    stopSpeech();
    const browser = window as VoiceWindow;

    if (locale === "en") {
      const Constructor = browser.SpeechRecognition || browser.webkitSpeechRecognition;
      if (!Constructor) return;
      const recognizer = new Constructor();
      recognizer.lang = "en-US";
      recognizer.interimResults = false;
      recognizer.continuous = false;
      recognizer.onresult = (event) => {
        const text = event.results[0]?.[0]?.transcript?.trim();
        if (text) callbacks.current.onTranscript(text);
      };
      recognizer.onend = () => { setListening(false); captureBusy.current = false; };
      recognizer.onerror = () => { setListening(false); captureBusy.current = false; callbacks.current.onError(voiceError()); };
      recognition.current = recognizer;
      try { recognizer.start(); captureBusy.current = true; setListening(true); }
      catch { callbacks.current.onError(voiceError()); }
      return;
    }

    const epoch = ++captureEpoch.current;
    captureBusy.current = true;
    setProcessing(true);
    let context: AudioContext | undefined;
    let stream: MediaStream | undefined;
    try {
      const Audio = browser.AudioContext || browser.webkitAudioContext;
      if (!Audio || !navigator.mediaDevices?.getUserMedia) throw new Error("UNSUPPORTED");
      context = new Audio();
      await context.resume();
      stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } });
      if (epoch !== captureEpoch.current) {
        stream.getTracks().forEach((track) => track.stop());
        await context.close();
        return;
      }
      const mimeType = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"]
        .find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = new MediaRecorder(stream, { ...(mimeType ? { mimeType } : {}), audioBitsPerSecond: 64_000 });
      const chunks: Blob[] = [];
      let recordedBytes = 0;
      recorder.ondataavailable = (event) => {
        if (event.data.size) { chunks.push(event.data); recordedBytes += event.data.size; }
        if (recordedBytes > 3_000_000 && recorder.state !== "inactive") recorder.stop();
      };
      recorder.onerror = () => {
        captureEpoch.current++;
        releaseCapture();
        captureBusy.current = false;
        setListening(false); setProcessing(false);
        callbacks.current.onError(voiceError());
      };
      recorder.onstop = async () => {
        const current = capture.current;
        if (!current || epoch !== captureEpoch.current) return;
        window.clearTimeout(current.timer);
        current.stream.getTracks().forEach((track) => track.stop());
        setListening(false); setProcessing(true);
        const controller = new AbortController();
        upload.current = controller;
        const timeout = window.setTimeout(() => controller.abort(), 30_000);
        try {
          const encoded = await new Blob(chunks, { type: recorder.mimeType }).arrayBuffer();
          const decoded = await current.context.decodeAudioData(encoded);
          if (epoch !== captureEpoch.current) return;
          const wav = encodeVoiceWav(Array.from({ length: decoded.numberOfChannels }, (_, i) => decoded.getChannelData(i)), decoded.sampleRate);
          const response = await fetch("/api/assistant/transcribe", {
            method: "POST", headers: { "Content-Type": "audio/wav" }, body: wav, signal: controller.signal,
          });
          const data = await response.json();
          if (!response.ok || typeof data.text !== "string") throw new Error("TRANSCRIPTION_FAILED");
          if (epoch === captureEpoch.current) callbacks.current.onTranscript(data.text);
        } catch {
          if (epoch === captureEpoch.current) callbacks.current.onError(voiceError());
        } finally {
          window.clearTimeout(timeout);
          if (epoch === captureEpoch.current) {
            releaseCapture(); captureBusy.current = false; upload.current = null; setProcessing(false);
          }
        }
      };
      capture.current = { recorder, stream, context, timer: window.setTimeout(() => {
        if (recorder.state !== "inactive") recorder.stop();
      }, MAX_VOICE_SECONDS * 1000) };
      recorder.start(250);
      setProcessing(false); setListening(true);
    } catch (error) {
      stream?.getTracks().forEach((track) => track.stop());
      if (context && context.state !== "closed") void context.close();
      if (epoch === captureEpoch.current) {
        releaseCapture(); captureBusy.current = false; setProcessing(false); setListening(false);
        callbacks.current.onError(error instanceof DOMException && error.name === "NotAllowedError"
          ? "Микрофон ашиглах зөвшөөрөл өгөөд дахин оролдоно уу."
          : voiceError());
      }
    }
  }

  async function speak(id: string, content: string) {
    const wasActive = activeSpeech.current === id;
    stopSpeech();
    if (wasActive || isListening || isProcessing) return;
    callbacks.current.onError("");
    const text = content.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[#*_`]/g, " ").replace(/\s+/g, " ").trim();
    if (!text) return;
    activeSpeech.current = id; setSpeakingId(id);
    if (locale === "en") {
      if (!("speechSynthesis" in window)) { stopSpeech(); callbacks.current.onError(voiceError()); return; }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; utterance.rate = 0.95;
      utterance.onend = () => { if (activeSpeech.current === id) { activeSpeech.current = null; setSpeakingId(null); } };
      utterance.onerror = () => { if (activeSpeech.current === id) { stopSpeech(); callbacks.current.onError(voiceError()); } };
      window.speechSynthesis.speak(utterance);
      return;
    }
    const controller = new AbortController();
    speechRequest.current = controller;
    try {
      const browser = window as VoiceWindow;
      const Audio = browser.AudioContext || browser.webkitAudioContext;
      if (!Audio) throw new Error("UNSUPPORTED");
      const context = new Audio();
      speechContext.current = context;
      // Resume during the user's click so Safari can play the downloaded audio.
      await context.resume();
      let remaining = text;
      while (remaining && !controller.signal.aborted) {
        const boundary = remaining.length > 2000 ? remaining.lastIndexOf(" ", 2000) : remaining.length;
        const cut = boundary > 0 ? boundary : Math.min(2000, remaining.length);
        const chunk = remaining.slice(0, cut);
        remaining = remaining.slice(cut).trimStart();
        const timeout = window.setTimeout(() => controller.abort(), 30_000);
        let buffer: ArrayBuffer;
        try {
          const response = await fetch("/api/assistant/speech", {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: chunk }), signal: controller.signal,
          });
          if (!response.ok) throw new Error("SPEECH_FAILED");
          buffer = await response.arrayBuffer();
        } finally { window.clearTimeout(timeout); }
        if (controller.signal.aborted) break;
        const decoded = await context.decodeAudioData(buffer);
        if (controller.signal.aborted) break;
        const source = context.createBufferSource();
        source.buffer = decoded; source.connect(context.destination);
        await new Promise<void>((resolve) => {
          const done = () => { controller.signal.removeEventListener("abort", done); resolve(); };
          source.onended = done;
          controller.signal.addEventListener("abort", done, { once: true });
          source.start();
        });
      }
    } catch {
      if (speechRequest.current === controller) callbacks.current.onError(voiceError());
    } finally {
      if (speechRequest.current === controller) stopSpeech();
    }
  }

  return { available, isListening, isProcessing, speakingId, toggleRecording, speak };
}
