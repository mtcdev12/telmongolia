"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import Chatbot from "@/components/chatbot";
import Feedback from "@/components/feedback";
import FacebookMessenger from "@/components/facebookMessenger";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import Topbar from "@/app/topbar";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  useEffect(() => {
    const locale = isEnglish ? "en" : "mn";
    document.documentElement.lang = locale;
    document.cookie = `site-language=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [isEnglish]);

  return (
    <>
      <Topbar locale={isEnglish ? "en" : "mn"} />
      <Navbar locale={isEnglish ? "en" : "mn"} />
      <main className="grow">{children}</main>
      <Feedback />
      <Chatbot locale={isEnglish ? "en" : "mn"} />
      <Footer locale={isEnglish ? "en" : "mn"} />
      {process.env.NODE_ENV === "production" && <FacebookMessenger />}
    </>
  );
}
