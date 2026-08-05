import Link from "next/link";

export default function EnglishShareholdersSidebar() {
  return (
    <aside className="h-full w-full border-b border-brand-1/40 p-4 md:mt-6 md:w-[320px] md:border-b-0 md:border-r">
      <nav className="flex h-full flex-col space-y-8 font-medium tracking-tight text-brand-1">
        <Link href="/en/news" className="transition-colors hover:text-brand-2">Information</Link>
        <Link href="/en/shareholders" className="transition-colors hover:text-brand-2">Shareholders' meetings</Link>
        <a href="https://open.mse.mn/securities/209" target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-2">Share price</a>
        <a href="https://open.mse.mn/securities/209" target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-2">Dividends</a>
        <a href="https://open.mse.mn/securities/209" target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-2">Financial indicators</a>
      </nav>
    </aside>
  );
}
