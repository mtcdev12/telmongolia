import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "../../pdfTable";

const breadcrumb = ["Ил тод байдал", "Санхүүгийн тайлан"];
const duties = [
    ['2025 оны 4-р улирлын тайлан' ,'/iltodbaidal/Netgesen_tailan-2025.pdf'],
    ['2024 оны 2-р улирлын тайлан', '/iltodbaidal/2024uliral.pdf'],
    ['2023 оны 4-р улирлын тайлан', '/iltodbaidal/20920234report.pdf'],
    ['2022 оны 2-р улирлын тайлан', 'https://mse.mn/uploads/finance/20920222report.pdf'],
    ['2021 оны 4-р улирлын тайлан', 'https://mse.mn/uploads/finance/20920214report.pdf'],
    ['2021 оны 2-р улирлын тайлан', 'https://mse.mn/uploads/finance/20920212report.pdf'],
    ['2020 оны 2-р улирлын тайлан', 'https://mse.mn/uploads/finance/20920202report.pdf'],
    ['2019 оны 4-р улирлын тайлан', 'https://mse.mn/uploads/finance/20920194report.pdf'],
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