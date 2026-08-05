import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getAssistantMetrics } from "@/lib/chatbot/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  const expected = process.env.CHAT_ADMIN_KEY?.trim();
  const received = request.headers.get("x-admin-key")?.trim();
  if (!expected || !received) return false;
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);
  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function GET(request: NextRequest) {
  if (!process.env.CHAT_ADMIN_KEY?.trim()) {
    return NextResponse.json(
      { error: "Админ тайлан идэвхгүй байна." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Нэвтрэх мэдээлэл буруу байна." },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  const parsedDays = z.coerce
    .number()
    .int()
    .min(1)
    .max(90)
    .safeParse(request.nextUrl.searchParams.get("days") ?? 30);
  if (!parsedDays.success) {
    return NextResponse.json(
      { error: "Хугацааны утга буруу байна." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const metrics = await getAssistantMetrics(parsedDays.data);
  return NextResponse.json(metrics, {
    headers: { "Cache-Control": "no-store" },
  });
}
