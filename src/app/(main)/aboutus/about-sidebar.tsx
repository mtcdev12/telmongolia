import Link from "next/link";

const sections = [
  ["Захирлын мэндчилгээ", "director-greeting"],
  ["Танилцуулга", "introduction"],
  ["Алсын хараа", "vision"],
  ["Эрхэм зорилго", "mission"],
  ["Уриа үг", "motto"],
  ["Бидний үнэт зүйлс", "values"],
  ["Бүтэц зохион байгуулалт", "organization"],
  ["Бидний амжилт", "achievements"],
] as const;

export default function AboutSidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-brand-1/30 px-1 py-4 lg:mt-6 lg:w-[300px] lg:border-b-0 lg:border-r lg:px-4 lg:py-0">
      <h2 className="mb-5 text-lg font-semibold tracking-tight text-brand-1">
        Бидний тухай
      </h2>
      <nav aria-label="Бидний тухай хэсгүүд">
        <ul className="grid grid-cols-1 gap-1 text-sm font-medium text-slate-800 sm:grid-cols-2 lg:flex lg:flex-col lg:gap-2">
          {sections.map(([label, id]) => (
            <li key={id}>
              <Link
                href={`#${id}`}
                className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-blue-50 hover:text-brand-2 focus-visible:bg-blue-50 focus-visible:text-brand-2 focus-visible:outline-none"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
