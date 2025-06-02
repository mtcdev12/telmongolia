import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "../../pdfTable";

const breadcrumb = ["Ил тод байдал", "Аудитлагдсан тайлан"];
const duties = [
    ['2025 оны санхүүгийн аудитын тайлан', 'iltodbaidal/audited balance 2025.pdf'],
    ['2023 оны санхүүгийн аудитын тайлан', 'iltodbaidal/sanhuuaudit2023.pdf'],
    ['2022 оны санхүүгийн тайланд хийсэн аудитын тайлан', 'iltodbaidal/audit2022.pdf'],
    ['2018 оны санхүүгийн тайлан өгсөн хөндлөнгийн аудитын дүгнэлт', 'iltodbaidal/audit2018.pdf'],
    ['2017 оны санхүүгийн тайлан өгсөн хөндлөнгийн аудитын дүгнэлт', 'iltodbaidal/audit2017.pdf']
    
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