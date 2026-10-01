import EnglishContentList from "@/components/english-content-list";
import { ENGLISH_NEWS } from "@/lib/i18n/public-content";

export default function EnglishNewsPage() {
  return <EnglishContentList type="news" items={ENGLISH_NEWS} />;
}
