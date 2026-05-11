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

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#001b4f] via-[#002b78] to-[#001b4f] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-5">
          {/* Logo + social */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <div className="text-lg font-bold tracking-wide">
                TELECOM<span className="ml-1 text-white/80">MONGOLIA</span>
              </div>
            </Link>

            <p className="mt-3 text-xs text-white/70">
              Харилцааг өрхийн холбоо.
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
              Компанийн тухай
            </h4>

            <ul className="space-y-3 text-xs text-white/75">
              <li>
                <Link href="/aboutus" className="transition hover:text-white">
                  Бидний тухай
                </Link>
              </li>
              <li>
                <Link
                  href="https://shilendans.gov.mn/organization/42441"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  Шилэн данс
                </Link>
              </li>
              <li>
                <Link
                  href="/shareholders/news"
                  className="transition hover:text-white"
                >
                  Хувьцаа эзэмшигчдэд
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Хууль эрх зүй
            </h4>

            <ul className="space-y-3 text-xs text-white/75">
              <li>
                <Link
                  href="/company/construct"
                  className="transition hover:text-white"
                >
                  Компанийн засаглал
                </Link>
              </li>
              <li>
                <Link href="/locations" className="transition hover:text-white">
                  Салбарын байршил
                </Link>
              </li>
              <li>
                <Link href="/hr" className="transition hover:text-white">
                  Хүний нөөц
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
              Холбоо барих
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
          © 1921 - 2026 Монголын Цахилгаан Холбоо ХК.<br/> Бүх эрх хуулиар
          хамгаалагдсан.
        </div>
      </div>
    </footer>
  );
};

export default Footer;