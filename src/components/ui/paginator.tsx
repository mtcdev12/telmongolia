
const Paginator = ({totalPages, currentPage, handlePageChange}:{totalPages:number, currentPage:number, handlePageChange:any}) => {
    return (
        <div className="flex gap-2">
            {currentPage > 1 && totalPages >= 2 && <Page page={1} isActive={false} pageChange={handlePageChange} />}
                { currentPage - 1 > 1 && <Page page={currentPage - 1} isActive={false} pageChange={handlePageChange} />}
                    {<Page page={currentPage} isActive={true} pageChange={handlePageChange} />}
                {currentPage + 1  < totalPages && <Page page={currentPage + 1} isActive={false} pageChange={handlePageChange} />}
            {currentPage < totalPages && <Page page={totalPages} isActive={false} pageChange={handlePageChange} />}
        </div>
    );
}

const Page = ({page, isActive, pageChange}:{page:number, isActive:boolean, pageChange:any}) =>{
    return <button type="button" onClick={()=>{pageChange(page)}} aria-current={isActive ? "page" : undefined} className={`border border-slate-200 p-2 cursor-pointer text-slate-50 font-semibold rounded-md px-3 text-center ${isActive ? 'bg-brand-3' : 'bg-brand-1'}`}>
        {page}
    </button>
}
export default Paginator;
