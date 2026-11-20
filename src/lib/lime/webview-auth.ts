import {
  createHmac,
  createPrivateKey,
  createPublicKey,
  sign as nodeSign,
  timingSafeEqual,
  verify as nodeVerify,
  type KeyObject,
} from "node:crypto";

/**
 * Verification of links that the LIME app opens in its webview:
 *   /mip70/pay?acc=<8 digits>&ts=<unix seconds>&sig=<base64>
 * signed_string = `${ts}.${acc}`
 *
 * Server-only: secrets and keys must never reach a client bundle.
 */

export const MAX_SKEW_SECONDS = 300;
const ACC_PATTERN = /^7008\d{4}$/;
const TS_PATTERN = /^\d{1,12}$/;

export function signedString(ts: string | number, acc: string) {
  return `${ts}.${acc}`;
}

/** Abstraction so HMAC-SHA256 and ed25519 are interchangeable. */
export interface WebviewVerifier {
  readonly algorithm: "hmac-sha256" | "ed25519";
  verify(message: string, signature: Buffer): boolean;
}

export interface WebviewSigner {
  sign(message: string): Buffer;
}

export class HmacSha256Verifier implements WebviewVerifier, WebviewSigner {
  readonly algorithm = "hmac-sha256" as const;
  constructor(private readonly secret: string) {
    if (!secret) throw new Error("HMAC secret is empty");
  }
  sign(message: string) {
    return createHmac("sha256", this.secret).update(message).digest();
  }
  verify(message: string, signature: Buffer) {
    const expected = this.sign(message);
    // timingSafeEqual throws on length mismatch, so reject that first.
    return expected.length === signature.length && timingSafeEqual(expected, signature);
  }
}

// DER prefix that turns a raw 32-byte ed25519 public key into SPKI.
const ED25519_SPKI_PREFIX = Buffer.from("302a300506032b6570032100", "hex");

function loadEd25519PublicKey(value: string): KeyObject {
  const text = value.trim();
  if (text.includes("BEGIN PUBLIC KEY")) return createPublicKey(text.replace(/\\n/g, "\n"));
  const raw = Buffer.from(text, "base64");
  if (raw.length === 32) {
    return createPublicKey({ key: Buffer.concat([ED25519_SPKI_PREFIX, raw]), format: "der", type: "spki" });
  }
  return createPublicKey({ key: raw, format: "der", type: "spki" });
}

export class Ed25519Verifier implements WebviewVerifier {
  readonly algorithm = "ed25519" as const;
  private readonly key: KeyObject;
  constructor(publicKey: string | KeyObject) {
    this.key = typeof publicKey === "string" ? loadEd25519PublicKey(publicKey) : publicKey;
  }
  verify(message: string, signature: Buffer) {
    try {
      return nodeVerify(null, Buffer.from(message), this.key, signature);
    } catch {
      return false;
    }
  }
}

export class Ed25519Signer implements WebviewSigner {
  private readonly key: KeyObject;
  constructor(privateKeyPem: string) {
    this.key = createPrivateKey(privateKeyPem.replace(/\\n/g, "\n"));
  }
  sign(message: string) {
    return nodeSign(null, Buffer.from(message), this.key);
  }
}

type Env = Record<string, string | undefined>;

/**
 * LIME_WEBVIEW_ALG=hmac-sha256|ed25519 picks explicitly. Without it, a
 * LIME_WEBVIEW_PUBLIC_KEY selects ed25519, otherwise LIME_WEBVIEW_SECRET is
 * used. Returns null when nothing is configured (all links are then rejected).
 */
export function loadVerifierFromEnv(env: Env = process.env): WebviewVerifier | null {
  const secret = env.LIME_WEBVIEW_SECRET;
  const publicKey = env.LIME_WEBVIEW_PUBLIC_KEY;
  const alg = env.LIME_WEBVIEW_ALG?.toLowerCase() || (publicKey ? "ed25519" : "hmac-sha256");
  try {
    if (alg === "ed25519") return publicKey ? new Ed25519Verifier(publicKey) : null;
    return secret ? new HmacSha256Verifier(secret) : null;
  } catch {
    return null;
  }
}

/** base64 or base64url; a "+" turned into a space by query decoding is restored. */
export function decodeSignature(value: string): Buffer | null {
  const normalized = value.replace(/ /g, "+").replace(/-/g, "+").replace(/_/g, "/");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(normalized)) return null;
  const buf = Buffer.from(normalized, "base64");
  return buf.length ? buf : null;
}

export type VerifyFailure =
  | "not_configured"
  | "missing_params"
  | "bad_acc"
  | "bad_ts"
  | "expired"
  | "bad_sig";

export type VerifyResult =
  | { ok: true; acc: string; ts: number }
  | { ok: false; reason: VerifyFailure };

export function verifyWebviewParams(
  params: { acc?: string | null; ts?: string | null; sig?: string | null },
  verifier: WebviewVerifier | null,
  nowSeconds: number = Math.floor(Date.now() / 1000),
): VerifyResult {
  if (!verifier) return { ok: false, reason: "not_configured" };
  const { acc, ts, sig } = params;
  if (!acc || !ts || !sig) return { ok: false, reason: "missing_params" };
  if (!ACC_PATTERN.test(acc)) return { ok: false, reason: "bad_acc" };
  if (!TS_PATTERN.test(ts)) return { ok: false, reason: "bad_ts" };
  const tsNum = Number(ts);
  if (Math.abs(nowSeconds - tsNum) > MAX_SKEW_SECONDS) return { ok: false, reason: "expired" };
  const signature = decodeSignature(sig);
  if (!signature || !verifier.verify(signedString(ts, acc), signature)) {
    return { ok: false, reason: "bad_sig" };
  }
  return { ok: true, acc, ts: tsNum };
}
