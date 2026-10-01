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

const englishHelpTitles: Record<number, string> = {
  1: "Package service tariffs", 2: "List of channels available on Cable TV", 4: "Cable TV channel-search instructions", 5: "Internet basic charges and tariffs", 6: "Documents required to enter into an agreement", 7: "Connection and basic charges", 8: "International calling-card instructions", 9: "MTC70 SIP instructions", 10: "TVROOM instructions", 11: "Modem settings", 16: "Intellectual property certificate",
};

const getHelpContent = (help: number, locale: "mn" | "en") => {
  const props = { locale };
  const helps: Record<number, React.ReactNode> = {
    1: <Help1 {...props} />,
    2: <Help2 {...props} />,
    4: <Help4 {...props} />,
    5: <Help5 {...props} />,
    6: <Help6 {...props} />,
    7: <Help7 {...props} />,
    8: <Help8 {...props} />,
    9: <Help9 {...props} />,
    10: <Help10 {...props} />,
    11: <Help11 {...props} />,
    16: <Help12 {...props} />,
  };

  return helps[help];
};

const Modal = ({
  help,
  closeHelp,
  locale = "mn",
}: {
  help: number;
  closeHelp: () => void;
  locale?: "mn" | "en";
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
            {locale === "en" ? englishHelpTitles[help] || "Help" : helpTitles[help] || "Тусламж"}
          </DialogTitle>

          <p className="mt-1 text-left text-sm font-medium text-white/80">
            {locale === "en" ? "Detailed information and instructions" : "Дэлгэрэнгүй мэдээлэл болон заавар"}
          </p>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-6 md:px-8">
          <div className="prose prose-slate max-w-none">
            {getHelpContent(help, locale) || (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
                {locale === "en" ? "This help item is not currently available." : "Энэ тусламжийн мэдээлэл одоогоор олдсонгүй."}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
