import React from "react";
import { Award, FileText, ExternalLink, ShieldCheck } from "lucide-react";

const certificates = [
  {
    title: "Итгэлтэй утас оюуны өмч",
    desc: "Оюуны өмчийн гэрчилгээ PDF файл",
    href: "/assets/help/oyuniiumch/Итгэлтэй_утас_оюуны_өмч.pdf",
  },
];

function CertificateCard({ title, desc, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-[0_14px_35px_rgba(37,99,235,0.14)]"
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

function Help12() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
        <p className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
          Гэрчилгээ
        </p>

        <h2 className="flex items-center gap-3 text-2xl font-black tracking-[-0.4px] md:text-3xl">
          <Award size={28} />
          Оюуны өмчийн гэрчилгээ
        </h2>

        <p className="mt-3 max-w-[680px] text-sm leading-6 text-white/85 md:text-base">
          Оюуны өмчийн гэрчилгээ болон холбогдох PDF файлыг эндээс үзнэ үү.
        </p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium leading-6 text-blue-800">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 shrink-0" size={20} />
          <p>
            PDF файл шинэ цонхонд нээгдэнэ. Файлыг үзэх эсвэл татаж авах
            боломжтой.
          </p>
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h3 className="text-lg font-black text-[#061f57]">
            Гэрчилгээний файл
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Доорх файлаас дэлгэрэнгүй мэдээллийг үзнэ үү.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {certificates.map((item) => (
            <CertificateCard
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

export default Help12;