import "server-only";

import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { ChatAction } from "@/lib/chatbot/actions";

export type AssistantEvent = {
  timestamp: string;
  type: "chat" | "image" | "action" | "number-search" | "number-order";
  outcome: "success" | "error";
  action?: ChatAction | null;
  source?: string;
};

function analyticsPath() {
  return (
    process.env.CHAT_ANALYTICS_PATH?.trim() ||
    path.join(process.cwd(), ".data", "assistant-events.jsonl")
  );
}

export async function recordAssistantEvent(
  event: Omit<AssistantEvent, "timestamp">
) {
  const file = analyticsPath();
  try {
    await mkdir(path.dirname(file), { recursive: true });
    await appendFile(
      file,
      `${JSON.stringify({ ...event, timestamp: new Date().toISOString() })}\n`,
      { encoding: "utf8", mode: 0o600 }
    );
  } catch (error) {
    console.error("Assistant analytics write failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

function increment(target: Record<string, number>, key: string) {
  target[key] = (target[key] ?? 0) + 1;
}

export async function getAssistantMetrics(days: number) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1_000;
  let contents = "";
  try {
    const buffer = await readFile(analyticsPath());
    const limited =
      buffer.length > 5 * 1024 * 1024
        ? buffer.subarray(buffer.length - 5 * 1024 * 1024)
        : buffer;
    contents = limited.toString("utf8");
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String(error.code)
        : "";
    if (code !== "ENOENT") throw error;
  }

  const byType: Record<string, number> = {};
  const byAction: Record<string, number> = {};
  const byOutcome: Record<string, number> = {};
  const byDay: Record<string, number> = {};
  let total = 0;

  for (const line of contents.split("\n")) {
    if (!line.trim()) continue;
    try {
      const event = JSON.parse(line) as AssistantEvent;
      const timestamp = Date.parse(event.timestamp);
      if (!Number.isFinite(timestamp) || timestamp < cutoff) continue;
      total += 1;
      increment(byType, event.type);
      increment(byOutcome, event.outcome);
      if (event.action) increment(byAction, event.action);
      increment(byDay, event.timestamp.slice(0, 10));
    } catch {
      // A partial or malformed line is ignored without affecting the dashboard.
    }
  }

  return {
    days,
    total,
    successRate:
      total > 0 ? Math.round(((byOutcome.success ?? 0) / total) * 100) : 0,
    byType,
    byAction,
    byOutcome,
    byDay: Object.entries(byDay)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([date, count]) => ({ date, count })),
  };
}
