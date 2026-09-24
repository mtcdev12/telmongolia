import Link from "next/link";
import { BiSolidBank, BiSlideshow } from "react-icons/bi";

const Sidebar = () => {
    return (
        <div className="h-full p-4 border-r border-brand-1/40 w-[320px] mt-6">
            <ul className="flex flex-col h-full space-y-4 font-medium tracking-tight text-brand-1">
                <li className="flex gap-1 items-center relative">
                    <BiSolidBank/> Компанийн засаглал
                </li>
                <ul className="ml-8 text-[14px] text-slate-900 flex flex-col space-y-4 font-normal">
                        <Link href="/company/construct">Үйл ажиллагааны бүтэц</Link>
                        <Link href="/company/shareholders">Хувьцаа эзэмшигчдийн бүтэц</Link>
                        <Link href="/company/tuz">Төлөөлөн удирдах зөвлөл</Link>
                        <Link href="/company/exec">Гүйцэтгэх удирдлагын баг</Link>
                        <Link href="/company/duty">Үйл ажиллагааны чиг үүрэг</Link>
                        <Link href="/company/rules">Эрх зүйн акт</Link>
                    </ul>
                <li className="flex gap-1 items-center">
                    <BiSlideshow/> Ил тод байдал
                </li>
                <ul className="ml-8 text-[14px] text-slate-900 flex flex-col space-y-4 font-normal">
                        <Link href="/company/public/company">Компанийн засаглалын тайлан</Link>
                        <Link href="/company/public/yearly">Жилийн тайлан</Link>
                        <Link href="/company/public/seasonly">Улирлын тайлан</Link>
                        <Link href="/company/public/audited">Аудитын тайлан</Link>
                        <Link href="/company/public/financial">Санхүүгийн тайлан</Link>
                        <Link href="/company/public/economic">Эдийн засгийн ил тод байдал</Link>
                        <Link href="/company/public/tuz">ТУЗ-ийн тайлан</Link>
                    </ul>
            </ul>
        </div>
    );
}

export default Sidebar;
