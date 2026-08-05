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

const englishHelpTitles: Record<number, string> = {
  1: "Bundle service tariffs", 2: "Cable TV channel list", 4: "How to scan Cable TV channels", 5: "Internet monthly fees and tariffs", 6: "Documents required for a service agreement", 7: "Connection and monthly fees", 8: "Using an international calling card", 9: "Using MTC70 SIP", 10: "Using TV ROOM", 11: "Modem configuration", 16: "Intellectual-property certificates",
};

const englishHelp: Record<number, React.ReactNode> = {
  1: <p>Residential and organizational bundle prices are available under Services. Choose Fixed-line, Double-play or Triple-play to compare the published monthly fee and included features.</p>,
  2: <p>National Cable TV packages include Mongolian, news, children’s, knowledge, movie, entertainment and sports channels. The exact channel count depends on the selected package.</p>,
  4: <ol><li>Open the television menu and select Channel or Broadcasting settings.</li><li>Choose automatic digital channel search.</li><li>Select Cable or DVB-C when prompted, then start the scan.</li><li>Save the discovered channels after scanning finishes.</li></ol>,
  5: <p>Internet fees depend on customer type, available technology, speed and whether internet is combined with telephone or TV service. The published English plan cards show current verified prices.</p>,
  6: <p>Customers normally provide identification, contact details and the installation address. Organizations also provide their registration or tax number and authorized representative information.</p>,
  7: <p>Connection and recurring fees vary by plan and location. Review the selected plan’s conditions before submitting an order or call 7000-8000 for confirmation.</p>,
  8: <p>Follow the access number and PIN instructions printed on the international calling card, then enter the destination country code and telephone number.</p>,
  9: <p>MTC70 is an internet-based telephone service. Connect the supported device to a working internet connection, enter the assigned account settings and place calls using the full destination number.</p>,
  10: <p>Connect the TV ROOM box to the television and internet, sign in with the assigned account, then choose Live TV, Catch-up or Movies. Charges may apply to selected content.</p>,
  11: <p>Keep the modem powered, connect the incoming service cable securely and restart the device once. If the LOS indicator remains red or internet does not return, contact customer service.</p>,
  16: <p>Telecom Mongolia’s published intellectual-property certificates are retained as official source documents.</p>,
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
            {(locale === "en" ? englishHelp[help] : helps[help]) || (
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
