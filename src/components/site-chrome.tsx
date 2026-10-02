"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import Topbar from "@/app/topbar";
import Chatbot from "@/components/chatbot";
import {
  EnglishFooter,
  EnglishNavbar,
  EnglishTopbar,
} from "@/components/english-chrome";
import FacebookMessenger from "@/components/facebookMessenger";
import Feedback from "@/components/feedback";
import BackToTop from "@/components/back-to-top";

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
      {isEnglish ? (
        <>
          <EnglishTopbar />
          <EnglishNavbar />
        </>
      ) : (
        <>
          <Topbar />
          <Navbar />
        </>
      )}
      <main className="grow">{children}</main>
      <Feedback />
      <BackToTop locale={isEnglish ? "en" : "mn"} />
      <Chatbot locale={isEnglish ? "en" : "mn"} />
      {isEnglish ? <EnglishFooter /> : <Footer />}
      {process.env.NODE_ENV === "production" && <FacebookMessenger />}
    </>
  );
}
