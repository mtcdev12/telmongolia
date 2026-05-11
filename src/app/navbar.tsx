"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Globe2,
} from "lucide-react";
import Login from "@/components/login";

const personal = [
  ["Суурин утас", "/products/single"],
  ["Хосолсон багц", "/products/double"],
  ["Гуравласан багц", "/products/triple"],
  ["National КаТВ", "/products/catv"],
  ["TVROOM", "/products/iptv"],
  ["MIP70", "/products/sip"],
];

const corporate = [
  ["Суурин утас", "/products/corporate/single"],
  ["Хосолсон багц", "/products/corporate/double"],
  ["National КаТВ", "/products/corporate/catv"],
  ["TVROOM", "/products/corporate/iptv"],
  ["Call Center", "/products/corporate/callcenter"],
  ["Бодит хурдны интернет", "/products/corporate/dedicated"],
];

const topLinks = [
  ["MTC Service", "/"],
  ["MTC Academy", "/"],
  ["Data center", "/"],
  ["TVROOM", "/products/iptv"],
  ["Үндэсний лавлах 1109", "/"],
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <header className="relative z-50 w-full bg-[#001f63] text-white">
      {/* Main navbar */}
      <div className="rounded-b-[28px] bg-gradient-to-r from-[#001b55] via-[#002a78] to-[#002064] shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
        <nav className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="relative h-[50px] w-[190px]">
            <Image
              src="/assets/images/logo_white.png"
              fill
              alt="Telecom Mongolia logo"
              className="object-contain"
              sizes="190px"
              priority
            />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-8 text-[14px] font-semibold text-white md:flex">
            <Dropdown title="Өрхийн хэрэглэгч" items={personal} />
            <Dropdown title="Байгууллага" items={corporate} />

            <NavItem href="/bonus">Урамшуулал</NavItem>
            <NavItem href="/news">Мэдээ мэдээлэл</NavItem>
            <NavItem href="/help">Тусламж</NavItem>
          </ul>

          {/* Right buttons */}
          <div className="hidden items-center gap-5 md:flex">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10"
              title="Search"
            >
              <Search size={23} />
            </button>

            <div className="rounded-full border border-white/25 bg-white/5 px-6 py-3 shadow-inner backdrop-blur transition hover:bg-white/10">
              {/* Хэрвээ Login component чинь зураг шиг харагдахгүй байвал доорх button-г ашиглаж болно */}
              <Login />

              {/* 
              <Link href="/login" className="flex items-center gap-3 text-sm font-semibold">
                <UserRound size={20} />
                Нэвтрэх
              </Link>
              */}
            </div>
          </div>

          {/* Mobile button */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white md:hidden"
            onClick={handleOpen}
            title="menu open"
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[999] transition md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={handleClose}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-[360px] bg-gradient-to-b from-[#001b55] to-[#00358d] p-6 text-white shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="relative h-14 w-36" onClick={handleClose}>
              <Image
                src="/assets/images/logo_white.png"
                fill
                alt="logo"
                className="object-contain"
                sizes="144px"
              />
            </Link>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"
              onClick={handleClose}
              title="menu close"
            >
              <X size={22} />
            </button>
          </div>

          <div className="space-y-6 text-[15px] font-medium">
            <MobileGroup title="Өрхийн хэрэглэгч" items={personal} onClose={handleClose} />
            <MobileGroup title="Байгууллага" items={corporate} onClose={handleClose} />

            <MobileLink href="/bonus" onClose={handleClose}>
              Урамшуулал
            </MobileLink>
            <MobileLink href="/news" onClose={handleClose}>
              Мэдээ мэдээлэл
            </MobileLink>
            <MobileLink href="/help" onClose={handleClose}>
              Тусламж
            </MobileLink>

            <div className="pt-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
                <Login />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="relative flex h-[96px] items-center text-white/95 transition hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:rounded-full after:bg-[#1d8bff] after:transition-transform hover:after:scale-x-100"
    >
      {children}
    </Link>
  );
};

const Dropdown = ({
  title,
  items,
}: {
  title: string;
  items: string[][];
}) => {
  return (
    <li className="group relative flex h-[96px] cursor-pointer items-center">
      <span className="flex items-center gap-1.5 text-white/95 transition group-hover:text-white">
        {title}
        <ChevronDown
          size={15}
          className="transition-transform group-hover:rotate-180"
        />
      </span>

      <ul className="invisible absolute left-1/2 top-[82px] w-64 -translate-x-1/2 translate-y-3 rounded-2xl border border-white/20 bg-white p-3 text-sm font-medium text-slate-700 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map(([name, url]) => (
          <li key={name}>
            <Link
              href={url}
              className="block rounded-xl px-4 py-3 transition hover:bg-blue-50 hover:text-[#0068dd]"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

const MobileGroup = ({
  title,
  items,
  onClose,
}: {
  title: string;
  items: string[][];
  onClose: () => void;
}) => {
  return (
    <div>
      <p className="mb-3 flex items-center gap-2 font-semibold">
        {title}
        <ChevronDown size={15} />
      </p>

      <div className="ml-3 space-y-2 border-l border-white/15 pl-4 text-sm text-white/75">
        {items.map(([name, url]) => (
          <Link
            key={name}
            href={url}
            onClick={onClose}
            className="block py-1 transition hover:text-white"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

const MobileLink = ({
  href,
  children,
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="block rounded-xl px-1 py-1 transition hover:text-blue-200"
    >
      {children}
    </Link>
  );
};

export default Navbar;