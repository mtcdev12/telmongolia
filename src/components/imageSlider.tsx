"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxDotFilled } from "react-icons/rx";
import { ArrowRight } from "lucide-react";

const ImageSlider = ({ data }: { data: any }) => {
  const [currenIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      if (currenIndex === data.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((currenIndex) => currenIndex + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currenIndex, data]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#00318a] via-[#1234d8] to-[#5e16c9] shadow-[0_22px_55px_rgba(0,35,100,0.28)]">
  <div className="relative h-[300px] w-full md:h-[360px] lg:h-[420px]">
    {data.map((d: any, index: number) => (
      <div
        className="absolute inset-0 h-full w-full transition-all"
        key={d.id}
      >
        <Image
          src={`${process.env.API2}/uploads/${d.image}`}
          fill
          alt={d.image || "banner"}
          priority={index === 0}
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            currenIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    ))}

    <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/95 via-[#073be0]/65 to-transparent" />

   <div className="absolute inset-0 flex items-center px-6 md:px-10 lg:px-14">
  <div className="max-w-[620px] text-white">
    <p className="mb-2 text-sm font-semibold text-white/90 md:text-base">
      Шинэ хэрэглэгчдэд зориулсан
    </p>

    <h2 className="text-[22px] font-black uppercase leading-[0.9] tracking-[-2px] md:text-[28px] lg:text-[34px]">
      Онцгой
      <br />
      урамшуулал
    </h2>

    {/* <p className="mt-3 text-sm font-medium text-white/90 md:text-base">
      Гэрээ байгуулж нэмэгдэл дата + урамшуулал аваарай!
    </p> */}

    <Link
      href="/bonus"
      className="mt-6 inline-flex h-12 items-center gap-3 rounded-xl bg-[#2494ff] px-7 text-base font-bold text-white transition hover:bg-[#087bf0]"
    >
      Дэлгэрэнгүй
      <ArrowRight size={20} />
    </Link>
  </div>
</div>

    <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center">
      <div className="flex items-center justify-center rounded-full bg-slate-900/35 px-3 backdrop-blur">
        {data.map((d: any, index: number) => (
          <button
            key={d.id}
            className="text-4xl text-white/55 transition-all"
            onClick={() => setCurrentIndex(index)}
            title="slide"
            type="button"
          >
            <RxDotFilled
              className={`transition-all ${
                currenIndex === index ? "scale-125 text-[#1c91ff]" : ""
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  </div>
</div>
  );
};

export default ImageSlider; 