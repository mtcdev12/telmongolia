import { handleMip70PayRequest } from "@/lib/lime/pay-gate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return handleMip70PayRequest(request);
}
