import EnglishCompanySidebar from "./sidebar";

export default function EnglishCompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <EnglishCompanySidebar />
      <div className="container my-2 flex-1">{children}</div>
    </div>
  );
}
