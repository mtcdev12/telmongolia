import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Home } from "lucide-react";

import { ENGLISH_PLANS, ENGLISH_SERVICES } from "@/lib/i18n/english";

export const metadata: Metadata = {
  title: "Services and plans",
  alternates: {
    canonical: "/en/services",
    languages: { mn: "/", en: "/en/services" },
  },
};

function PlanSummary({ audience }: { audience: "Residential" | "Business" }) {
  const plans = ENGLISH_PLANS.filter((plan) => plan.englishAudience === audience);
  const grouped = ENGLISH_SERVICES.map((service) => ({
    service,
    plans: plans.filter((plan) => plan.service === service.sourceName),
  })).filter((group) => group.plans.length > 0);

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {grouped.map(({ service, plans: servicePlans }) => (
        <Link key={service.slug} href={`/en/services/${service.slug}`} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <p className="text-xs font-black uppercase tracking-wider text-blue-600">{service.eyebrow}</p>
          <h3 className="mt-2 text-xl font-black text-[#061f57]">{service.title}</h3>
          <p className="mt-3 text-sm text-slate-500">{servicePlans.length} verified plan{servicePlans.length === 1 ? "" : "s"}</p>
          <p className="mt-1 text-lg font-black text-slate-800">From {servicePlans.map((plan) => Number(plan.price.match(/[\d,]+/)?.[0].replace(/,/g, "") ?? Infinity)).sort((a, b) => a - b)[0].toLocaleString()}₮</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">Compare plans <ArrowRight size={15} /></span>
        </Link>
      ))}
    </div>
  );
}

export default function EnglishServicesPage() {
  return (
    <div className="bg-slate-50 px-4 py-14">
      <div className="mx-auto max-w-[1280px]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Verified catalogue</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-black tracking-tight text-[#061f57]">Services and monthly plans</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">Prices and conditions below are translated from the verified catalogue used by the Telecom Mongolia assistant. All prices are in Mongolian tugriks.</p>

        <section className="mt-12" id="residential">
          <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><Home size={21} /></span><div><p className="text-xs font-bold uppercase text-blue-600">For households</p><h2 className="text-2xl font-black text-[#061f57]">Residential services</h2></div></div>
          <PlanSummary audience="Residential" />
        </section>

        <section className="mt-16 scroll-mt-28" id="business">
          <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700"><Building2 size={21} /></span><div><p className="text-xs font-bold uppercase text-cyan-700">For organizations</p><h2 className="text-2xl font-black text-[#061f57]">Business services</h2></div></div>
          <PlanSummary audience="Business" />
        </section>
      </div>
    </div>
  );
}
