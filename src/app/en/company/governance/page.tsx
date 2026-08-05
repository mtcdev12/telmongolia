import Link from "next/link";
import { ArrowRight, Building2, FileText, Scale, Users } from "lucide-react";

import Breadcrumb from "@/components/ui/breadcrumb";

const sections = [
  { title: "Organizational structure", text: "See the company's operating and management structure.", href: "/en/company/structure", icon: Building2 },
  { title: "Board of Directors", text: "Members representing the state and independent directors.", href: "/en/company/board", icon: Users },
  { title: "Executive management", text: "Executive leadership and department directors.", href: "/en/company/executive-team", icon: Users },
  { title: "Legal documents", text: "Corporate charter, governance policies and operating procedures.", href: "/en/company/legal", icon: Scale },
  { title: "Shareholding structure", text: "Shareholder composition and significant ownership information.", href: "/en/company/shareholding", icon: Building2 },
  { title: "Transparency reports", text: "Annual, audited, financial, economic and Board reports.", href: "/en/company/transparency/annual", icon: FileText },
];

export default function GovernancePage() {
  return (
    <div>
      <Breadcrumb locale="en" data={["Corporate governance"]} />
      <section className="mb-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-7 text-white shadow-[0_20px_55px_rgba(37,99,235,0.25)] md:p-10">
        <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">Telecom Mongolia JSC</p>
        <h1 className="text-3xl font-black tracking-[-0.7px] md:text-5xl">Corporate governance</h1>
        <p className="mt-4 max-w-[760px] text-base leading-7 text-white/85 md:text-lg">Governance structure, leadership, shareholder information, policies and disclosure documents published by Telecom Mongolia JSC.</p>
      </section>
      <div className="grid gap-5 pb-10 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map(({ title, text, href, icon: Icon }) => (
          <Link key={href} href={href} className="group rounded-[24px] border border-brand-1/15 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-brand-1"><Icon size={23} /></div>
            <h2 className="mt-5 text-lg font-black text-brand-1">{title}</h2>
            <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-600">{text}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">View page <ArrowRight size={16} /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
