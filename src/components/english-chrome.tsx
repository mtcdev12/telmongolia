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
  Search,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { BiGlobe } from "react-icons/bi";

import { ENGLISH_SERVICES } from "@/lib/i18n/english";
import LanguageSwitchLink from "@/components/language-switch-link";
import Login from "@/components/login";

const residential = ENGLISH_SERVICES.filter(
  (service) => service.sourceName !== "Call Center"
).map((service) => [service.title, `/en/services/${service.slug}`]);

const business = [
  ["Fixed-line telephone", "/en/services/fixed-line"],
  ["Double-play bundles", "/en/services/double-play"],
  ["National Cable TV", "/en/services/national-catv"],
  ["TVROOM", "/en/services/tv-room"],
  ["Call Center", "/en/services/call-center"],
  ["Dedicated internet", "/en/services#business"],
];

export function EnglishTopbar() {
  return (
    <div className="hidden bg-brand-night md:block">
      <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between px-4 text-white">
        <div className="flex items-center gap-7 text-[12px] tracking-tight text-white/85">
          <a className="transition hover:text-white" href="https://www.facebook.com/profile.php?id=100058955362068" target="_blank" rel="noreferrer">MTC Service</a>
          <a className="transition hover:text-white" href="https://www.facebook.com/profile.php?id=100058955362068" target="_blank" rel="noreferrer">MTC Academy</a>
          <a className="transition hover:text-white" href="https://servers.mn/" target="_blank" rel="noreferrer">Data center</a>
          <a className="transition hover:text-white" href="https://tvroom.mn/" target="_blank" rel="noreferrer">TVROOM</a>
          <a className="transition hover:text-white" href="https://www.facebook.com/1109.mn" target="_blank" rel="noreferrer">National Directory 1109</a>
          <a className="transition hover:text-white" href="https://e-zasag.mn/" target="_blank" rel="noreferrer">E-zasag.mn</a>
        </div>
        <LanguageSwitchLink
          locale="mn"
          className="flex items-center gap-2 text-[13px] font-semibold text-white/90 transition hover:text-white"
        >
          <BiGlobe className="text-[18px]" />
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
    <header className="relative z-50 w-full bg-brand-night text-white">
      <div className="rounded-b-[28px] bg-brand-night shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
        <nav className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-4" aria-label="English navigation">
          <Link href="/en" className="relative h-[48px] w-[108px] overflow-hidden">
            <Image src="/assets/images/logo-new-white.webp" fill alt="Telecom Mongolia" className="scale-[1.85] object-contain" sizes="108px" priority />
          </Link>

          <ul className="hidden items-center gap-8 text-[14px] text-white md:flex">
            <EnglishDropdown title="Residential" items={residential} />
            <EnglishDropdown title="Business" items={business} />
            <EnglishNavItem href="/en/offers">Offers</EnglishNavItem>
            <EnglishNavItem href="/en/news">News</EnglishNavItem>
            <EnglishNavItem href="/en/help">Help</EnglishNavItem>
          </ul>

          <div className="hidden items-center gap-5 md:flex">
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10" aria-label="Search">
              <Search size={23} />
            </button>
            <div className="rounded-full border border-white/25 bg-white/5 px-6 py-3 shadow-inner backdrop-blur transition hover:bg-white/10">
              <Login locale="en" />
            </div>
          </div>

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
          className={`absolute right-0 top-0 h-full w-[82%] max-w-[360px] overflow-y-auto bg-brand-night p-6 shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-8 flex items-center justify-between">
            <Link href="/en" className="relative h-14 w-[104px] overflow-hidden" onClick={close}>
              <Image src="/assets/images/logo-new-white.webp" fill alt="Telecom Mongolia" className="scale-[1.85] object-contain" sizes="104px" />
            </Link>
            <button type="button" onClick={close} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10" aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <div className="space-y-6 text-[15px] font-medium">
            <EnglishMobileGroup title="Residential" items={residential} onClose={close} />
            <EnglishMobileGroup title="Business" items={business} onClose={close} />
            <Link href="/en/offers" onClick={close} className="block rounded-xl px-1 py-1 transition hover:text-blue-200">Offers</Link>
            <Link href="/en/news" onClick={close} className="block rounded-xl px-1 py-1 transition hover:text-blue-200">News</Link>
            <Link href="/en/help" onClick={close} className="block rounded-xl px-1 py-1 transition hover:text-blue-200">Help</Link>
            <div className="rounded-xl border border-white/20 bg-white/5 px-4 py-3">
              <Login locale="en" />
            </div>
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

function EnglishMobileGroup({ title, items, onClose }: { title: string; items: string[][]; onClose: () => void }) {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 font-semibold">{title}<ChevronDown size={15} /></p>
      <div className="ml-3 space-y-2 border-l border-white/15 pl-4 text-sm text-white/75">
        {items.map(([name, url]) => (
          <Link key={`${name}-${url}`} href={url} onClick={onClose} className="block py-1 transition hover:text-white">{name}</Link>
        ))}
      </div>
    </div>
  );
}

function EnglishNavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative flex h-[96px] items-center text-white/95 transition hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:rounded-full after:bg-[#1d8bff] after:transition-transform hover:after:scale-x-100">
      {children}
    </Link>
  );
}

function EnglishDropdown({ title, items }: { title: string; items: string[][] }) {
  return (
    <li className="group relative flex h-[96px] cursor-pointer items-center">
      <span className="flex items-center gap-1.5 text-white/95 transition group-hover:text-white">
        {title}<ChevronDown size={15} className="transition-transform group-hover:rotate-180" />
      </span>
      <ul className="invisible absolute left-1/2 top-[82px] w-64 -translate-x-1/2 translate-y-3 rounded-2xl border border-white/20 bg-white p-3 text-sm font-medium text-slate-700 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
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
    <footer className="bg-brand-night text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-5">
          <div className="md:col-span-1">
            <Link href="/en" className="relative block h-[60px] w-40 overflow-hidden">
              <Image src="/assets/images/logo-new-white.webp" fill alt="Telecom Mongolia logo" className="scale-[1.85] object-contain" sizes="160px" />
            </Link>
            <p className="mt-3 text-xs text-white/70">Connecting every conversation.</p>
            <div className="mt-5 flex items-center gap-3">
              {[
                [Facebook, "https://www.facebook.com/TelecomMongoliaCompany/", "Facebook"],
                [Youtube, "https://www.youtube.com/@odgerelgan", "YouTube"],
                [Twitter, "https://x.com/mtc_telecom", "X"],
                [Instagram, "#", "Instagram"],
              ].map(([Icon, href, label]) => {
                const SocialIcon = Icon as typeof Facebook;
                return <a key={String(label)} href={String(href)} target="_blank" rel="noreferrer" aria-label={String(label)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"><SocialIcon size={16} /></a>;
              })}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">About the company</h2>
            <ul className="space-y-3 text-xs text-white/75">
              <li><Link className="transition hover:text-white" href="/en/about-us">About us</Link></li>
              <li><a className="transition hover:text-white" href="https://shilendans.gov.mn/organization/42441" target="_blank" rel="noreferrer">Transparency account</a></li>
              <li><Link className="transition hover:text-white" href="/en/shareholders/news">For shareholders</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">Legal and corporate</h2>
            <ul className="space-y-3 text-xs text-white/75">
              <li><Link className="transition hover:text-white" href="/en/company/governance">Corporate governance</Link></li>
              <li><Link className="transition hover:text-white" href="/en/locations">Service locations</Link></li>
              <li><Link className="transition hover:text-white" href="/en/careers">Human resources</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">Contact</h2>
            <ul className="space-y-3 text-xs text-white/75">
              <li className="flex items-center gap-2"><Phone size={14} />7000-8000</li>
              <li className="flex items-center gap-2"><Mail size={14} />telecommongolia@mtcone.net</li>
              <li className="flex items-center gap-2"><Globe2 size={14} />www.telecommongolia.mn</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/55">© 1921 - 2026 Telecom Mongolia JSC.<br />All rights reserved.</div>
      </div>
    </footer>
  );
}
