import type { Metadata } from "next";

import ContactPage from "@/app/(main)/contact/page";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/en/contact", languages: { mn: "/contact", en: "/en/contact" } } };

export default function EnglishContactPage() {
  return <div className="container"><ContactPage /></div>;
}
