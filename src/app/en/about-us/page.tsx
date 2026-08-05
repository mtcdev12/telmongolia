import Image from "next/image";
import { FaGlassCheers, FaGlassMartini, FaStamp, FaUsers } from "react-icons/fa";

import Breadcrumb from "@/components/ui/breadcrumb";

const values = [
  [FaUsers, "CUSTOMER"],
  [FaGlassCheers, "TEAMWORK"],
  [FaGlassMartini, "INNOVATION"],
  [FaStamp, "RESPONSIBILITY"],
] as const;

export default function AboutUsPage() {
  return (
    <div className="container">
      <Breadcrumb locale="en" data={["About us"]} />
      <section className="rounded-2xl border border-slate-300 p-6">
        <h1 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Message from the Chief Executive Officer</h1>
        <div className="flex flex-row flex-wrap justify-stretch">
          <div className="relative h-[400px] w-full md:h-auto md:w-[400px]">
            <Image src="/assets/images/gutseth_zahiral.png" fill alt="Chief Executive Officer T. Sainjargal" className="rounded-2xl object-contain" quality={100} />
          </div>
          <div className="min-w-[300px] flex-1 px-6 text-justify text-sm leading-relaxed">
            <p>On behalf of everyone at Telecom Mongolia JSC, I extend my greetings to our customers and partners.</p>
            <p className="mt-3">Since 2022, the company has expanded fibre-based FTTH fixed-line, internet and OTT bundle services in four districts of Ulaanbaatar and 80 soums, reaching more than 6,000 customers. From 2026, our Wi-Fi 6–based triple-play network has expanded to 103 locations in 94 soums.</p>
            <p className="mt-3">We support Mongolia's digital transformation and continue to expand network coverage, modernize technology and deliver useful new services. Our goal is to create value through partnership, sound governance and dependable communications.</p>
            <p className="mt-4 text-right">Respectfully,<br />Chief Executive Officer<br /><strong>T. Sainjargal</strong></p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-300 bg-indigo-50 bg-[url('/assets/images/overlay.png')] bg-right bg-contain bg-no-repeat p-6">
        <h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Company profile</h2>
        <p className="text-justify text-sm leading-relaxed">Established in 1921 as the General Committee for Posts and Telegraphs, Telecom Mongolia is the country's longest-established telecommunications company. It became Telecom Mongolia JSC in 1995 and is listed on the Mongolian Stock Exchange. The Government of Mongolia holds 94.7% of the company's 25,870,276 shares; Mongolian and foreign individuals and legal entities hold 5.3%. The company provides national and intercity communications, internet, cable television and directory services across every district of Ulaanbaatar, all 21 provinces and more than 290 soums.</p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-300 p-6"><h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Vision</h2><p className="text-justify text-sm leading-relaxed">To lead the telecommunications and information technology sector through broad service choice and strong competitiveness.</p></section>
      <section className="mt-8 rounded-2xl border border-slate-300 bg-indigo-50 bg-[url('/assets/images/overlay3.png')] bg-right bg-contain bg-no-repeat p-6"><h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Mission</h2><p className="text-justify text-sm leading-relaxed">Connecting every communication.</p></section>
      <section className="mt-8 rounded-2xl border border-slate-300 p-6"><h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Motto</h2><p className="text-justify text-sm leading-relaxed">“Together for connected development.”</p></section>
      <section className="my-8 rounded-2xl border border-slate-300 bg-indigo-50 bg-[url('/assets/images/overlay2.png')] bg-right bg-contain bg-no-repeat p-6">
        <h2 className="my-2 text-right text-xl font-semibold tracking-tight text-brand-1">Our values</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">{values.map(([Icon, label]) => <div key={label} className="flex items-center justify-center gap-2 rounded-2xl border border-brand-1/20 p-2"><Icon className="text-[60px] text-brand-2" /><p className="text-lg font-semibold text-slate-700">{label}</p></div>)}</div>
      </section>
    </div>
  );
}
