import EnglishContentList from "@/components/english-content-list";
import { ENGLISH_OFFERS } from "@/lib/i18n/public-content";

export default function EnglishOffersPage() {
  return <EnglishContentList type="offers" items={ENGLISH_OFFERS} />;
}
