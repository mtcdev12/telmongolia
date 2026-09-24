import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { VERIFIED_PRODUCT_PLANS } from "@/lib/chatbot/knowledge";
import { recordAssistantEvent } from "@/lib/chatbot/analytics";
import { ENGLISH_PLANS } from "@/lib/i18n/english";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requestSchema = z
  .object({
    audience: z.enum(["Өрхийн хэрэглэгч", "Байгууллага"]),
    usage: z.enum(["light", "balanced", "heavy"]),
    needsInternet: z.boolean(),
    needsTv: z.boolean(),
    monthlyBudget: z.coerce.number().int().min(0).max(5_000_000),
    locale: z.enum(["mn", "en"]).default("mn"),
  })
  .strict();

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function readPrice(price: string) {
  const firstAmount = price.match(/[\d,]+/)?.[0];
  return firstAmount ? Number(firstAmount.replace(/,/g, "")) : null;
}

function readSpeed(conditions: string[]) {
  const condition = conditions.find((item) =>
    /интернэтийн хурд/i.test(item)
  );
  return condition ? Number(condition.match(/\d+/)?.[0] ?? 0) : 0;
}

function preferredServices(
  needsInternet: boolean,
  needsTv: boolean
) {
  if (needsInternet && needsTv) return ["Гуравласан багц"];
  if (needsInternet) return ["Хосолсон багц"];
  if (needsTv) return ["National КаТВ", "TV ROOM"];
  return ["Суурин утас"];
}

export async function POST(request: NextRequest) {
  const fetchSite = request.headers.get("sec-fetch-site");
  const requestOrigin = request.headers.get("origin");
  if (
    fetchSite === "cross-site" ||
    (requestOrigin && requestOrigin !== request.nextUrl.origin)
  ) {
    return json({ error: "Зөвшөөрөгдөөгүй хүсэлт байна." }, 403);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Мэдээлэл буруу байна." }, 400);
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        error:
          parsed.error.issues[0]?.message ?? "Сонголтын мэдээлэл буруу байна.",
      },
      400
    );
  }

  const services = preferredServices(
    parsed.data.needsInternet,
    parsed.data.needsTv
  );
  const targetSpeed =
    parsed.data.usage === "heavy"
      ? 50
      : parsed.data.usage === "balanced"
      ? 30
      : 10;

  const recommendations = VERIFIED_PRODUCT_PLANS.filter(
    (plan) =>
      plan.audience === parsed.data.audience &&
      services.includes(plan.service)
  )
    .map((plan) => {
      const price = readPrice(plan.price);
      const speed = readSpeed(plan.conditions);
      let score = 0;

      if (price !== null && parsed.data.monthlyBudget > 0) {
        score += price <= parsed.data.monthlyBudget ? 45 : -30;
        score -= Math.min(
          20,
          Math.abs(parsed.data.monthlyBudget - price) / 5_000
        );
      }
      if (parsed.data.needsInternet) {
        score += speed >= targetSpeed ? 35 : Math.max(0, speed - targetSpeed);
      }
      if (parsed.data.needsTv && /КаТВ|TV ROOM|Гуравласан/.test(plan.service)) {
        score += 25;
      }

      return { plan, score, price, speed };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(({ plan, price, speed }) => {
      const englishPlan = ENGLISH_PLANS.find(
        (candidate) =>
          candidate.audience === plan.audience &&
          candidate.service === plan.service &&
          candidate.name === plan.name &&
          candidate.technology === plan.technology
      );
      const english = parsed.data.locale === "en" ? englishPlan : null;
      return {
      service: english?.englishService ?? plan.service,
      name: english?.englishName ?? plan.name,
      technology: english?.englishTechnology ?? plan.technology ?? null,
      price: plan.price,
      monthlyPrice: price,
      speed: speed || null,
      conditions: english?.englishConditions ?? plan.conditions,
      note: english?.englishNote ?? plan.note ?? null,
    };});

  await recordAssistantEvent({
    type: "action",
    outcome: recommendations.length > 0 ? "success" : "error",
    action: "package-adviser",
    source: "verified-catalog",
  });

  return json({
    result: recommendations.length > 0 ? "ok" : "not found",
    recommendations,
    message:
      recommendations.length > 0
        ? parsed.data.locale === "en"
          ? "The closest verified plans have been ranked for you."
          : "Таны сонголтод ойр багцуудыг эрэмбэллээ."
        : parsed.data.locale === "en"
        ? "No matching plan was found."
        : "Тохирох багц олдсонгүй.",
  });
}
