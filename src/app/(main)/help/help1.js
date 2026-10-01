import React from "react";
import { Home, Layers, Network, PackageCheck, ChevronRight } from "lucide-react";

const homePackages = [
  {
    title: "Дан багц",
    titleEn: "Single-service package",
    desc: "Өрхийн дан үйлчилгээний багцууд",
    descEn: "Single-service packages for residential customers",
    href: "/products/single",
    hrefEn: "/en/services/fixed-line",
    icon: PackageCheck,
  },
  {
    title: "Хосолсон багц",
    titleEn: "Double-play package",
    desc: "Хоёр үйлчилгээ хосолсон багцууд",
    descEn: "Packages combining two services",
    href: "/products/double",
    hrefEn: "/en/services/double-play",
    icon: Layers,
  },
  {
    title: "Гуравласан багц",
    titleEn: "Triple-play package",
    desc: "Интернэт, суурин утас, КаТВ хосолсон багцууд",
    descEn: "Internet, fixed-line and Cable TV in one package",
    href: "/products/triple",
    hrefEn: "/en/services/triple-play",
    icon: Network,
  },
];

function PackageCard({ title, desc, href, Icon }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-[0_14px_35px_rgba(37,99,235,0.14)]"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
          <Icon size={22} />
        </div>

        <div>
          <p className="text-[16px] font-black text-[#061f57]">{title}</p>
          <p className="mt-1 text-sm font-medium text-slate-500">{desc}</p>
        </div>
      </div>

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 transition-all duration-300 group-hover:translate-x-1 group-hover:border-blue-300 group-hover:bg-blue-600 group-hover:text-white">
        <ChevronRight size={19} />
      </div>
    </a>
  );
}

function Help1({ locale = "mn" }) {
  const isEnglish = locale === "en";
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
        <p className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
          {isEnglish ? "Package services" : "Багцын үйлчилгээ"}
        </p>

        <h2 className="flex items-center gap-3 text-2xl font-black tracking-[-0.4px] md:text-3xl">
          <Home size={28} />
          {isEnglish ? "Residential packages" : "Өрхийн багцууд"}
        </h2>

        <p className="mt-3 max-w-[680px] text-sm leading-6 text-white/85 md:text-base">
          {isEnglish
            ? "Choose a single-service, double-play or triple-play package to view its details."
            : "Та өөрт тохирох дан, хосолсон болон гуравласан багцын мэдээллийг доорх сонголтоос үзээрэй."}
        </p>
      </div>

      <div>
        <div className="mb-4">
          <h3 className="text-lg font-black text-[#061f57]">
            {isEnglish ? "Packages for residential customers" : "Өрхөд зориулсан багцууд"}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {isEnglish ? "Select a package type to view detailed information." : "Багцын төрөл сонгоод дэлгэрэнгүй мэдээлэл үзнэ үү."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {homePackages.map((item) => (
            <PackageCard
              key={item.title}
              title={isEnglish ? item.titleEn : item.title}
              desc={isEnglish ? item.descEn : item.desc}
              href={isEnglish ? item.hrefEn : item.href}
              Icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help1;
