import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "../../pdfTable";

const breadcrumb = ["Ил тод байдал", "Жилийн тайлан"];
const duties = [
    ['Жилийн тайлан 2025', 'iltodbaidal/2025_report-MTC-web.pdf'],
    ['Жилийн тайлан 2023', 'iltodbaidal/2023jil.PDF'],
    ['Жилийн тайлан 2022', 'iltodbaidal/2022jil.pdf'],
    ['Жилийн тайлан 2021', 'iltodbaidal/2021jil.pdf'],
    ['Жилийн тайлан 2020', 'iltodbaidal/2020jil.pdf'],
    ['Жилийн тайлан 2019', 'iltodbaidal/2019jil.pdf'],
    ['Жилийн тайлан 2018', 'iltodbaidal/2018jil.pdf'],
    ['Жилийн тайлан 2017', 'iltodbaidal/2017jil.pdf'],
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