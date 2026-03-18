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
const Modal = ({ help, closeHelp }: { help: number; closeHelp: any }) => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, []);
  const handleOpenChange = () => {
    closeHelp(true);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={() => handleOpenChange()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto h-[480px]">{helps[help]}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
