import Breadcrumb from "@/components/ui/breadcrumb";
import SourceContact from "@/components/source-contact";
import PdfTable from "../pdfTable";

const breadcrumb = ["Компанийн засаглал", "Үйл ажиллагааны чиг үүрэг"];
const duties = [
    ['АДХГ', 'chiguureg/АДХГ.pdf'],
    ['БХГ', 'chiguureg/БХГ.pdf'],
    ['МБГ', 'chiguureg/МБГ.pdf'],
    ['ТТАГ', 'chiguureg/ТТАГ.pdf'],
    ['СБААГ', 'chiguureg/СБААГ.pdf'],
    ['УХНГ', 'chiguureg/УХНГ.pdf'],
    ['ИБХГ', 'chiguureg/ИБХГ.pdf'],
    ['ДАГ', 'chiguureg/ДАГ.pdf']
];
const Page = () => {
    return (
        <div>
            <Breadcrumb data={breadcrumb} />
            <div>
                <PdfTable list={duties} />
            </div>
            <SourceContact person="ariungerel" />
        </div>
    );
}

export default Page;
