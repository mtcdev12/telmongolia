/**
 * Manual test of the LIME payment callback (POST {LIME_SERVICE_URL}/payment/mip70).
 *
 *   npx tsx --env-file=.env.local scripts/test-lime-callback.ts <acc> <packageId> [--charge-id MTC-YYYYMMDD-NNNNNN] [--send]
 *
 * Default is a DRY RUN: prints the request, sends nothing. --send performs a real
 * call to LIME_SERVICE_URL, so point it at LIME's TEST environment with a test
 * account. Re-running with the same --charge-id exercises LIME's idempotency.
 * The token is never printed.
 */
import { formatChargeId, notifyLimeMip70Payment } from "../src/lib/lime/callback";

const args = process.argv.slice(2);
const send = args.includes("--send");
const cIdx = args.indexOf("--charge-id");
const chargeIdArg = cIdx >= 0 ? args[cIdx + 1] : undefined;
const positional = args.filter((a, i) => !a.startsWith("--") && (cIdx < 0 || i !== cIdx + 1));
const [accNumber, packageId] = positional;

if (!accNumber || !packageId) {
  console.error("Usage: test-lime-callback.ts <acc> <packageId> [--charge-id MTC-YYYYMMDD-NNNNNN] [--send]");
  process.exit(1);
}

// Test-only id; real charge ids must come from a persistent counter.
const chargeId = chargeIdArg ?? formatChargeId(new Date(), Math.floor(Math.random() * 1_000_000));
const base = process.env.LIME_SERVICE_URL?.replace(/\/+$/, "");

console.log("Target :", base ? `${base}/payment/mip70` : "(LIME_SERVICE_URL not set)");
console.log("Token  :", process.env.PAYMENT_CALLBACK_TOKEN ? "set" : "NOT set");
console.log("Payload:", JSON.stringify({ chargeId, accNumber, packageId }));

if (!send) {
  console.log("\nDRY RUN. Add --send to call LIME (use LIME's test environment).");
  process.exit(0);
}

notifyLimeMip70Payment({ chargeId, accNumber, packageId }).then((result) => {
  console.log("Result :", JSON.stringify(result));
  process.exit(result.ok ? 0 : 2);
});
