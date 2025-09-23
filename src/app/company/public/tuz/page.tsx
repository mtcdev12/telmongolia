import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "../../pdfTable";

const breadcrumb = ["Ил тод байдал", "ТУЗ-ИЙН ТАЙЛАН"];
const duties = [
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