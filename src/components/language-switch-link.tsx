"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mnToEn: Record<string, string> = {
  "/": "/en", "/aboutus": "/en/about-us", "/contact": "/en/contact", "/locations": "/en/locations", "/help": "/en/help", "/hr": "/en/careers", "/news": "/en/news", "/bonus": "/en/offers", "/order": "/en/order", "/reservenumber": "/en/reserve-number", "/shareholders": "/en/shareholders", "/shareholders/news": "/en/news",
  "/company": "/en/company/governance", "/company/construct": "/en/company/structure", "/company/shareholders": "/en/company/shareholding", "/company/tuz": "/en/company/board", "/company/exec": "/en/company/executive-team", "/company/duty": "/en/company/functions", "/company/rules": "/en/company/legal",
  "/company/public/company": "/en/company/transparency/governance", "/company/public/yearly": "/en/company/transparency/annual", "/company/public/seasonly": "/en/company/transparency/quarterly", "/company/public/audited": "/en/company/transparency/audited", "/company/public/financial": "/en/company/transparency/financial", "/company/public/economic": "/en/company/transparency/economic", "/company/public/tuz": "/en/company/transparency/board",
  "/products/single": "/en/services/fixed-line", "/products/double": "/en/services/double-play", "/products/triple": "/en/services/triple-play", "/products/catv": "/en/services/national-catv", "/products/iptv": "/en/services/tv-room", "/products/sip": "/en/services/mip70", "/products/corporate/callcenter": "/en/services/call-center",
};

const enToMn = Object.fromEntries(Object.entries(mnToEn).map(([mn, en]) => [en, mn]));

function mapPath(pathname: string, locale: "mn" | "en") {
  if (locale === "en") {
    if (pathname.startsWith("/news/")) return pathname.replace("/news/", "/en/news/");
    if (pathname.startsWith("/bonus/")) return pathname.replace("/bonus/", "/en/offers/");
    return mnToEn[pathname] ?? "/en";
  }
  if (pathname.startsWith("/en/news/")) return pathname.replace("/en/news/", "/news/");
  if (pathname.startsWith("/en/offers/")) return pathname.replace("/en/offers/", "/bonus/");
  return enToMn[pathname] ?? "/";
}

export default function LanguageSwitchLink({
  locale,
  className,
  children,
}: {
  locale: "mn" | "en";
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const destination = mapPath(pathname, locale);
  const href = `/api/language/${locale}?returnTo=${encodeURIComponent(destination)}`;

  return (
    <Link
      href={href}
      hrefLang={locale}
      prefetch={false}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        window.location.assign(href);
      }}
    >
      {children}
    </Link>
  );
}
