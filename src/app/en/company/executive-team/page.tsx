import Image from "next/image";

import Breadcrumb from "@/components/ui/breadcrumb";
import { ENGLISH_EXECUTIVES } from "@/lib/i18n/company";

export default function ExecutiveTeamPage() {
  return (
    <div>
      <Breadcrumb locale="en" data={["Corporate governance", "Executive management"]} />
      <h1 className="mb-5 text-2xl font-black text-brand-1">Executive management team</h1>
      <div className="flex flex-wrap gap-4 pb-10">
        {ENGLISH_EXECUTIVES.map((person) => (
          <article key={person.email} className="group relative flex w-[280px] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-brand-1/20 p-4">
            <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full border border-slate-100 bg-white shadow-lg">
              <Image src={`/assets/company/images/${person.image}`} fill alt={person.name} className="object-contain" />
            </div>
            <div className="text-base font-medium">{person.name}</div>
            <div className="h-[62px] text-center text-sm tracking-tight">{person.role}</div>
            <div className="absolute inset-x-0 bottom-0 bg-brand-1 p-2 text-left text-[14px] font-medium text-slate-50 opacity-0 transition-opacity group-hover:opacity-100">
              Phone: {person.phone}<br />Email: {person.email}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
