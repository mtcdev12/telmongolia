/**
 * Server-side callback to the LIME service after a MIP70 payment is confirmed:
 *   POST {LIME_SERVICE_URL}/payment/mip70
 *   Authorization: Bearer <PAYMENT_CALLBACK_TOKEN>
 *
 * NOT wired into any flow yet (see report). Call it only from server code
 * after the PSP/bank confirms the payment, never from the browser.
 * Retries reuse the same chargeId; LIME is idempotent on it.
 */

export type Mip70CallbackPayload = {
  chargeId: string;
  accNumber: string;
  packageId: string;
};

const CHARGE_ID_PATTERN = /^MTC-\d{8}-\d{6}$/;

/** MTC-YYYYMMDD-NNNNNN. `sequence` must come from a persistent, unique counter. */
export function formatChargeId(date: Date, sequence: number) {
  if (!Number.isInteger(sequence) || sequence < 0 || sequence > 999999) {
    throw new Error("chargeId sequence must be an integer 0..999999");
  }
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  return `MTC-${ymd}-${String(sequence).padStart(6, "0")}`;
}

export type CallbackResult = { ok: boolean; status?: number; attempts: number; error?: string };

export async function notifyLimeMip70Payment(
  payload: Mip70CallbackPayload,
  options: {
    env?: Record<string, string | undefined>;
    fetchImpl?: typeof fetch;
    maxAttempts?: number;
    retryDelayMs?: number;
  } = {},
): Promise<CallbackResult> {
  const env = options.env ?? process.env;
  const base = env.LIME_SERVICE_URL?.replace(/\/+$/, "");
  const token = env.PAYMENT_CALLBACK_TOKEN;
  if (!base || !token) return { ok: false, attempts: 0, error: "LIME_SERVICE_URL / PAYMENT_CALLBACK_TOKEN not configured" };
  if (!CHARGE_ID_PATTERN.test(payload.chargeId)) return { ok: false, attempts: 0, error: "invalid chargeId" };
  if (!/^\d{8}$/.test(payload.accNumber)) return { ok: false, attempts: 0, error: "invalid accNumber" };
  if (!payload.packageId) return { ok: false, attempts: 0, error: "missing packageId" };

  const doFetch = options.fetchImpl ?? fetch;
  const maxAttempts = options.maxAttempts ?? 3;
  const delay = options.retryDelayMs ?? 500;
  let last: CallbackResult = { ok: false, attempts: 0 };

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await doFetch(`${base}/payment/mip70`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          chargeId: payload.chargeId,
          accNumber: payload.accNumber,
          packageId: payload.packageId,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      last = { ok: res.ok, status: res.status, attempts: attempt };
      if (res.ok) return last;
      if (res.status < 500 && res.status !== 429) return last; // not retryable
    } catch (cause) {
      last = { ok: false, attempts: attempt, error: cause instanceof Error ? cause.name : "network error" };
    }
    if (attempt < maxAttempts) await new Promise((r) => setTimeout(r, delay * attempt));
  }
  return last;
}
