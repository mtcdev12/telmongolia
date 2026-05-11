"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Cards from "./cards";
import CheckBill from "./checkBill";
import { useState } from "react";

const Shortcut = ({
  title,
  desc,
  icon,
  url,
}: {
  title: string;
  desc: string;
  icon: string;
  url?: string;
}) => {
  const [cards, setCards] = useState(false);
  const [bill, setBill] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    if (url) {
      if (url === "cards") {
        setCards(true);
      } else if (url === "bill") {
        setBill(true);
      } else {
        router.push(url);
      }
    }
  };

  function onCardClose() {
    setTimeout(() => {
      setCards(false);
    }, 200);
  }

  function onModalClose() {
    setTimeout(() => {
      setBill(false);
    }, 200);
  }

  return (
    <>
      {cards && <Cards onCardClose={onCardClose} open={cards} />}
      {bill && <CheckBill onModalClose={onModalClose} open={bill} />}

 <button
  type="button"
  onClick={handleClick}
  className="group relative h-[150px] w-full overflow-hidden rounded-[28px] border border-white/70 bg-white px-6 text-left shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(37,99,235,0.18)]"
>
  {/* background decoration */}
  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-100/70 blur-2xl transition group-hover:bg-blue-200" />
  <div className="absolute -bottom-12 left-10 h-28 w-28 rounded-full bg-cyan-100/60 blur-2xl" />

  <div className="relative z-10 flex h-full items-center justify-between gap-4">
    <div className="flex items-center gap-5">
      {/* Icon box */}
      <div className="relative flex h-[100px] w-[74px] shrink-0 items-center justify-center rounded-[26px] bg-gradient-to-b from-[#1e8cff] to-[#0862d8] shadow-[0_16px_32px_rgba(0,100,217,0.32)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_20px_45px_rgba(0,100,217,0.42)]">
        <div className="absolute inset-x-3 top-3 h-8 rounded-full bg-white/20 blur-md" />

        <Image
          src={"/assets/shortcuts/" + icon}
          fill
          alt={icon}
          className="object-contain p-5 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-[23px] font-black uppercase leading-[1.15] tracking-[-0.5px] text-[#061f57]">
          {title}
          <br />
          {desc}
        </p>

        <p className="mt-3 line-clamp-2 max-w-[170px] text-[14px] font-medium leading-6 text-slate-500">
          {getShortcutDescription(title, desc)}
        </p>
      </div>
    </div>

    {/* Arrow */}
    <div className="absolute right-[-18px] top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-blue-100 bg-white text-[#0b65d8] shadow-[0_10px_25px_rgba(15,23,42,0.10)] transition-all duration-300 group-hover:right-4 group-hover:bg-[#0b65d8] group-hover:text-white">
      <ChevronRight size={22} />
    </div>
  </div>
</button>
    </>
  );
};

const getShortcutDescription = (title: string, desc: string) => {
  const text = `${title} ${desc}`;

  if (text.includes("Төлбөр")) {
    return "Төлбөрөө төлж үйлчилгээгээ үргэлжлүүлээрэй";
  }

  if (text.includes("Карт")) {
    return "Шинэ болон нэмэлт карт авах, захиалах";
  }

  if (text.includes("Захиалга")) {
    return "Шинэ үйлчилгээ, багц захиалгын хүсэлт";
  }

  if (text.includes("Дугаар")) {
    return "Дугаарын мэдээлэл, солих, түржих, нүүлгэх";
  }

  return desc;
};

export default Shortcut;