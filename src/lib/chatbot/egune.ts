import "server-only";

type Message = { role: "user" | "assistant"; content: string };

export async function getEguneAnswer(messages: Message[], instructions: string) {
  const key = process.env.EGUNE_API_KEY?.trim();
  if (!key) throw new Error("EGUNE_NOT_CONFIGURED");
  const base = new URL(process.env.EGUNE_BASE_URL?.trim() || "https://api.egune.com/v1");
  // A typo in the endpoint must never send the credential to another host.
  if (base.origin !== "https://api.egune.com" || base.pathname.replace(/\/$/, "") !== "/v1" || base.username || base.password || base.search || base.hash) {
    throw new Error("EGUNE_INVALID_BASE_URL");
  }

  const response = await fetch(`${base.origin}/v1/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.EGUNE_MODEL?.trim() || "egune-mid",
      messages: [{ role: "system", content: instructions }, ...messages],
      max_tokens: 2400,
      stream: false,
    }),
    signal: AbortSignal.timeout(25_000),
    cache: "no-store",
    redirect: "error",
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    // Do not log raw provider responses, request bodies or authorization headers.
    if (payload?.error?.code === "insufficient_quota" || payload?.error?.code === "insufficient_funds") {
      throw new Error("EGUNE_QUOTA_EXCEEDED");
    }
    throw new Error(`EGUNE_HTTP_${response.status}`);
  }
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("EGUNE_EMPTY_ANSWER");
  const answer = content
    .replace(/<think\b[^>]*>[\s\S]*?(?:<\/think>|$)/gi, "")
    .trim();
  if (!answer) throw new Error("EGUNE_EMPTY_ANSWER");
  return answer;
}
