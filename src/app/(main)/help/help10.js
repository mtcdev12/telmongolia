import React from "react";
import { Clapperboard, ExternalLink, QrCode, Clock, CheckCircle } from "lucide-react";

function Help10() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-[24px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
        <p className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
          TVROOM үйлчилгээ
        </p>

        <h2 className="flex items-center gap-3 text-2xl font-black tracking-[-0.4px] md:text-3xl">
          <Clapperboard size={28} />
          TVROOM ашиглах заавар
        </h2>

        <p className="mt-3 max-w-[720px] text-sm leading-6 text-white/85 md:text-base">
          Кино түрээслэн үзэх, QR төлбөр төлөх болон идэвхжих хугацааны мэдээлэл.
        </p>
      </div>

      {/* Link card */}
      <a
        href="https://tvroom.mn/"
        target="_blank"
        rel="noreferrer"
        className="group flex items-center justify-between gap-4 rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-[0_18px_45px_rgba(37,99,235,0.14)]"
      >
        <div>
          <p className="text-sm font-bold text-slate-500">Вэб сайт</p>
          <p className="mt-1 text-xl font-black text-[#061f57]">
            www.tvroom.mn
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition group-hover:scale-105">
          <ExternalLink size={21} />
        </div>
      </a>

      {/* Steps */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
            <Clapperboard size={23} />
          </div>

          <p className="mb-1 text-xs font-black tracking-[0.18em] text-blue-500">
            АЛХАМ 01
          </p>

          <h3 className="text-lg font-black text-[#061f57]">
            Киногоо сонгох
          </h3>

          <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
            Түрээслэн үзэх гэж байгаа киногоо сонгон орно.
          </p>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
            <QrCode size={23} />
          </div>

          <p className="mb-1 text-xs font-black tracking-[0.18em] text-blue-500">
            АЛХАМ 02
          </p>

          <h3 className="text-lg font-black text-[#061f57]">
            QR төлбөр төлөх
          </h3>

          <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
            Үзэх эсвэл түрээслэх хэсгийг сонгоход QR төлбөр гарч ирнэ.
          </p>
        </div>

        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
            <Clock size={23} />
          </div>

          <p className="mb-1 text-xs font-black tracking-[0.18em] text-blue-500">
            АЛХАМ 03
          </p>

          <h3 className="text-lg font-black text-[#061f57]">
            Идэвхжихийг хүлээх
          </h3>

          <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
            Банкны гүйлгээнээс хамааран 10-15 минутын дараа түрээслэгдэнэ.
          </p>
        </div>
      </div>

      {/* Note */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium leading-6 text-blue-800">
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 shrink-0" size={20} />
          <p>
            QR-г уншуулан төлбөрөө амжилттай төлсний дараа кино түрээс автоматаар
            идэвхжинэ.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <img
          src="/assets/help/tvroompromo.jpg"
          alt="tvroompromo"
          className="w-full rounded-[18px] object-cover"
        />
      </div>
    </div>
  );
}

export default Help10;