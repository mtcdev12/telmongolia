import EnglishShareholdersSidebar from "./sidebar";

export default function EnglishShareholdersLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-4"><EnglishShareholdersSidebar /><div className="container min-w-0 flex-1">{children}</div></div>;
}
