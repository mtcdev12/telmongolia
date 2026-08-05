"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Facebook,
  Globe2,
  Instagram,
  Mail,
  Menu,
  Phone,
  Twitter,
  X,
  Youtube,
} from "lucide-react";

import { ENGLISH_SERVICES } from "@/lib/i18n/english";
import LanguageSwitchLink from "@/components/language-switch-link";

const residential = ENGLISH_SERVICES.filter(
  (service) => service.sourceName !== "Call Center"
).map((service) => [service.title, `/en/services/${service.slug}`]);

const business = [
  ["Business plans", "/en/services#business"],
  ["Call Center", "/en/services/call-center"],
  ["Customer support", "/en/help"],
];

export function EnglishTopbar() {
  return (
    <div className="hidden border-b border-white/10 bg-[#001b55] md:block">
      <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between px-4 text-white">
        <div className="flex items-center gap-7 text-[12px] text-white/85">
          <a href="https://www.facebook.com/profile.php?id=100058955362068" target="_blank" rel="noreferrer">MTC Service</a>
          <a href="https://servers.mn/" target="_blank" rel="noreferrer">Data Center</a>
          <a href="https://tvroom.mn/" target="_blank" rel="noreferrer">TV ROOM</a>
          <a href="https://www.facebook.com/1109.mn" target="_blank" rel="noreferrer">National Directory 1109</a>
        </div>
        <LanguageSwitchLink
          locale="mn"
          className="flex items-center gap-2 text-[13px] font-semibold text-white/90 transition hover:text-white"
        >
          <Globe2 size={17} />
          MN
        </LanguageSwitchLink>
      </div>
    </div>
  );
}

export function EnglishNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }

  return (
    <header className="relative z-50 w-full bg-[#001f63] text-white">
      <div className="rounded-b-[28px] bg-gradient-to-r from-[#001b55] via-[#002a78] to-[#002064] shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
        <nav className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-4" aria-label="English navigation">
          <Link href="/en" className="relative h-[50px] w-[190px]">
            <Image src="/assets/images/logo_white.png" fill alt="Telecom Mongolia" className="object-contain" sizes="190px" priority />
          </Link>

          <ul className="hidden items-center gap-8 text-[14px] md:flex">
            <EnglishDropdown title="Residential" items={residential} />
            <EnglishDropdown title="Business" items={business} />
            <EnglishNavItem href="/en/services">Services</EnglishNavItem>
            <EnglishNavItem href="/en/locations">Locations</EnglishNavItem>
            <EnglishNavItem href="/en/help">Help</EnglishNavItem>
          </ul>

          <Link
            href="/en/contact"
            className="hidden rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/20 md:inline-flex"
          >
            Contact us
          </Link>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 md:hidden"
            onClick={() => {
              setIsOpen(true);
              document.body.style.overflow = "hidden";
            }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-[999] transition md:hidden ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={close}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div
          className={`absolute right-0 top-0 h-full w-[84%] max-w-[360px] overflow-y-auto bg-gradient-to-b from-[#001b55] to-[#00358d] p-6 shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-8 flex items-center justify-between">
            <strong className="text-lg">Telecom Mongolia</strong>
            <button type="button" onClick={close} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10" aria-label="Close menu">
              <X size={21} />
            </button>
          </div>
          <div className="space-y-2 text-sm font-semibold">
            {[
              ["Home", "/en"],
              ["Services", "/en/services"],
              ["Locations", "/en/locations"],
              ["Help", "/en/help"],
              ["Contact us", "/en/contact"],
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={close} className="block rounded-xl px-4 py-3 hover:bg-white/10">
                {label}
              </Link>
            ))}
            <LanguageSwitchLink
              locale="mn"
              className="mt-5 flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3"
            >
              <Globe2 size={17} /> Mongolian
            </LanguageSwitchLink>
          </div>
        </div>
      </div>
    </header>
  );
}

function EnglishNavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative flex h-[70px] items-center text-white/95 transition hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:rounded-full after:bg-[#1d8bff] after:transition-transform hover:after:scale-x-100">
      {children}
    </Link>
  );
}

function EnglishDropdown({ title, items }: { title: string; items: string[][] }) {
  return (
    <li className="group relative flex h-[70px] cursor-pointer items-center">
      <span className="flex items-center gap-1.5">
        {title}<ChevronDown size={15} className="transition group-hover:rotate-180" />
      </span>
      <ul className="invisible absolute left-1/2 top-[64px] w-64 -translate-x-1/2 translate-y-3 rounded-2xl border border-white/20 bg-white p-3 text-sm font-medium text-slate-700 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map(([name, url]) => (
          <li key={`${name}-${url}`}>
            <Link href={url} className="block rounded-xl px-4 py-3 transition hover:bg-blue-50 hover:text-[#0068dd]">{name}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function EnglishFooter() {
  return (
    <footer className="bg-gradient-to-r from-[#001b4f] via-[#002b78] to-[#001b4f] text-white">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="grid gap-8 py-10 md:grid-cols-4">
          <div>
            <strong className="text-lg tracking-wide">TELECOM MONGOLIA</strong>
            <p className="mt-3 max-w-xs text-xs leading-5 text-white/70">Connecting people and organizations across Mongolia since 1921.</p>
            <div className="mt-5 flex gap-3">
              {[
                [Facebook, "https://www.facebook.com/TelecomMongoliaCompany/", "Facebook"],
                [Youtube, "https://www.youtube.com/@odgerelgan", "YouTube"],
                [Twitter, "https://x.com/mtc_telecom", "X"],
                [Instagram, "#", "Instagram"],
              ].map(([Icon, href, label]) => {
                const SocialIcon = Icon as typeof Facebook;
                return <a key={String(label)} href={String(href)} target="_blank" rel="noreferrer" aria-label={String(label)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><SocialIcon size={16} /></a>;
              })}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold">Explore</h2>
            <div className="space-y-3 text-xs text-white/75">
              <Link className="block hover:text-white" href="/en/services">Services and plans</Link>
              <Link className="block hover:text-white" href="/en/locations">Service locations</Link>
              <Link className="block hover:text-white" href="/en/help">Customer help</Link>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold">Company</h2>
            <div className="space-y-3 text-xs text-white/75">
              <Link className="block hover:text-white" href="/en/contact">Contact us</Link>
              <a className="block hover:text-white" href="https://shilendans.gov.mn/organization/42441" target="_blank" rel="noreferrer">Transparency account</a>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold">Contact</h2>
            <ul className="space-y-3 text-xs text-white/75">
              <li className="flex items-center gap-2"><Phone size={14} />7000-8000</li>
              <li className="flex items-center gap-2"><Mail size={14} />bill_info@telecommongolia.mn</li>
              <li className="flex items-center gap-2"><Globe2 size={14} />www.telecommongolia.mn</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/55">© 1921–2026 Telecom Mongolia JSC. All rights reserved.</div>
      </div>
    </footer>
  );
}
