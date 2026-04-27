import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../../advantage";
import Intro from "../../intro";
import Comment from "../../comment";
import Price from "../../price";
import { BiCommentDetail } from "react-icons/bi";


const breadcrumb = ["Байгууллага", "TVROOM"];
const comments = ["Долоо хоног болгон шинэ содон кино оруулж байгаад баярлалаа",
                   "Нөхөж үзэх нь 96 цаг бүхэл бүтэн 4 өдөр нөхөж үзэх хугацаа дуусна гэж санаа зовохоо больсон",
                   "Хэрэглэхэд авсаархан хаана ч аваад явж болохоор санагдсан"
                 ];
const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      {/* Introduction section */}
      <Intro
        title="TVROOM"
        bundle="IPTV (OTT)"
        desc="TV room нь IPTV технологийн хөгжлийн дараагийн үе OTT технологи дээр суурилсан интернэтээр дамжуулан телевизийн суваг болон видео контентыг дуу, дүрсний өндөр чанартайгаар бүх төрлийн ухаалаг төхөөрөмжөөр үзэх боломжтой үйлчилгээ юм."
        logo="iptv.png"
      />
      {/* Advantage section */}
      <div className="relative mt-[30px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
          Давуу талуудаас ...
        </h2>
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4">
          <Advantage
            title="Хялбар"
            desc="Та хаанаас ч, хүссэн цагтаа интернэтээр телевизийн олон суваг болон кино, контент үзэх боломжтой"
            img="urh/icon1.png"
          />
          <Advantage
            title="Ухрааж үз"
            desc="Телевизийн сувгууд, хуваарьт нэвтрүүлгийг 96 цагаар нөхөж, ухрааж үзэх боломжтой"
            img="urh/icon4.png"
          />
          <Advantage
            title="Олон суваг"
            desc="Хамгийн олон телевизийн сувагтай /PSN спорт сувгууд болон Movie box-ийн сувгуудтай/"
            img="urh/icon2.png"
          />
          <Advantage
            title="Контент сан"
            desc="Видео сангийн кино контент үнэгүй /Тусгай төлбөрт контентоос бусад/"
            img="urh/icon3.png"
          />
        </div>
      </div>
      {/* price plans */}
      <div className="relative my-[60px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
            Багцын тариф
        </h2>
        <p className="text-right">/НӨАТ орсон/</p>
        <div className="flex gap-8 justify-center flex-wrap">
            <Price title="STANDARD Багц" price={"7,700₮"} list={["ТВ суваг 50-60 суваг", "PSN спортын 5 суваг боломжгүй", "96 цаг хүртэл нөхөж үзэх боломжгүй", "Нэг агшинд зэрэг үзэх төхөөрөмж 1"]}/>
            <Price title="PREMIUM Багц" price={"13,200₮"} list={["ТВ суваг 80+", "PSN спортын 5 суваг Дагалдана", "96 цаг хүртэл нөхөж үзэх Дагалдана", "Нэг агшинд зэрэг үзэх төхөөрөмж 1"]}/>
        </div>
      </div>
      {/* user comments */}
      <div className="relative my-[60px]">
        <div className="text-2xl font-bold text-brand-1 my-4 flex items-center justify-center gap-2"><BiCommentDetail/> Хэрэглэгчдийн сэтгэгдэл </div>
        <Comment comments={comments} />
      </div>
    </div>
  );
};

export default Page;
