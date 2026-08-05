import Image from "next/image";

import Breadcrumb from "@/components/ui/breadcrumb";
import { ENGLISH_BOARD_INDEPENDENT, ENGLISH_BOARD_STATE, type CompanyPerson } from "@/lib/i18n/company";

function PersonCard({ person }: { person: CompanyPerson }) {
  return (
    <article className="flex w-[280px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-brand-1/20 p-4">
      <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full border border-slate-100 bg-white shadow-lg">
        <Image src={`/assets/company/images/${person.image}`} fill alt={person.name} className="object-contain" />
      </div>
      <div className="w-[180px] text-center text-base font-medium">{person.name}</div>
      <div className="min-h-[100px] text-center text-sm tracking-tight">{person.role}</div>
      <div className="mt-4 text-center text-[13px] font-medium text-brand-1">{person.elected}</div>
    </article>
  );
}

export default function BoardPage() {
  return (
    <div>
      <Breadcrumb locale="en" data={["Corporate governance", "Board of Directors"]} />
      <h1 className="my-4 text-center text-2xl font-black text-brand-1">Board of Directors</h1>
      <h2 className="my-4 text-center text-xl font-medium tracking-tight text-brand-1">Members representing state ownership</h2>
      <div className="flex flex-wrap gap-4">{ENGLISH_BOARD_STATE.map((person) => <PersonCard key={person.name} person={person} />)}</div>
      <h2 className="my-6 text-center text-xl font-medium tracking-tight text-brand-1">Independent members</h2>
      <div className="flex flex-wrap gap-4 pb-10">{ENGLISH_BOARD_INDEPENDENT.map((person) => <PersonCard key={person.name} person={person} />)}</div>
    </div>
  );
}
