import React from "react";
import { PlugZap, CalendarDays, Info } from "lucide-react";

const feeItems = [
  {
    title: "Холболтын хураамж",
    desc: "Үйлчилгээг идэвхжүүлсний төлбөрийг хэлнэ.",
    icon: PlugZap,
  },
  {
    title: "Сарын суурь хураамж",
    desc: "Хэрэглэгчийн сонгосон үйлчилгээний сарын суурь хураамж болон бусад нэмэлт үйлчилгээний хураамжаас бүрдэх сар тутам тогтмол төлөх төлбөрийг хэлнэ.",
    icon: CalendarDays,
  },
];

function FeeCard({ title, desc, Icon }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-[0_16px_40px_rgba(37,99,235,0.14)]">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
          <Icon size={23} />
        </div>

        <h3 className="text-[17px] font-black leading-6 text-[#061f57]">
          {title}
        </h3>
      </div>

      <p className="text-sm font-medium leading-7 text-slate-600">
        {desc}
      </p>
    </div>
  );
}

function Help7() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
        <p className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
          Төлбөрийн мэдээлэл
        </p>

        <h2 className="flex items-center gap-3 text-2xl font-black tracking-[-0.4px] md:text-3xl">
          <Info size={28} />
          Холболтын болон суурь хураамж
        </h2>

        <p className="mt-3 max-w-[680px] text-sm leading-6 text-white/85 md:text-base">
          Үйлчилгээ идэвхжүүлэх болон сар тутам төлөх хураамжийн тайлбар.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {feeItems.map((item) => (
          <FeeCard
            key={item.title}
            title={item.title}
            desc={item.desc}
            Icon={item.icon}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium leading-6 text-blue-800">
        <strong>Тайлбар:</strong> Сарын суурь хураамж нь тухайн хэрэглэгчийн
        сонгосон үйлчилгээ болон нэмэлт үйлчилгээтэй холбоотойгоор өөр байж
        болно.
      </div>
    </div>
  );
}

export default Help7;