"use client";
import { useEffect, useState } from "react";
import { getEachNewsShareholders } from "@/api/rest";
import { format_date } from "@/lib/helper";
import Breadcrumb from "@/components/ui/breadcrumb";
import parse from "html-react-parser";
import { useParams, usePathname } from "next/navigation";

const Page = () => {
  const locale = usePathname().startsWith("/en/") ? "en" : "mn";
  const params = useParams();
  const each = String(params?.each ?? "");
  const [news, setNews] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getEachNewsShareholders(Number(each));
      setNews(res);
    };
    void fetchData();
  }, [each]);

  return (
    <div className="mt-5">
      <Breadcrumb locale={locale} data={locale === "en" ? ["Shareholders", "Information"] : ["Хувьцаа эзэмшигчдэд", "Мэдээлэл"]} />
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
