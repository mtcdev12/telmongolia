import Link from "next/link";
import { BiGlobe } from "react-icons/bi";

const Topbar = () => {
  return (
    <div className="hidden border-b border-white/10 bg-[#001b55] md:block">
      <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between px-4 text-white">
        <div className="flex items-center gap-7 text-[12px] tracking-tight text-white/85">
          <Link
            href="https://www.facebook.com/profile.php?id=100058955362068"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            MTC Service
          </Link>

          <Link
            href="https://www.facebook.com/profile.php?id=100058955362068"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            MTC Academy
          </Link>

          <Link
            href="https://servers.mn/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            Data center
          </Link>

          <Link
            href="https://tvroom.mn/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            TVROOM
          </Link>

          <Link
            href="https://www.facebook.com/1109.mn"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            Үндэсний лавлах 1109
          </Link>
          <Link 
            href="https://e-zasag.mn/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            E-zasag.mn
          </Link>

          {/* <Link
            href="/shareholders/news/AUTO_INCREMENT"
            className="font-semibold text-yellow-300 transition hover:text-yellow-200"
          >
            МЦХ ХК-ИЙН ХУВЬЦАА ЭЗЭМШИГЧДИЙН АНХААРАЛД
          </Link> */}
        </div>

        <Link
          href="/en"
          className="flex items-center gap-2 text-[13px] font-semibold text-white/90 transition hover:text-white"
        >
          <BiGlobe className="text-[18px]" />
          <span>EN</span>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;