import { BiHomeAlt } from "react-icons/bi";
const Breadcrumb = ({ data, locale = "mn" }: { data: string[]; locale?: "mn" | "en" }) => {
    return (
        <div className="flex flex-wrap gap-2 items-center uppercase tracking-tighter text-[14px] my-4 font-normal">
            <div className="after:content-['/'] after:pl-1 flex items-center gap-1 text-brand-1">
                <BiHomeAlt className="text-brand-1"/> {locale === "en" ? "Home" : "Нүүр"}
            </div>
            {
                data.map((d:string, index:number)=>{
                    return <div key={index} className={`text-brand-1  ${index !== data.length-1 ? "after:content-['/'] after:pl-1" : "text-brand-3 font-medium" }`}>
                        {d}
                    </div>;
                })
            }
        </div>
    );
}

export default Breadcrumb;
