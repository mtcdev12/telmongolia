"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Caraosel from "@/components/caraosel";
import Shortcut from "@/components/shortcut";
import Slogans from "@/components/slogans";

const Home = () => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleMore = () => {
    setShowModal(false);
    router.push("/news/95");
  };

  return (
    <main className="bg-slate-50 relative">
      {/* {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-3 text-2xl font-bold text-gray-500 hover:text-gray-800"
            >
              ×
            </button>

            <h2 className="mb-3 text-2xl font-bold text-[#061f57]">
              МЦХ ХК-ийн захирлын сонгон шалгаруулах зар
            </h2>
            <button
              onClick={handleMore}
              className="w-full rounded-xl bg-[#061f57] px-4 py-3 font-bold text-white transition hover:bg-[#0b2f7a]"
            >
              Дэлгэрэнгүй
            </button>
          </div>
        </div>
      )} */}

      {/* <Slogans /> */}

      <div className="mx-auto max-w-[1280px] px-4">
        <div className="-mt-0 md:mt-3">
          <div className="mx-auto my-4 max-w-[2200px]">
            <Caraosel />
          </div>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="mt-1 text-2xl font-black tracking-[-0.5px] text-[#061f57]">
              Түргэн үйлчилгээ
            </h2>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Shortcut
              title="Төлбөр"
              desc="Төлөх"
              icon="payment.png"
              url="bill"
            />
            <Shortcut title="Карт" desc="Авах" icon="card.png" url="cards" />
            <Shortcut
              title="Захиалга"
              desc="Өгөх"
              icon="order.png"
              url="/order"
            />
            <Shortcut
              title="Дугаар"
              desc="Захиалах"
              icon="number.png"
              url="/reservenumber"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;