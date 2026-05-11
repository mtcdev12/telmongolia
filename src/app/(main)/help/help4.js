import React from "react";
import { Search, CheckCircle, MousePointerClick, Play, Menu } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "MENU товч дарах",
    desc: "Хэрэглэгчийн хүлээн авагчийн MENU товчийг дарна.",
    image: "/assets/help/suvaghaih1.jpg",
    alt: "suvaghaih1",
    icon: Menu,
  },
  {
    number: "02",
    title: "Сувгийн хайлт сонгох",
    desc: "Сувгийн хайлт функц дээр OK товчийг дарна.",
    image: "/assets/help/suvaghaih2.jpg",
    alt: "suvaghaih2",
    icon: Search,
  },
  {
    number: "03",
    title: "Автомат хайлт эхлүүлэх",
    desc: "Автомат хайлт функц дээр OK товчийг дарж сувгийг хайлгана. Суваг хайж дуустал түр хүлээнэ.",
    image: "/assets/help/suvaghaih3.jpg",
    alt: "suvaghaih3",
    icon: Play,
  },
];

function StepCard({ step }) {
  const Icon = step.icon || MousePointerClick;

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.14)]">
      <div className="flex items-start gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
          <Icon size={23} />
        </div>

        <div>
          <p className="mb-1 text-xs font-black tracking-[0.18em] text-blue-500">
            АЛХАМ {step.number}
          </p>

          <h3 className="text-lg font-black text-[#061f57]">
            {step.title}
          </h3>

          <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
            {step.desc}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50 p-4">
        <img
          src={step.image}
          alt={step.alt}
          className="w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
        />
      </div>
    </div>
  );
}

function Help4() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
        <p className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
          КаТВ заавар
        </p>

        <h2 className="flex items-center gap-3 text-2xl font-black tracking-[-0.4px] md:text-3xl">
          <Search size={28} />
          КаТВ сувгийн хайлт хийх заавар
        </h2>

        <p className="mt-3 max-w-[680px] text-sm leading-6 text-white/85 md:text-base">
          Хүлээн авагч төхөөрөмж дээр сувгийн автомат хайлт хийх дарааллыг
          алхам бүрээр үзүүлэв.
        </p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium leading-6 text-blue-800">
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 shrink-0" size={20} />
          <p>
            Зааврыг дарааллаар нь гүйцэтгэнэ. Суваг хайж байх үед төхөөрөмжөө
            унтраахгүй түр хүлээнэ үү.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {steps.map((step) => (
          <StepCard key={step.number} step={step} />
        ))}
      </div>
    </div>
  );
}

export default Help4;