"use client"
import { useEffect, useState } from "react";
import { getEachNews } from "@/api/rest";
import { format_date } from "@/lib/helper";
import Breadcrumb from "@/components/ui/breadcrumb";
import parse from 'html-react-parser';
import { useParams } from "next/navigation";

async function getData(url:string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
}

const breadcrumb = ["Урамшуулал"];
const Page = () => {
  const { each } = useParams<{ each: string }>();
  const [news, setNews] = useState();
    useEffect(() => {
      const fetchData = async () => {
        const url = process.env.API2 + '/' + 'news' + '?id=' + each;
        const posts = await getData(url);
        setNews(posts);
      };
      void fetchData();
    }, [each]);

  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      {news && (
        <div>
          <div className="text-center my-4 text-2xl font-semibold text-brand-1 border-b border-brand-1/20 pb-4 tracking-tight">
            {news['title']}
          </div>
          <div className="news" suppressHydrationWarning>
            {parse(news['body'])}
          </div>
          <div className="text-right font-bold text-sm text-brand-1/80 my-2 uppercase">
            Нийтлэгдсэн {format_date(news['created_at'])}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
