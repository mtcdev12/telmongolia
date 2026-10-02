"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop({ locale = "mn" }: { locale?: "mn" | "en" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 480);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const label = locale === "en" ? "Back to top" : "Дээш буцах";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={scrollToTop}
      className={`fixed bottom-28 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-brand-1 text-white shadow-[0_12px_30px_rgba(15,50,120,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-brand-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 sm:right-7 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp aria-hidden="true" size={22} strokeWidth={2.4} />
    </button>
  );
}
