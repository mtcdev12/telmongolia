"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Help1 from "./help1";
import Help2 from "./help2";
import Help4 from "./help4";
import Help5 from "./help5";
import Help6 from "./help6";
import Help7 from "./help7";
import Help8 from "./help8";
import Help9 from "./help9";
import Help10 from "./help10";
import Help11 from "./help11";
import Help12 from "./help12";

const helps: Record<number, React.ReactNode> = {
  1: <Help1 />,
  2: <Help2 />,
  4: <Help4 />,
  5: <Help5 />,
  6: <Help6 />,
  7: <Help7 />,
  8: <Help8 />,
  9: <Help9 />,
  10: <Help10 />,
  11: <Help11 />,
  16: <Help12 />,
};

const helpTitles: Record<number, string> = {
  1: "Багцын үйлчилгээний тариф",
  2: "КаТВ гарч буй сувгийн жагсаалт",
  4: "КаТВ сувгийн хайлтын заавар",
  5: "Интернэтийн суурь хураамж болон тариф",
  6: "Гэрээ хийхэд бүрдүүлэх материал",
  7: "Холболтын хураамж болон суурь хураамж",
  8: "Олон улсын ярианы карт ашиглах заавар",
  9: "MTC70 SIP ашиглах заавар",
  10: "TVROOM ашиглах заавар",
  11: "Модемны тохиргоо",
  16: "Оюуны өмчийн гэрчилгээ",
};

const Modal = ({
  help,
  closeHelp,
}: {
  help: number;
  closeHelp: () => void;
}) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [help]);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      closeHelp();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[960px] overflow-hidden rounded-[28px] border border-slate-200 bg-white p-0 shadow-[0_30px_90px_rgba(15,23,42,0.25)]">
        <DialogHeader className="border-b border-slate-200 bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] px-6 py-5 text-white md:px-8">
          <DialogTitle className="text-left text-xl font-black tracking-[-0.3px] md:text-2xl">
            {helpTitles[help] || "Тусламж"}
          </DialogTitle>

          <p className="mt-1 text-left text-sm font-medium text-white/80">
            Дэлгэрэнгүй мэдээлэл болон заавар
          </p>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-6 md:px-8">
          <div className="prose prose-slate max-w-none">
            {helps[help] || (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
                Энэ тусламжийн мэдээлэл одоогоор олдсонгүй.
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;