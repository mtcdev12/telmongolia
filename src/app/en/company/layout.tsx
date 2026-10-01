import EnglishCompanySidebar from "./sidebar";

export default function EnglishCompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-4">
      <EnglishCompanySidebar />
      <div className="container my-2 min-w-0 flex-1">{children}</div>
    </div>
  );
}
