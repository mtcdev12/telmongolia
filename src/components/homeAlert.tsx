"use client";

import { useEffect, useState } from "react";

const HomeAlert = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);

    const timer = setTimeout(() => {
      setOpen(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      <div className="relative w-[90%] max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h1 className="mb-4 text-center text-2xl font-bold">
          “МОНГОЛЫН ЦАХИЛГААН ХОЛБОО” ХК-ИЙН ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛИЙН ХАРААТ БУС
          ГИШҮҮН СОНГОН ШАЛГАРУУЛАХ ЗАР
        </h1>

        <div className="flex justify-center">
          <a
            href="/news/94"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Дэлгэрэнгүй
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeAlert;