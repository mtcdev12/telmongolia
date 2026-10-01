import React from "react";
import { PhoneCall, Smartphone, CreditCard, Globe2 } from "lucide-react";

const callGuides = [
  {
    title: "Суурин утаснаас суурин утас руу залгах",
    titleEn: "Calling a fixed-line number from a fixed-line phone",
    formula: "001 + Улсын код + Хотын код + Утасны дугаар",
    formulaEn: "001 + country code + area code + telephone number",
    icon: PhoneCall,
  },
  {
    title: "Суурин утаснаас гар утас руу залгах",
    titleEn: "Calling a mobile number from a fixed-line phone",
    formula: "001 + Улсын код + Утасны дугаар",
    formulaEn: "001 + country code + mobile number",
    icon: Smartphone,
  },
  {
    title: "3000, 5000 Easy карт ашиглах",
    titleEn: "Using a 3000 or 5000 Easy card",
    formula: "1636-004-картын дугаар-нууц дугаар-утасны дугаар",
    formulaEn: "1636-004-card number-PIN-telephone number",
    icon: CreditCard,
  },
];

function CallGuideCard({ title, formula, Icon }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-[0_16px_40px_rgba(37,99,235,0.14)]">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
          <Icon size={23} />
        </div>

        <h3 className="text-[16px] font-black leading-6 text-[#061f57]">
          {title}
        </h3>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
        <p className="text-sm font-bold leading-6 text-blue-700">
          {formula}
        </p>
      </div>
    </div>
  );
}

function Help8({ locale = "mn" }) {
  const isEnglish = locale === "en";
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-[24px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
        <p className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
          {isEnglish ? "International calling" : "Олон улсын яриа"}
        </p>

        <h2 className="flex items-center gap-3 text-2xl font-black tracking-[-0.4px] md:text-3xl">
          <Globe2 size={28} />
          {isEnglish ? "International calls" : "Улс хоорондын яриа"}
        </h2>

        <p className="mt-3 max-w-[680px] text-sm leading-6 text-white/85 md:text-base">
          {isEnglish ? "Dialing sequences for international calls from a fixed-line phone and instructions for using an Easy card." : "Суурин утаснаас олон улс руу залгах дараалал болон Easy карт ашиглах заавар."}
        </p>
      </div>

      {/* Guide cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {callGuides.map((item) => (
          <CallGuideCard
            key={item.title}
            title={isEnglish ? item.titleEn : item.title}
            formula={isEnglish ? item.formulaEn : item.formula}
            Icon={item.icon}
          />
        ))}
      </div>

      {/* Small note */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-800">
        <strong>{isEnglish ? "Note:" : "Санамж:"}</strong>{" "}
        {isEnglish ? "Check that the country and area codes are correct." : "Улсын код болон хотын кодыг зөв оруулсан эсэхээ шалгаарай."}
      </div>
    </div>
  );
}

export default Help8;
