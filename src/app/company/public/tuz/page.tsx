import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable, { Row } from "../../pdfTable";

const breadcrumb = ["Ил тод байдал", "ТУЗ-ИЙН ТАЙЛАН"];
const duties = [
  [
    "ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛИЙН 2025 ОНЫ ҮЙЛ АЖИЛЛАГААНЫ ТАЙЛАН",
    "iltodbaidal/Төлөөлөн удирдах зөвлөлийн 2025 оны үйл ажиллагааны тайлан-2026.04.10.pdf",
  ],
  [
    "ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛИЙН 2024 ОНЫ ҮЙЛ АЖИЛЛАГААНЫ ТАЙЛАН",
    "iltodbaidal/tuz2024.pdf",
  ],
  [
    "ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛИЙН 2023 ОНЫ ҮЙЛ АЖИЛЛАГААНЫ ТАЙЛАН",
    "iltodbaidal/tuz2023.pdf",
  ],
];
const duties2 = [
  [
    "ТУЗ-ИЙН НАРИЙН БИЧГИЙН ДАРГЫН ТАЙЛАН- 2025",
    "iltodbaidal/Report_BOD_secretatry-2025.pdf",
  ],
];
const titleRow: Row = {
  type: "title",
  text: "НАРИЙН БИЧГИЙН ДАРГЫН ТАЙЛАН",
} as const;
const titleRow2: Row = {
  type: "title",
  text: "ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛИЙН ҮЙЛ АЖИЛЛАГААНЫ ТАЙЛАН",
} as const;
const mergedList: Row[] = [titleRow2, ...duties, titleRow, ...duties2];
const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      <div>
        <PdfTable list={mergedList} />
      </div>
    </div>
  );
};

export default Page;
