import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Gift } from "lucide-react";
import { BsFolder2Open } from "react-icons/bs";

import Breadcrumb from "@/components/ui/breadcrumb";
import type { EnglishContentItem } from "@/lib/i18n/public-content";

export default function EnglishContentList({ type, items }: { type: "news" | "offers"; items: EnglishContentItem[] }) {
  const isOffer = type === "offers";
  const copy = isOffer
    ? { breadcrumb: "Offers", badge: "Special offers", title: "Offers and promotions", intro: "Published promotions and customer opportunities from Telecom Mongolia JSC.", list: "Offer list", count: "offers", card: "Offer" }
    : { breadcrumb: "News", badge: "News and information", title: "Latest news", intro: "Company news, service announcements and official information from Telecom Mongolia JSC.", list: "News list", count: "articles", card: "News" };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      <div className="container"><Breadcrumb locale="en" data={[copy.breadcrumb]} /></div>
      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        <div className="mb-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-7 text-white shadow-[0_20px_55px_rgba(37,99,235,0.25)] md:p-10">
          <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">{copy.badge}</p>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-[-0.7px] md:text-5xl">{isOffer && <Gift className="hidden md:block" size={42} />}{copy.title}</h1>
          <p className="mt-4 max-w-[680px] text-base leading-7 text-white/85 md:text-lg">{copy.intro}</p>
        </div>
        <div className="mb-5"><h2 className="text-xl font-black text-[#061f57] md:text-2xl">{copy.list}</h2><p className="mt-1 text-sm text-slate-500">{items.length} {copy.count}</p></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link href={`/en/${type}/${item.id}`} key={item.id} className="group overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.16)]">
              <div className="relative h-[230px] w-full overflow-hidden bg-slate-100">
                <Image src={`${process.env.API2}/uploads/${item.image}`} className="object-cover transition-transform duration-500 group-hover:scale-110" fill alt={item.title} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={80} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-md backdrop-blur">{isOffer && <Gift size={15} />}{copy.card}</div>
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#063b91]/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"><span className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/15 px-5 py-3 text-sm font-bold text-white shadow-lg"><BsFolder2Open className="text-xl" />Read more</span></div>
              </div>
              <div className="p-5"><h3 className="line-clamp-2 min-h-[56px] text-[18px] font-black leading-7 tracking-[-0.3px] text-[#061f57] transition group-hover:text-blue-700">{item.title}</h3><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4"><div className="flex items-center gap-2 text-sm font-medium text-slate-500"><CalendarDays size={17} className="text-blue-600" />{item.date}</div><div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white"><ArrowRight size={18} /></div></div></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
