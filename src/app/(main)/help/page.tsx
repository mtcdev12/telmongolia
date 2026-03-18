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
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      {isOpen && <Modal help={help} closeHelp={handleCloseHelp} />}
      <Table>
        <TableCaption>Түгээмэл асуултууд</TableCaption>
        {/* <TableHeader>
                    <TableRow>
                    <TableHead>Асуултууд</TableHead>
                    </TableRow>
                </TableHeader> */}
        <TableBody>
          <TableRow className="cursor-pointer" onClick={() => openModal(1)}>
            <TableCell>
              Багцын үйлчилгээний тариф /байгууллага болон өрх/
            </TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(2)}>
            <TableCell>КаТВ гарч буй сувгийн жагсаалт</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(3)}>
            <TableCell>КаТВ-ийн үнэ тариф</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(4)}>
            <TableCell>КаТВ сувгийн хайлтын заавар</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(5)}>
            <TableCell>
              Интернэтийн суурь хураамж болон тариф /байгууллага болон өрх/
            </TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(6)}>
            <TableCell>Гэрээ хийхэд бүрдүүлэх материал</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(7)}>
            <TableCell>
              Холболтын хураамж болон суурь хураамжийн тухай
            </TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(8)}>
            <TableCell>Олон улсын ярианы карт ашиглах заавар</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(9)}>
            <TableCell>MTC70 SIP ашиглах заавар</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(10)}>
            <TableCell>
              TVROOM ашиглах заавар /кино захиалан үзэх заавар/
            </TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(11)}>
            <TableCell>Модемны тохиргоо</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(12)}>
            <TableCell>Callcenter заавар</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(13)}>
            <TableCell>Олон улсын ярианы үйлчилгээний тариф</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(14)}>
            <TableCell>Олон суваг дамжуулах үйлчилгээний холболтын гэрээ</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(15)}>
            <TableCell>Сүлжээ хоорондын харилцан холболтын гэрээ</TableCell>
          </TableRow>
          <TableRow className="cursor-pointer" onClick={() => openModal(16)}>
            <TableCell>Оюуны өмчийн гэрчилгээ</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
