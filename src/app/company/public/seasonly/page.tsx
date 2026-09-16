import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "../../pdfTable";

const breadcrumb = ["Ил тод байдал", "Улирлын тайлан"];
const duties = [
    ['Хагас жилийн тайлан 2024', 'iltodbaidal/2024_semi_annual_report.pdf'],
    ['Хагас жилийн тайлан 2020', 'iltodbaidal/2020hagasjil.pdf'],
    ['Хагас жилийн тайлан 2019', 'iltodbaidal/2019hagasjil.pdf'],
    ['Хагас жилийн тайлан 2018', 'iltodbaidal/2018hagasjil.pdf']
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