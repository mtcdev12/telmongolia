import { createHash, timingSafeEqual } from "node:crypto";
import { HmacSha256Verifier, signedString } from "./webview-auth";

/**
 * Option B: LIME calls us server-to-server and receives a ready-to-open,
 * signed /mip70/pay link. Signing uses our own LIME_WEBVIEW_SECRET (HMAC),
 * which therefore never has to be shared with LIME.
 *
 *   POST /api/mip70/link
 *   Authorization: Bearer <LIME_LINK_API_TOKEN>
 *   {"acc":"70081002"}  ->  {"url":"https://.../mip70/pay?acc=..&ts=..&sig=..","expiresAt":<unix s>}
 */

const ACC_PATTERN = /^7008\d{4}$/;
export const LINK_TTL_SECONDS = 300;

type Env = Record<string, string | undefined>;

function json(body: unknown, status: number, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...extra },
  });
}

function tokenMatches(provided: string, expected: string) {
  // Hash first so the comparison is constant-length and constant-time.
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function handleMip70LinkRequest(
  request: Request,
  deps: { env?: Env; nowSeconds?: number } = {},
) {
  const env = deps.env ?? process.env;
  const apiToken = env.LIME_LINK_API_TOKEN;
  const secret = env.LIME_WEBVIEW_SECRET;
  const baseUrl = (env.LIME_LINK_BASE_URL || env.BASEURL || "").replace(/\/+$/, "");
  if (!apiToken || !secret || !baseUrl) return json({ error: "not_configured" }, 503);

  const auth = request.headers.get("authorization") ?? "";
  const match = /^Bearer (.+)$/.exec(auth);
  if (!match || !tokenMatches(match[1], apiToken)) {
    return json({ error: "unauthorized" }, 401, { "WWW-Authenticate": "Bearer" });
  }

  let acc: unknown;
  try {
    acc = ((await request.json()) as { acc?: unknown })?.acc;
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  if (typeof acc !== "string" || !ACC_PATTERN.test(acc)) {
    return json({ error: "invalid_acc" }, 400);
  }

  const ts = deps.nowSeconds ?? Math.floor(Date.now() / 1000);
  const sig = new HmacSha256Verifier(secret).sign(signedString(ts, acc)).toString("base64");
  const query = new URLSearchParams({ acc, ts: String(ts), sig });
  // Log the fact of issuance only: no token, no signature.
  console.log("[lime-link-api]", JSON.stringify({ acc, ts }));
  return json({ url: `${baseUrl}/mip70/pay?${query.toString()}`, expiresAt: ts + LINK_TTL_SECONDS }, 200);
}
