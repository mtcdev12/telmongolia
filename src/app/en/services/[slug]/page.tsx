import type { Metadata } from "next";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

import Advantage from "@/app/(main)/products/advantage";
import Intro from "@/app/(main)/products/intro";
import Price from "@/app/(main)/products/price";
import Breadcrumb from "@/components/ui/breadcrumb";
import { ENGLISH_SERVICES, getEnglishPlans, getEnglishService } from "@/lib/i18n/english";

const logos: Record<string, string> = {
  "fixed-line": "single.png",
  "double-play": "double.png",
  "triple-play": "triple.png",
  "national-catv": "catv.png",
  "tv-room": "iptv.png",
  mip70: "sip.png",
  "call-center": "callcenter.png",
};

export function generateStaticParams() { return ENGLISH_SERVICES.map((service) => ({ slug: service.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getEnglishService(slug);
  const plans = getEnglishPlans(slug);
  return service ? { title: service.title, description: service.description, alternates: { canonical: `/en/services/${slug}`, languages: { mn: plans[0]?.path ?? "/", en: `/en/services/${slug}` } } } : {};
}

export default async function EnglishServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getEnglishService(slug);
  if (!service) notFound();
  const plans = getEnglishPlans(slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      <div className="container"><Breadcrumb locale="en" data={["Services", service.title]} /></div>
      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Intro title={service.title} bundle={service.eyebrow} desc={service.description} logo={logos[slug] ?? "single.png"} />
        </div>

        <div className="relative mt-12">
          <div className="mb-8 text-center"><p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600"><ShieldCheck size={17} />Service benefits</p><h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">Key advantages</h2><p className="mx-auto mt-3 max-w-[680px] text-sm leading-6 text-slate-500 md:text-base">Reliable Telecom Mongolia service with published plans and customer assistance.</p></div>
          <div className="flex flex-wrap justify-center gap-5">
            <Advantage title="Reliable" desc="Built on dependable national communications infrastructure" img="urh/icon12.png" />
            <Advantage title="Convenient" desc="Clear plans and combined services for everyday use" img="urh/icon1.png" />
            <Advantage title="Supported" desc="Customer assistance through service locations and 7000-8000" img="urh/icon14.png" />
          </div>
        </div>

        <div className="relative my-16 overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-100/70 blur-3xl" /><div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-cyan-100/70 blur-3xl" />
          <div className="relative z-10 mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600"><BadgeCheck size={17} />Tariff information</p><h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">Published plans</h2><p className="mt-3 max-w-[650px] text-sm leading-6 text-slate-500 md:text-base">Choose the plan that best matches your service needs.</p></div><div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">VAT included where stated</div></div>
          {plans.length > 0 ? <div className="relative z-10 flex flex-wrap justify-center gap-6">{plans.map((plan, index) => <Price key={`${plan.audience}-${plan.name}-${index}`} title={`${plan.englishAudience} — ${plan.englishName}`} price={plan.price} list={[...(plan.englishTechnology ? [plan.englishTechnology] : []), ...plan.englishConditions, ...(plan.englishNote ? [plan.englishNote] : [])]} />)}</div> : <div className="relative z-10 rounded-2xl bg-blue-50 p-5 text-sm text-blue-900">Detailed pricing is confirmed individually. Call 7000-8000 for assistance.</div>}
        </div>
      </section>
    </div>
  );
}
