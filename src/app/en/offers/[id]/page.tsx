import { notFound } from "next/navigation";

import EnglishContentDetail from "@/components/english-content-detail";
import { ENGLISH_OFFERS, getEnglishContent } from "@/lib/i18n/public-content";

export function generateStaticParams() { return ENGLISH_OFFERS.map((item) => ({ id: String(item.id) })); }

export default async function EnglishOfferDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getEnglishContent("offers", Number(id));
  if (!item) notFound();
  return <EnglishContentDetail type="offers" item={item} />;
}
