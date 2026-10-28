"use client";
import { useEffect, useState } from "react";
import { getEachNewsShareholders } from "@/api/rest";
import { format_date } from "@/lib/helper";
import Breadcrumb from "@/components/ui/breadcrumb";
import parse from "html-react-parser";
import { useParams, usePathname } from "next/navigation";

interface ShareholderNews {
  title: string;
  body: string;
  created_at: string;
}

const Page = () => {
  const locale = usePathname().startsWith("/en/") ? "en" : "mn";
  const params = useParams();
  const each = String(params?.each ?? "");
  const [news, setNews] = useState<ShareholderNews>();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!/^\d+$/.test(each) || Number(each) <= 0) {
        setNotFound(true);
        return;
      }

      try {
        const res = await getEachNewsShareholders(Number(each));
        if (!res || typeof res.title !== "string" || typeof res.body !== "string") {
          setNotFound(true);
          return;
        }
        setNews(res);
      } catch {
        setNotFound(true);
      }
    };
    void fetchData();
  }, [each]);

  return (
    <div className="mt-5">
      <Breadcrumb locale={locale} data={locale === "en" ? ["Shareholders", "Information"] : ["Хувьцаа эзэмшигчдэд", "Мэдээлэл"]} />
      {notFound && (
        <div className="mx-auto my-16 max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-brand-1">
            {locale === "en" ? "Information not found" : "Мэдээлэл олдсонгүй"}
          </h1>
          <p className="mt-3 text-slate-600">
            {locale === "en"
              ? "The requested shareholder information is unavailable."
              : "Таны нээх гэж буй хувьцаа эзэмшигчдийн мэдээлэл байхгүй байна."}
          </p>
        </div>
      )}
      {news && (
        <div>
          <div className="text-center my-4 text-2xl font-semibold text-brand-1 border-b border-brand-1/20 pb-4 tracking-tight">
            {news["title"]}
          </div>
          <div className="news" suppressHydrationWarning>
            {parse(news["body"])}
          </div>
          <div className="text-right font-bold text-sm text-brand-1/80 my-2 uppercase">
            {locale === "en" ? "Published" : "Нийтлэгдсэн"} {format_date(news["created_at"])}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
