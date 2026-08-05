import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "@/app/company/pdfTable";
import { ENGLISH_LEGAL_DOCUMENTS } from "@/lib/i18n/company";

export default function LegalPage() {
  return (
    <div>
      <Breadcrumb locale="en" data={["Corporate governance", "Legal and policy documents"]} />
      <h1 className="mb-5 text-2xl font-black text-brand-1">Legal and policy documents</h1>
      <PdfTable locale="en" list={ENGLISH_LEGAL_DOCUMENTS} />
    </div>
  );
}
