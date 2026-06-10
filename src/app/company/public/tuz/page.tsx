import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "../../pdfTable";

const breadcrumb = ["Ил тод байдал", "ТУЗ-ИЙН ТАЙЛАН"];
const duties = [
    ['ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛИЙН 2025 ОНЫ ҮЙЛ АЖИЛЛАГААНЫ ТАЙЛАН','iltodbaidal/Төлөөлөн удирдах зөвлөлийн 2025 оны үйл ажиллагааны тайлан-2026.04.10.pdf' ],
    ['ТУЗ-ИЙН НАРИЙН БИЧГИЙН ДАРГЫН ТАЙЛАН', 'iltodbaidal/Report_BOD_secretatry-2025.pdf'],
    ['ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛИЙН 2024 ОНЫ ҮЙЛ АЖИЛЛАГААНЫ ТАЙЛАН', 'iltodbaidal/tuz2024.pdf'],
    ['ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛИЙН 2023 ОНЫ ҮЙЛ АЖИЛЛАГААНЫ ТАЙЛАН', 'iltodbaidal/tuz2023.pdf'],
];
const Page = () => {
    return (
        <div>
            <Breadcrumb data={breadcrumb} />
            <div>
                <PdfTable list={duties} />
            </div>
        </div>
    );
}

export default Page;