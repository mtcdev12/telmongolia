
const Grade = (props:any) => {
    const isEnglish = props.locale === "en";
    function handleGradeChange(grade:string){
        props.onGradeChange(grade);
    }
    return (
        <div>
            <ul className="flex flex-wrap gap-2 justify-end text-[14px] font-medium">
                <li className={`relative px-4 py-2 hover:bg-yellow-300 hover:text-white cursor-pointer border-b-[6px] border-yellow-300 group ${(props.grade == 'G1' || props.grade == 'G2' || props.grade == 'G3') && 'bg-yellow-300 text-white'}`}>{isEnglish ? "Gold" : "Алтан"}
                    <ul className="absolute top-full bg-white w-[90px] left-0 border border-slate-200 rounded-2xl p-2 -ml-2 text-center text-slate-800 hidden group-hover:block">
                        <li onClick={(e)=>handleGradeChange('G1')} className={`py-2 w-full hover:text-brand-2 ${props.grade == 'G1' && 'text-brand-2'}`}>{isEnglish ? "Gold 1" : "Алтан 1"}</li>
                        <li onClick={(e)=>handleGradeChange('G2')} className={`py-2 w-full hover:text-brand-2 ${props.grade == 'G2' && 'text-brand-2'}`}>{isEnglish ? "Gold 2" : "Алтан 2"}</li>
                        <li onClick={(e)=>handleGradeChange('G3')} className={`py-2 w-full hover:text-brand-2 ${props.grade == 'G3' && 'text-brand-2'}`}>{isEnglish ? "Gold 3" : "Алтан 3"}</li>
                    </ul>
                </li>
                <li onClick={(e)=>handleGradeChange('S')} className={`px-4 py-2 hover:bg-slate-300 hover:text-white cursor-pointer border-b-[6px] border-slate-300 ${props.grade == 'S' && 'bg-slate-300 text-white'}`}>{isEnglish ? "Silver" : "Мөнгөн"}</li>
                <li onClick={(e)=>handleGradeChange('C')} className={`px-4 py-2 hover:bg-amber-600 hover:text-white cursor-pointer border-b-[6px] border-amber-600 ${props.grade == 'C' && 'bg-amber-600 text-white'}`}>{isEnglish ? "Bronze" : "Хүрэл"}</li>
                <li onClick={(e)=>handleGradeChange('N')} className={`px-4 py-2 hover:bg-cyan-500 hover:text-white cursor-pointer border-b-[6px] border-cyan-500 ${props.grade == 'N' && 'bg-cyan-500 text-white'}`}>{isEnglish ? "Standard" : "Энгийн"}</li>
                <li onClick={(e)=>handleGradeChange('A')} className={`px-4 py-2 hover:bg-brand-1 hover:text-white cursor-pointer border-b-[6px] border-brand-1 ${props.grade == 'A' && 'bg-brand-1 text-white'}`}>{isEnglish ? "All" : "Бүгд"}</li>
            </ul>
        </div>
    );
}

export default Grade;
