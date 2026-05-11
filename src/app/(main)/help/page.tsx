"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, FileText } from "lucide-react";
import Breadcrumb from "@/components/ui/breadcrumb";
import { useState } from "react";
import Modal from "./modal";

const breadcrumb = ["Тусламж"];
const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [help, setHelp] = useState<number>(0);
  const openModal = (num: number) => {
    if (num === 3) {
      window.location.href = "/products/catv";
    } else if (num === 12) {
      window.location.href = "/assets/help/Stats-Handbook-for MTC.pdf";
    } else if (num === 13) {
      window.location.href = "/assets/help/a133tushaaltarif.pdf";
    } else if (num === 14) {
      window.location.href = "/assets/help/SKM_C250i24052711231.pdf";
    } else if (num === 15) {
      window.location.href = "/assets/help/Монголын цахилгаан холбоо ХК RIO.pdf";
    }else {
      setHelp(num);
      setIsOpen(true);
    }
  };
  const handleCloseHelp = () => {
    setIsOpen(false);
  };
  const helpItems = [
  { id: 1, title: "Багцын үйлчилгээний тариф /байгууллага болон өрх/" },
  { id: 2, title: "КаТВ гарч буй сувгийн жагсаалт" },
  { id: 3, title: "КаТВ-ийн үнэ тариф" },
  { id: 4, title: "КаТВ сувгийн хайлтын заавар" },
  { id: 5, title: "Интернэтийн суурь хураамж болон тариф /байгууллага болон өрх/" },
  { id: 6, title: "Гэрээ хийхэд бүрдүүлэх материал" },
  { id: 7, title: "Холболтын хураамж болон суурь хураамжийн тухай" },
  { id: 8, title: "Олон улсын ярианы карт ашиглах заавар" },
  { id: 9, title: "MTC70 SIP ашиглах заавар" },
  { id: 10, title: "TVROOM ашиглах заавар /кино захиалан үзэх заавар/" },
  { id: 11, title: "Модемны тохиргоо" },
  { id: 12, title: "Callcenter заавар" },
  { id: 13, title: "Олон улсын ярианы үйлчилгээний тариф" },
  { id: 14, title: "Олон суваг дамжуулах үйлчилгээний холболтын гэрээ" },
  { id: 15, title: "Сүлжээ хоорондын харилцан холболтын гэрээ" },
  { id: 16, title: "Оюуны өмчийн гэрчилгээ" },
];
  return (
  <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
    <Breadcrumb data={breadcrumb} />

    {isOpen && <Modal help={help} closeHelp={handleCloseHelp} />}

    <section className="mx-auto max-w-[1180px] px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-7 text-white shadow-[0_20px_55px_rgba(37,99,235,0.25)] md:p-10">
        <div className="max-w-[680px]">
          <p className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            Тусламжийн төв
          </p>

          <h1 className="text-3xl font-black tracking-[-0.7px] md:text-5xl">
            Түгээмэл асуултууд
          </h1>

          <p className="mt-4 text-base leading-7 text-white/85 md:text-lg">
            Үйлчилгээ, тариф, гэрээ, тохиргоо болон ашиглах заавруудыг нэг
            дороос үзээрэй.
          </p>
        </div>
      </div>

      {/* Help list */}
      <div className="rounded-[28px] border border-slate-200/70 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-5">
        <div className="mb-4 flex items-center justify-between px-2 md:px-3">
          <div>
            <h2 className="text-xl font-black text-[#061f57] md:text-2xl">
              Асуултын жагсаалт
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Нийт {helpItems.length} тусламжийн мэдээлэл байна
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {helpItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openModal(item.id)}
              className="group flex min-h-[86px] items-center justify-between gap-4 rounded-[20px] border border-slate-200 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-[0_14px_35px_rgba(37,99,235,0.14)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
                  <FileText size={21} />
                </div>

                <div>
                  <p className="mb-1 text-xs font-bold text-blue-500">
                    #{String(index + 1).padStart(2, "0")}
                  </p>

                  <p className="line-clamp-2 text-[15px] font-bold leading-6 text-[#08245c] md:text-base">
                    {item.title}
                  </p>
                </div>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 transition-all duration-300 group-hover:translate-x-1 group-hover:border-blue-300 group-hover:bg-blue-600 group-hover:text-white">
                <ChevronRight size={20} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  </div>
);
};

export default Page;
