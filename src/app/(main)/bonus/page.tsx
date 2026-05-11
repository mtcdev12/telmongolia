"use client";

import { getNews } from "@/api/rest";
import { useState, useEffect } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/ui/breadcrumb";
import { format_date } from "@/lib/helper";
import Link from "next/link";
import Paginator from "@/components/ui/paginator";
import Loader from "@/components/ui/loader";
import { BsFolder2Open } from "react-icons/bs";
import { CalendarDays, ArrowRight, Gift } from "lucide-react";

const breadcrumb = ["Урамшуулал"];

interface BonusItem {
  id: number;
  title: string;
  cover_img: string;
  created_at: string;
}

interface BonusType {
  data: BonusItem[];
  currentPage: number;
  currentPageSize: number;
  totalDatas: number;
  totalPages: number;
}

const Page = () => {
  const [news, setNews] = useState<BonusType>();
  const [loading, setLoading] = useState(false);

  const getData = async (page: number) => {
    setLoading(true);

    try {
      const res = await getNews("bonus", page);
      setNews(res);
    } catch (error) {
      console.error("Bonus load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      {loading && <Loader />}

      <Breadcrumb data={breadcrumb} />

      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-7 text-white shadow-[0_20px_55px_rgba(37,99,235,0.25)] md:p-10">
          <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            Онцгой санал
          </p>

          <h1 className="flex items-center gap-3 text-3xl font-black tracking-[-0.7px] md:text-5xl">
            <Gift className="hidden md:block" size={42} />
            Урамшуулал
          </h1>

          <p className="mt-4 max-w-[680px] text-base leading-7 text-white/85 md:text-lg">
            Монголын цахилгаан холбоо ХК-ийн шинэ урамшуулал, онцгой санал,
            хэрэглэгчдэд зориулсан боломжууд.
          </p>
        </div>

        {news && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#061f57] md:text-2xl">
                  Урамшууллын жагсаалт
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Нийт {news.totalDatas} урамшуулал байна
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.data.map((d) => (
                <Link
                  href={`/bonus/${d.id}`}
                  key={d.id}
                  className="group overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.16)]"
                >
                  <div className="relative h-[230px] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={`${process.env.API2}/uploads/${d.cover_img}`}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      fill
                      alt={d.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80" />

                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-md backdrop-blur">
                      <Gift size={15} />
                      Урамшуулал
                    </div>

                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#063b91]/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex items-center gap-2 rounded-2xl border border-white/60 bg-white/15 px-5 py-3 text-sm font-bold text-white shadow-lg">
                        <BsFolder2Open className="text-xl" />
                        Дэлгэрэнгүй
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 min-h-[56px] text-[18px] font-black leading-7 tracking-[-0.3px] text-[#061f57] transition group-hover:text-blue-700">
                      {d.title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <CalendarDays size={17} className="text-blue-600" />
                        {format_date(d.created_at)}
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Paginator
                totalPages={news.totalPages}
                currentPage={news.currentPage}
                handlePageChange={getData}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Page;