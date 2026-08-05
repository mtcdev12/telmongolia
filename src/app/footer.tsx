import Link from "next/link";
import {
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  Phone,
  Mail,
  Globe,
} from "lucide-react";

const Footer = ({ locale = "mn" }: { locale?: "mn" | "en" }) => {
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? {
        slogan: "Connecting people and organizations.",
        company: "About the company",
        about: "About us",
        transparency: "Transparency account",
        shareholders: "Shareholders",
        legal: "Company information",
        governance: "Corporate governance",
        locations: "Service locations",
        careers: "Careers",
        contact: "Contact",
        copyright: "© 1921 - 2026 Telecom Mongolia JSC.",
        rights: "All rights reserved.",
      }
    : {
        slogan: "Харилцааг өрхийн холбоо.",
        company: "Компанийн тухай",
        about: "Бидний тухай",
        transparency: "Шилэн данс",
        shareholders: "Хувьцаа эзэмшигчдэд",
        legal: "Хууль эрх зүй",
        governance: "Компанийн засаглал",
        locations: "Салбарын байршил",
        careers: "Хүний нөөц",
        contact: "Холбоо барих",
        copyright: "© 1921 - 2026 Монголын Цахилгаан Холбоо ХК.",
        rights: "Бүх эрх хуулиар хамгаалагдсан.",
      };
  return (
    <footer className="bg-gradient-to-r from-[#001b4f] via-[#002b78] to-[#001b4f] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-5">
          {/* Logo + social */}
          <div className="md:col-span-1">
            <Link href={isEnglish ? "/en" : "/"} className="inline-block">
              <div className="text-lg font-bold tracking-wide">
                TELECOM<span className="ml-1 text-white/80">MONGOLIA</span>
              </div>
            </Link>

            <p className="mt-3 text-xs text-white/70">
              {copy.slogan}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://www.facebook.com/TelecomMongoliaCompany/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Facebook size={16} />
              </Link> 

              <Link
                href="https://www.youtube.com/@odgerelgan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Youtube size={16} />
              </Link>

              <Link
                href="https://x.com/mtc_telecom"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Twitter size={16} />
              </Link>

              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Instagram size={16} />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              {copy.company}
            </h4>

            <ul className="space-y-3 text-xs text-white/75">
              <li>
                <Link href={isEnglish ? "/en/about-us" : "/aboutus"} className="transition hover:text-white">
                  {copy.about}
                </Link>
              </li>
              <li>
                <Link
                  href="https://shilendans.gov.mn/organization/42441"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  {copy.transparency}
                </Link>
              </li>
              <li>
                <Link
                  href={isEnglish ? "/en/shareholders" : "/shareholders/news"}
                  className="transition hover:text-white"
                >
                  {copy.shareholders}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              {copy.legal}
            </h4>

            <ul className="space-y-3 text-xs text-white/75">
              <li>
                <Link
                  href={isEnglish ? "/en/company/governance" : "/company/construct"}
                  className="transition hover:text-white"
                >
                  {copy.governance}
                </Link>
              </li>
              <li>
                <Link href={isEnglish ? "/en/locations" : "/locations"} className="transition hover:text-white">
                  {copy.locations}
                </Link>
              </li>
              <li>
                <Link href={isEnglish ? "/en/careers" : "/hr"} className="transition hover:text-white">
                  {copy.careers}
                </Link>
              </li>
            </ul>
          </div>

          {/* User */}
          {/* <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Хэрэглэгчийн хэсэг
            </h4>

            <ul className="space-y-3 text-xs text-white/75">
              <li>
                <Link href="/login" className="transition hover:text-white">
                  Нэвтрэх
                </Link>
              </li>
              <li>
                <Link href="/register" className="transition hover:text-white">
                  Бүртгүүлэх
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition hover:text-white">
                  Түгээмэл асуулт
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              {copy.contact}
            </h4>

            <ul className="space-y-3 text-xs text-white/75">
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <span>7000-8000</span>
              </li>

              <li className="flex items-center gap-2">
                <Mail size={14} />
                <span>bill_info@telecommongolia.mn</span>
              </li>

              <li className="flex items-center gap-2">
                <Globe size={14} />
                <span>www.telecommongolia.mn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-4 text-center text-xs text-white/55">
          {copy.copyright}<br/> {copy.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
