import type { Metadata } from "next";
import { BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { BiCommentDetail } from "react-icons/bi";

import Advantage from "@/app/(main)/products/advantage";
import Comment from "@/app/(main)/products/comment";
import Intro from "@/app/(main)/products/intro";
import Price from "@/app/(main)/products/price";
import Breadcrumb from "@/components/ui/breadcrumb";
import {
  ENGLISH_SERVICE_PAGES,
  getEnglishServicePage,
} from "@/lib/i18n/service-pages";

const mongolianPaths: Record<string, string> = {
  "fixed-line": "/products/single",
  "double-play": "/products/double",
  "triple-play": "/products/triple",
  "national-catv": "/products/catv",
  "tv-room": "/products/iptv",
  mip70: "/products/sip",
  "call-center": "/products/corporate/callcenter",
};

export function generateStaticParams() {
  return Object.keys(ENGLISH_SERVICE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const service = getEnglishServicePage(slug);

  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `/en/services/${slug}`,
      languages: {
        mn: mongolianPaths[slug] ?? "/",
        en: `/en/services/${slug}`,
      },
    },
  };
}

function planGridClass(planCount: number) {
  if (planCount >= 4) return "lg:grid-cols-4";
  if (planCount === 3) return "lg:grid-cols-3";
  if (planCount === 2) return "mx-auto max-w-[860px] md:grid-cols-2";
  return "mx-auto max-w-[440px]";
}

export default async function EnglishServiceDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const service = getEnglishServicePage(slug);

  if (!service) notFound();

  const advantageGrid =
    service.advantages.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  const highlightGrid =
    service.highlights?.length === 4 ? "lg:grid-cols-4" : "md:grid-cols-3";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      <div className="container">
        <Breadcrumb locale="en" data={["Services", service.title]} />
      </div>

      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Intro
            title={service.title}
            bundle={service.bundle}
            desc={service.description}
            logo={service.logo}
          />
        </div>

        <div className="relative mt-12">
          <div className="mb-8 text-center">
            <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600">
              <ShieldCheck size={17} />
              Service advantages
            </p>
            <h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
              Key advantages
            </h2>
            <p className="mx-auto mt-3 max-w-[700px] text-sm leading-6 text-slate-500 md:text-base">
              {service.benefitsIntro}
            </p>
          </div>

          <div
            className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${advantageGrid}`}
          >
            {service.advantages.map((advantage) => (
              <Advantage
                key={advantage.title}
                title={advantage.title}
                desc={advantage.description}
                img={advantage.image}
              />
            ))}
          </div>
        </div>

        <div className="relative my-16 overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-cyan-100/70 blur-3xl" />

          <div className="relative z-10 mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600">
                <BadgeCheck size={17} />
                Tariff information
              </p>
              <h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
                Package tariffs
              </h2>
              <p className="mt-3 max-w-[720px] text-sm leading-6 text-slate-500 md:text-base">
                {service.tariffIntro}
              </p>
            </div>
            <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              {service.tariffNote}
            </div>
          </div>

          {service.highlights && (
            <div
              className={`relative z-10 mb-8 grid grid-cols-1 gap-4 ${highlightGrid}`}
            >
              {service.highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <BadgeCheck size={21} />
                  </div>
                  <h3 className="font-black text-[#061f57]">
                    {highlight.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {service.extraNote && (
            <div className="relative z-10 mb-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#061f57]">
                    {service.extraNote.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {service.extraNote.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="relative z-10 space-y-10">
            {service.groups.map((group, groupIndex) => (
              <section key={`${group.title ?? "plans"}-${groupIndex}`}>
                {(group.title || group.description) && (
                  <div className="mb-6 text-center">
                    {group.title && (
                      <h3 className="text-2xl font-black text-[#061f57]">
                        {group.title}
                      </h3>
                    )}
                    {group.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-500 md:text-base">
                        {group.description}
                      </p>
                    )}
                  </div>
                )}
                <div
                  className={`grid grid-cols-1 justify-items-center gap-6 ${planGridClass(group.plans.length)}`}
                >
                  {group.plans.map((plan, planIndex) => (
                    <Price
                      key={`${plan.title}-${planIndex}`}
                      title={plan.title}
                      price={plan.price}
                      list={plan.items}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="relative my-16">
          <div className="mb-8 text-center">
            <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600">
              <Sparkles size={17} />
              Customer ratings
            </p>
            <h2 className="flex items-center justify-center gap-3 text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
              <BiCommentDetail />
              Customer comments
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-sm leading-6 text-slate-500 md:text-base">
              {service.commentsIntro}
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
            <Comment comments={service.comments} />
          </div>
        </div>
      </section>
    </div>
  );
}
