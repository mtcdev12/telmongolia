import Link from "next/link";
const Sidebar = () => {
    return (
        <div className="h-full p-4 border-r border-brand-1/40 w-[320px] mt-6">
            <ul className="flex flex-col h-full space-y-8 font-medium tracking-tight text-brand-1">
                <Link href="/shareholders/news" className="hover:text-brand-2 transition-colors">Мэдээлэл</Link>
                <Link href="/shareholders" className="hover:text-brand-2 transition-colors">Хувьцаа эзэмшигчдийн хурал</Link>
                <Link href="https://open.mse.mn/securities/209" target="_blank" rel="noreferrer" className="hover:text-brand-2 transition-colors">Хувьцааны ханш</Link>
                <Link href="https://open.mse.mn/securities/209" target="_blank" rel="noreferrer" className="hover:text-brand-2 transition-colors">Ногдол ашиг</Link>
                <Link href="https://open.mse.mn/securities/209" target="_blank" rel="noreferrer" className="hover:text-brand-2 transition-colors">Санхүүгийн үзүүлэлт</Link>
            </ul>
        </div>
    );
}

export default Sidebar;