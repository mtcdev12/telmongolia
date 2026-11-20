/**
 * Prints a signed /mip70/pay test link.
 *   npx tsx --env-file=.env.local scripts/make-lime-link.ts 70081002 [--base http://localhost:3000]
 * HMAC: LIME_WEBVIEW_SECRET. ed25519: LIME_WEBVIEW_ALG=ed25519 + LIME_WEBVIEW_PRIVATE_KEY (PEM).
 * Local testing only; never prints the secret.
 */
import {
  Ed25519Signer,
  HmacSha256Verifier,
  signedString,
  type WebviewSigner,
} from "../src/lib/lime/webview-auth";

const args = process.argv.slice(2);
const baseIndex = args.indexOf("--base");
const base = baseIndex >= 0 ? args[baseIndex + 1] : "http://localhost:3000";
const acc = args.find((a, i) => !a.startsWith("--") && (baseIndex < 0 || i !== baseIndex + 1));

if (!acc || !/^7008\d{4}$/.test(acc)) {
  console.error("Usage: make-lime-link.ts <acc: 8 digits starting with 7008> [--base <origin>]");
  process.exit(1);
}

let signer: WebviewSigner;
if (process.env.LIME_WEBVIEW_ALG?.toLowerCase() === "ed25519") {
  if (!process.env.LIME_WEBVIEW_PRIVATE_KEY) {
    console.error("LIME_WEBVIEW_PRIVATE_KEY is required for ed25519");
    process.exit(1);
  }
  signer = new Ed25519Signer(process.env.LIME_WEBVIEW_PRIVATE_KEY);
} else {
  if (!process.env.LIME_WEBVIEW_SECRET) {
    console.error("LIME_WEBVIEW_SECRET is required");
    process.exit(1);
  }
  signer = new HmacSha256Verifier(process.env.LIME_WEBVIEW_SECRET);
}

const ts = Math.floor(Date.now() / 1000);
const sig = signer.sign(signedString(ts, acc)).toString("base64");
const query = new URLSearchParams({ acc, ts: String(ts), sig });
console.log(`${base.replace(/\/+$/, "")}/mip70/pay?${query.toString()}`);
console.log("(valid for 300 seconds)");
