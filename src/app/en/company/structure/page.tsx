import Image from "next/image";

import Breadcrumb from "@/components/ui/breadcrumb";

const departments = [
  "Management and Human Resources Department",
  "Internal Audit Department",
  "Innovation and Business Development Department",
  "Marketing and Sales Department",
  "Technical Operations Department",
  "Information Technology Center",
  "Finance, Accounting and Administration Department",
];

export default function StructurePage() {
  return (
    <div>
      <Breadcrumb locale="en" data={["Corporate governance", "Organizational structure"]} />
      <h1 className="mb-5 text-2xl font-black text-brand-1">Organizational structure</h1>
      <div className="relative h-[420px] w-full min-w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white md:h-[600px]">
        <Image src="/assets/images/bvtets2.jpg" fill alt="Telecom Mongolia organizational chart" className="object-contain" />
      </div>
      <div className="mt-6 grid gap-3 pb-10 sm:grid-cols-2">
        {departments.map((department) => <div key={department} className="rounded-2xl border border-brand-1/15 bg-white px-5 py-4 text-sm font-semibold text-brand-1">{department}</div>)}
      </div>
    </div>
  );
}
