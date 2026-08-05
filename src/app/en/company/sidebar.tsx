import Link from "next/link";
import { BiSlideshow, BiSolidBank } from "react-icons/bi";

const governance = [
  ["Governance overview", "/en/company/governance"],
  ["Organizational structure", "/en/company/structure"],
  ["Shareholding structure", "/en/company/shareholding"],
  ["Board of Directors", "/en/company/board"],
  ["Executive management", "/en/company/executive-team"],
  ["Operational functions", "/en/company/functions"],
  ["Legal and policy documents", "/en/company/legal"],
];

const transparency = [
  ["Corporate governance reports", "/en/company/transparency/governance"],
  ["Annual reports", "/en/company/transparency/annual"],
  ["Interim reports", "/en/company/transparency/quarterly"],
  ["Audited reports", "/en/company/transparency/audited"],
  ["Financial statements", "/en/company/transparency/financial"],
  ["Economic transparency", "/en/company/transparency/economic"],
  ["Board reports", "/en/company/transparency/board"],
];

export default function EnglishCompanySidebar() {
  return (
    <aside className="h-full w-full border-b border-brand-1/40 p-4 md:mt-6 md:w-[320px] md:border-b-0 md:border-r">
      <ul className="flex h-full flex-col space-y-4 font-medium tracking-tight text-brand-1">
        <li className="flex items-center gap-1"><BiSolidBank /> Corporate governance</li>
        <li>
          <ul className="ml-8 flex flex-col space-y-4 text-[14px] font-normal text-slate-900">
            {governance.map(([label, href]) => <li key={href}><Link className="transition hover:text-brand-2" href={href}>{label}</Link></li>)}
          </ul>
        </li>
        <li className="flex items-center gap-1"><BiSlideshow /> Transparency</li>
        <li>
          <ul className="ml-8 flex flex-col space-y-4 text-[14px] font-normal text-slate-900">
            {transparency.map(([label, href]) => <li key={href}><Link className="transition hover:text-brand-2" href={href}>{label}</Link></li>)}
          </ul>
        </li>
      </ul>
    </aside>
  );
}
