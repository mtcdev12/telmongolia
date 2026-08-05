import EnglishShareholdersSidebar from "./sidebar";

export default function EnglishShareholdersLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col md:flex-row"><EnglishShareholdersSidebar /><div className="container flex-1">{children}</div></div>;
}
