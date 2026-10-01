import { notFound } from "next/navigation";

import EnglishContentDetail from "@/components/english-content-detail";
import { ENGLISH_NEWS, getEnglishContent } from "@/lib/i18n/public-content";

export function generateStaticParams() { return ENGLISH_NEWS.map((item) => ({ id: String(item.id) })); }

export default async function EnglishNewsDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = getEnglishContent("news", Number(id));
  if (!item) notFound();
  return <EnglishContentDetail type="news" item={item} />;
}
