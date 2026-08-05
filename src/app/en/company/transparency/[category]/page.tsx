import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PdfTable from "@/app/company/pdfTable";
import Breadcrumb from "@/components/ui/breadcrumb";
import { ENGLISH_TRANSPARENCY } from "@/lib/i18n/company";

export function generateStaticParams() {
  return Object.keys(ENGLISH_TRANSPARENCY).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const page = ENGLISH_TRANSPARENCY[category];
  return page ? { title: page.title } : {};
}

export default async function TransparencyPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const page = ENGLISH_TRANSPARENCY[category];
  if (!page) notFound();

  return (
    <div>
      <Breadcrumb locale="en" data={["Transparency", page.title]} />
      <h1 className="mb-5 text-2xl font-black text-brand-1">{page.title}</h1>
      <p className="mb-5 text-sm leading-6 text-slate-600">Document titles are translated for navigation. The linked files remain the official source documents published by Telecom Mongolia JSC.</p>
      <PdfTable locale="en" list={page.documents} />
    </div>
  );
}
