import React from "react";
import { Wifi, FileText, Router, ExternalLink } from "lucide-react";

const modemGuides = [
  {
    title: "Алдааны заавар",
    desc: "Модем болон интернэтийн нийтлэг алдааны заавар",
    href: "/assets/help/modem/Алдааны заавар.pdf",
  },
  {
    title: "TP-Link",
    desc: "TP-Link modem/router тохиргооны заавар",
    href: "/assets/help/modem/TP-Link.pdf",
  },
  {
    title: "Netis",
    desc: "Netis modem/router тохиргооны заавар",
    href: "/assets/help/modem/Netis.pdf",
  },
  {
    title: "KASDA WIFI ADSL ROUTER",
    desc: "KASDA WIFI ADSL router тохиргооны заавар",
    href: "/assets/help/modem/KASDA WIFI ADSL ROUTER.pdf",
  },
  {
    title: "Grandstream",
    desc: "Grandstream 1610 төхөөрөмжийн тохиргооны заавар",
    href: "/assets/help/modem/grandstream1610 (1).pdf",
  },
];

function GuideCard({ title, desc, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-[0_14px_35px_rgba(37,99,235,0.14)]"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
          <FileText size={22} />
        </div>

        <div>
          <p className="text-[16px] font-black leading-5 text-[#061f57]">
            {title}
          </p>

          <p className="mt-1 text-sm font-medium leading-5 text-slate-500">
            {desc}
          </p>
        </div>
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 transition-all duration-300 group-hover:translate-x-1 group-hover:border-blue-300 group-hover:bg-blue-600 group-hover:text-white">
        <ExternalLink size={19} />
      </div>
    </a>
  );
}

function Help11() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
        <p className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
          Тохиргооны заавар
        </p>

        <h2 className="flex items-center gap-3 text-2xl font-black tracking-[-0.4px] md:text-3xl">
          <Router size={28} />
          Модем тохиргоо
        </h2>

        <p className="mt-3 max-w-[680px] text-sm leading-6 text-white/85 md:text-base">
          TP-Link, Netis, KASDA, Grandstream болон нийтлэг алдааны PDF
          заавруудыг эндээс үзнэ үү.
        </p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium leading-6 text-blue-800">
        <div className="flex items-start gap-3">
          <Wifi className="mt-0.5 shrink-0" size={20} />
          <p>
            PDF файлыг шинэ цонхонд нээж үзнэ. Төхөөрөмжийн загвараа сонгоод
            тохиргооны зааврыг дагана уу.
          </p>
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h3 className="text-lg font-black text-[#061f57]">
            PDF зааврууд
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Доорх жагсаалтаас тохирох заавраа сонгоно уу.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {modemGuides.map((item) => (
            <GuideCard
              key={item.title}
              title={item.title}
              desc={item.desc}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help11;