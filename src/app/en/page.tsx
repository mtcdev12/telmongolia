import type { Metadata } from "next";

import Caraosel from "@/components/caraosel";
import Shortcut from "@/components/shortcut";

export const metadata: Metadata = {
  title: "Telecom Mongolia — English",
  alternates: {
    canonical: "/en",
    languages: { mn: "/", en: "/en" },
  },
};

export default function EnglishHomePage() {
  return (
    <main className="relative bg-slate-50">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="-mt-0 md:mt-3">
          <div className="mx-auto my-4 max-w-[2200px]">
            <Caraosel locale="en" />
          </div>

          <div className="mb-5 flex items-center justify-between">
            <h2 className="mt-1 text-2xl font-black tracking-[-0.5px] text-[#061f57]">
              Quick services
            </h2>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Shortcut
              title="PAY"
              desc="BILL"
              description="Pay your bill and continue your service"
              icon="payment.png"
              url="bill"
              locale="en"
            />
            <Shortcut
              title="BUY"
              desc="CARD"
              description="Order a new or additional service card"
              icon="card.png"
              url="cards"
              locale="en"
            />
            <Shortcut
              title="ORDER"
              desc="SERVICE"
              description="Submit a request for a new service or plan"
              icon="order.png"
              url="/en/order"
              locale="en"
            />
            <Shortcut
              title="RESERVE"
              desc="NUMBER"
              description="Find an available number and reserve it"
              icon="number.png"
              url="/en/reserve-number"
              locale="en"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
