import { getEachNews } from "@/api/server";
import { format_date } from "@/lib/helper";
import Breadcrumb from "@/components/ui/breadcrumb";

const breadcrumb = ["Мэдээлэл"];

const Page = async ({params }:{params :{each:number}}) => {
    const news = await getEachNews(params.each, 'news');
    return (
        <div className="mt-5">
            <Breadcrumb data={breadcrumb} />
            <div className="text-center my-4 text-2xl font-semibold text-brand-1 border-b border-brand-1/20 pb-4 tracking-tight">{news.title}</div>
            <div style={{all: 'revert'}} dangerouslySetInnerHTML={{__html:news.body}} />
            <div className="text-right font-bold text-sm text-brand-1/80 my-2 uppercase">
                Нийтлэгдсэн {format_date(news.created_at)}
            </div>
        </div>

    );
}

export default Page;