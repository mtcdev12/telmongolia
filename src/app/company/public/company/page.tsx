import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "../../pdfTable";

const breadcrumb = ["Ил тод байдал", "Компанийн засаглалын тайлан"];
const duties = [
    ['Төсвийн гүйцэтгэлийн тайлан','iltodbaidal/Төсвийн гүйцэтгэлийн тайлан.pdf'],
    ['2025-2027 оны зорилтот түвшин','iltodbaidal/2025-2027 оны зорилтот түвшин.pdf'],
    ['1.5 Хөгжлийн бодлого, төлөвлөлтийн баримт бичгийн хэрэгжилтийн тайлан','iltodbaidal/1.5 Хөгжлийн бодлого, төлөвлөлтийн баримт бичгийн хэрэгжилтийн тайлан.pdf'],
    ['ЭБАТ-ны цалин хөлс', 'iltodbaidal/ЭБАТ-ны цалин хөлс (2021-2026).pdf'],
    ['Компанийн засаглалын тайлан 20241030', 'MTC2024-КЗ-ЫН_ҮЙЛ_АЖИЛЛАГААНЫ_ТАЙЛАН-2024-10-30.pdf'],
    ['Компанийн засаглалын тайлан 20240515', 'iltodbaidal/MTC2023-КЗ_ТАЙЛАН.PDF'],
       
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