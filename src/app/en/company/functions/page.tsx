import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "@/app/company/pdfTable";
import { ENGLISH_FUNCTION_DOCUMENTS } from "@/lib/i18n/company";

export default function FunctionsPage() {
  return (
    <div>
      <Breadcrumb locale="en" data={["Corporate governance", "Operational functions"]} />
      <h1 className="mb-5 text-2xl font-black text-brand-1">Operational functions</h1>
      <PdfTable locale="en" list={ENGLISH_FUNCTION_DOCUMENTS} />
    </div>
  );
}
