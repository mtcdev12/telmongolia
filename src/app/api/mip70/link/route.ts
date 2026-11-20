import { handleMip70LinkRequest } from "@/lib/lime/link-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleMip70LinkRequest(request);
}
