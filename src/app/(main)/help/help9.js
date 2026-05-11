import React from "react";
import { Download, FileText, Smartphone, Monitor } from "lucide-react";

const mobileGuides = [
  {
    title: "GSWave дугаар тохируулах заавар",
    href: "/assets/help/mtc70/GSWave-дугаар-тохируулах-заавар.pdf",
    type: "pdf",
  },
  {
    title: "GSWave Android APK татах",
    href: "/assets/help/Grandstream-Wave-Lite-Video_1.0.3.34_Apkpure.apk",
    type: "download",
  },
  {
    title: "Onetouchsipphone заавар",
    href: "/assets/help/mtc70/IOS.pdf",
    type: "pdf",
  },
];

const deviceGuides = [
  {
    title: "GXS16xx тохируулга заавар",
    href: "/assets/help/mtc70/GXS16xx.pdf",
  },
  {
    title: "HTEK тохиргоо хийх заавар",
    href: "/assets/help/mtc70/HTEK ТОХИРГОО ХИЙХ ЗААВАР.pdf",
  },
  {
    title: "IP BOX тохиргоо хийх заавар",
    href: "/assets/help/mtc70/IP BOX ТОХИРГОО ХИЙХ ЗААВАР.pdf",
  },
  {
    title: "Microsip заавар",
    href: "/assets/help/mtc70/Microsip заавар.pdf",
  },
  {
    title: "SIP дугаар тохируулах заавар",
    href: "/assets/help/mtc70/SIP-дугаар-тохируулах-заавар.pdf",
  },
  {
    title: "Sofeno тохиргоо",
    href: "/assets/help/mtc70/Sofenosettings.pdf",
  },
  {
    title:"Fanvil заавар",
    href: "/assets/help/mtc70/Fanvil zaavar.pdf",
  },
];

function GuideCard({ title, href, download = false }) {
  return (
    <a
      href={href}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noreferrer"}
      download={download ? true : undefined}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-[0_14px_35px_rgba(37,99,235,0.14)]"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
          {download ? <Download size={20} /> : <FileText size={20} />}
        </div>

        <div>
          <p className="text-[15px] font-bold leading-5 text-[#08245c]">
            {title}
          </p>

          <p className="mt-1 text-xs font-medium text-slate-500">
            {download ? "Файл татах" : "PDF заавар үзэх"}
          </p>
        </div>
      </div>

      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 transition group-hover:bg-blue-600 group-hover:text-white">
        {download ? "APK" : "PDF"}
      </span>
    </a>
  );
}

function Help9() {
  return (
    <div className="space-y-7">
      <div className="rounded-[24px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
        <p className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
          MIP70 үйлчилгээ
        </p>

        <h2 className="text-2xl font-black tracking-[-0.4px] md:text-3xl">
          Интернэт ярианы MIP70 үйлчилгээ
        </h2>

        <p className="mt-3 max-w-[680px] text-sm leading-6 text-white/85 md:text-base">
          Гар утас, таблет, SIP төхөөрөмж болон softphone програм дээр MIP70
          үйлчилгээг тохируулах зааврууд.
        </p>
      </div>

      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Smartphone size={21} />
          </div>

          <div>
            <h3 className="text-lg font-black text-[#061f57]">
              Гар утас болон таблет ашиглан холбогдох
            </h3>

            <p className="text-sm text-slate-500">
              Android, iOS програмын тохиргооны заавар
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {mobileGuides.map((item) => (
            <GuideCard
              key={item.title}
              title={item.title}
              href={item.href}
              download={item.type === "download"}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Monitor size={21} />
          </div>

          <div>
            <h3 className="text-lg font-black text-[#061f57]">
              SIP төхөөрөмж болон програмын тохиргоо
            </h3>

            <p className="text-sm text-slate-500">
              IP phone, IP box, Microsip болон бусад төхөөрөмжийн заавар
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {deviceGuides.map((item) => (
            <GuideCard key={item.title} title={item.title} href={item.href} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Help9;