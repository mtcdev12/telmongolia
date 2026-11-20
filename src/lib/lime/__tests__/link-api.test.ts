import { describe, expect, it, vi } from "vitest";
import { handleMip70LinkRequest } from "../link-api";
import { handleMip70PayRequest } from "../pay-gate";
import { HmacSha256Verifier } from "../webview-auth";

const NOW = 1_800_000_000;
const env = { LIME_LINK_API_TOKEN: "tok", LIME_WEBVIEW_SECRET: "s3cret", LIME_LINK_BASE_URL: "https://site.test/" };
const req = (body: unknown, token: string | null = "tok") =>
  new Request("https://site.test/api/mip70/link", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
const call = (r: Request, e = env) => handleMip70LinkRequest(r, { env: e, nowSeconds: NOW });

describe("LIME link API", () => {
  vi.spyOn(console, "log").mockImplementation(() => {});

  it("issues a link that the pay gate accepts", async () => {
    const res = await call(req({ acc: "70081002" }));
    expect(res.status).toBe(200);
    const { url, expiresAt } = await res.json();
    expect(expiresAt).toBe(NOW + 300);
    expect(url).toMatch(/^https:\/\/site\.test\/mip70\/pay\?acc=70081002&ts=1800000000&sig=/);
    const gate = handleMip70PayRequest(new Request(url), { verifier: new HmacSha256Verifier("s3cret"), nowSeconds: NOW });
    expect(gate.status).toBe(302);
  });
  it("rejects missing or wrong token with 401", async () => {
    expect((await call(req({ acc: "70081002" }, null))).status).toBe(401);
    expect((await call(req({ acc: "70081002" }, "nope"))).status).toBe(401);
  });
  it("rejects bad acc / bad JSON with 400", async () => {
    for (const acc of ["1234", "12345678", "7008abcd", 70081002, undefined]) {
      expect((await call(req({ acc }))).status).toBe(400);
    }
    expect((await call(req("not json"))).status).toBe(400);
  });
  it("returns 503 when not configured", async () => {
    expect((await call(req({ acc: "70081002" }), {} as typeof env)).status).toBe(503);
  });
});
