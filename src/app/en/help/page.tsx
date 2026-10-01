import type { Metadata } from "next";

import HelpPage from "@/app/(main)/help/page";

export const metadata: Metadata = { title: "Help", alternates: { canonical: "/en/help", languages: { mn: "/help", en: "/en/help" } } };

export default function EnglishHelpPage() {
  return <HelpPage />;
}
