import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";

import Breadcrumb from "@/components/ui/breadcrumb";
import type { EnglishContentItem } from "@/lib/i18n/public-content";

export default function EnglishContentDetail({ type, item }: { type: "news" | "offers"; item: EnglishContentItem }) {
  const label = type === "news" ? "News" : "Offers";
  return (
    <div className="container pb-10">
      <Breadcrumb locale="en" data={[label, item.title]} />
      <Link href={`/en/${type}`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-700"><ArrowLeft size={16} />Back to {label.toLowerCase()}</Link>
      <article className="mx-auto mt-6 max-w-[1000px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="relative h-[280px] w-full bg-slate-100 md:h-[460px]"><Image src={`${process.env.API2}/uploads/${item.image}`} fill alt={item.title} className="object-cover" priority /></div>
        <div className="p-7 md:p-10"><div className="flex items-center gap-2 text-sm font-medium text-slate-500"><CalendarDays size={17} className="text-blue-600" />{item.date}</div><h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-brand-1 md:text-4xl">{item.title}</h1><p className="mt-6 text-base leading-8 text-slate-700">{item.summary}</p><p className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">This English page summarizes the official published item. Dates, figures and service conditions should be confirmed against the current verified service information or by calling 7000-8000.</p></div>
      </article>
    </div>
  );
}
