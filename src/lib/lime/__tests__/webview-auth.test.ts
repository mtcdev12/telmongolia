import { generateKeyPairSync } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { Ed25519Signer, Ed25519Verifier, HmacSha256Verifier, signedString, loadVerifierFromEnv } from "../webview-auth";
import { handleMip70PayRequest, maskedQuery } from "../pay-gate";
import { formatChargeId, notifyLimeMip70Payment } from "../callback";

const NOW = 1_800_000_000;
const hmac = new HmacSha256Verifier("test-secret");

function link(acc: string, ts: number, sig?: string) {
  const s = sig ?? hmac.sign(signedString(ts, acc)).toString("base64");
  return new Request(`https://x.test/mip70/pay?${new URLSearchParams({ acc, ts: String(ts), sig: s })}`);
}
const call = (req: Request) => handleMip70PayRequest(req, { verifier: hmac, nowSeconds: NOW });

describe("/mip70/pay gate (HMAC)", () => {
  vi.spyOn(console, "log").mockImplementation(() => {});

  it("valid signature passes (302 to form)", () => {
    const res = call(link("70081002", NOW));
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toMatch(/^\/mip70\/form\?acc=70081002&ts=/);
  });
  it("wrong signature -> 403", () => {
    expect(call(link("70081002", NOW, hmac.sign("other").toString("base64"))).status).toBe(403);
  });
  it("tampered acc -> 403", () => {
    const sig = hmac.sign(signedString(NOW, "70081002")).toString("base64");
    expect(call(link("70081003", NOW, sig)).status).toBe(403);
  });
  it("expired and future ts -> 403", () => {
    expect(call(link("70081002", NOW - 301)).status).toBe(403);
    expect(call(link("70081002", NOW + 301)).status).toBe(403);
    expect(call(link("70081002", NOW - 300)).status).toBe(302);
  });
  it("bad acc format -> 403", () => {
    for (const acc of ["1234567", "123456789", "abcdefgh", "12345678"]) {
      expect(call(link(acc, NOW)).status).toBe(403);
    }
  });
  it("missing params / unconfigured verifier -> 403", () => {
    expect(call(new Request("https://x.test/mip70/pay")).status).toBe(403);
    expect(handleMip70PayRequest(link("70081002", NOW), { verifier: null, nowSeconds: NOW }).status).toBe(403);
  });
  it("accepts base64url and '+' decoded as space", () => {
    const sig = hmac.sign(signedString(NOW, "70081002")).toString("base64");
    const url = `https://x.test/mip70/pay?acc=70081002&ts=${NOW}&sig=${sig.replace(/\+/g, " ")}`;
    expect(call(new Request(url)).status).toBe(302);
    const b64url = sig.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    expect(call(link("70081002", NOW, b64url)).status).toBe(302);
  });
  it("403 page text and masked sig in logs", async () => {
    const res = call(link("1", NOW));
    expect(await res.text()).toContain("Холбоос хүчингүй. LIME app-аас дахин оролдоно уу");
    const masked = maskedQuery(new URLSearchParams("sig=abcdefSECRET&acc=1"));
    expect(masked.sig).not.toContain("abcdef");
  });
});

describe("ed25519", () => {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  const signer = new Ed25519Signer(privateKey.export({ type: "pkcs8", format: "pem" }) as string);
  const verifier = new Ed25519Verifier(publicKey.export({ type: "spki", format: "pem" }) as string);
  it("verifies valid and rejects invalid", () => {
    const sig = signer.sign(signedString(NOW, "70081002")).toString("base64");
    const ok = new Request(`https://x.test/mip70/pay?acc=70081002&ts=${NOW}&sig=${encodeURIComponent(sig)}`);
    expect(handleMip70PayRequest(ok, { verifier, nowSeconds: NOW }).status).toBe(302);
    const bad = new Request(`https://x.test/mip70/pay?acc=70081003&ts=${NOW}&sig=${encodeURIComponent(sig)}`);
    expect(handleMip70PayRequest(bad, { verifier, nowSeconds: NOW }).status).toBe(403);
  });
  it("loads from env and accepts raw 32-byte key", () => {
    const raw = (publicKey.export({ type: "spki", format: "der" }) as Buffer).subarray(-32).toString("base64");
    expect(loadVerifierFromEnv({ LIME_WEBVIEW_PUBLIC_KEY: raw })?.algorithm).toBe("ed25519");
    expect(loadVerifierFromEnv({ LIME_WEBVIEW_SECRET: "s" })?.algorithm).toBe("hmac-sha256");
    expect(loadVerifierFromEnv({})).toBeNull();
  });
});

describe("LIME callback", () => {
  const env = { LIME_SERVICE_URL: "https://lime.test/", PAYMENT_CALLBACK_TOKEN: "tok" };
  const payload = { chargeId: "MTC-20260101-000001", accNumber: "70081002", packageId: "p1" };

  it("formats chargeId", () => {
    expect(formatChargeId(new Date("2026-01-01T00:00:00Z"), 7)).toBe("MTC-20260101-000007");
  });
  it("posts with bearer token and retries 5xx with the same chargeId", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce(new Response("", { status: 503 }))
      .mockResolvedValueOnce(new Response("{}", { status: 200 }));
    const r = await notifyLimeMip70Payment(payload, { env, fetchImpl: fetchImpl as never, retryDelayMs: 0 });
    expect(r).toMatchObject({ ok: true, attempts: 2 });
    const [url, init] = fetchImpl.mock.calls[1];
    expect(url).toBe("https://lime.test/payment/mip70");
    expect(init.headers.Authorization).toBe("Bearer tok");
    expect(JSON.parse(init.body)).toEqual(payload);
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body).chargeId).toBe(payload.chargeId);
  });
  it("does not retry 4xx; rejects bad input", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response("", { status: 401 }));
    expect((await notifyLimeMip70Payment(payload, { env, fetchImpl: fetchImpl as never })).attempts).toBe(1);
    expect((await notifyLimeMip70Payment({ ...payload, chargeId: "x" }, { env, fetchImpl: fetchImpl as never })).ok).toBe(false);
  });
});
