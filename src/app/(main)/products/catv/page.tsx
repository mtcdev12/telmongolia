import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../advantage";
import Intro from "../intro";
import Comment from "../comment";
import Price from "../price";
import { BiCommentDetail } from "react-icons/bi";


const breadcrumb = ["Өрхийн хэрэглэгч", "National КаТВ"];
const comments = ["Танин мэдэхүйн Discovery, World wide, Animal plamet танин мэдэхүйгээ дээшлүүлэхэд тустай олон сувагтай",
                   "Хүүхдийн Disney болон олон хүүхдийн сувагтай манай хүүхдүүд их дуртай",
                   "Хамгийн хямд хэрэглэхэд хялбар танай хамт олонд баярлалаа."
                 ];
const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      {/* Introduction section */}
      <Intro
        title="National КаТВ"
        bundle="КАБЕЛИЙН ТВ ҮЙЛЧИЛГЭЭ"
        desc="National кабелийн телевизийн үйлчилгээг Улаанбаатар хот, аймагт шилэн кабел, коаксиаль кабел, агаарын сувгаар хослуулан дуу, дүрсний өндөр чанартайгаар хэрэглэгчдэд хүргэж байна. Монгол улсын хэмжээнд 16 студиэр дамжуулан 80 гаруй телевизийн сувгийг хэрэглэгчдэд хүргэн ажиллаж байна"
        logo="catv.png"
      />
      {/* Advantage section */}
      <div className="relative mt-[30px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
          Давуу талуудаас ...
        </h2>
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4">
          <Advantage
            title="Найдвартай"
            desc="Газар доорх шилэн кабелийн шийдэлтэй тул цаг агаарын хүчин зүйлд хамааралгүй"
            img="urh/icon12.png"
          />
          <Advantage
            title="Өндөр чанар"
            desc="Дуу, дүрсний өндөр чанартай"
            img="baiguullaga/icon23.png"
          />
          <Advantage
            title="Хямд үнэ"
            desc="Төхөөрөмжийн үнэ хямд, антенийн сонголттой, сарын суурь хураамж бага"
            img="baiguullaga/icon24.png"
          />
          <Advantage
            title="PSN"
            desc="PSN спорт багц, MovieBox-ийн сувгуудтай"
            img="urh/icon2.png"
          />
        </div>
      </div>
      {/* price plans */}
      <div className="relative my-[60px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
            Багцын тариф
        </h2>
        <p className="text-right">/Багцын үнийн тариф/</p>
        <div className="flex gap-8 justify-center flex-wrap">
            <Price title="STANDARD Багц" price={"12,000₮"} list={["Анхны холболтын хураамж 5,500₮", "Монгол суваг 59 суваг", "Спорт суваг 10 суваг", "Хүүхдийн суваг 5 суваг", "Танин мэдэхүйн суваг 0", "Кино, интертэймент суваг 0", "Мэдээ, мэдээллийн суваг 0"]}/>
            <Price title="PREMIUM Багц" price={"14,000₮"} list={["Анхны холболтын хураамж 5,500₮", "Монгол суваг 59 суваг", "Спорт суваг 10 суваг", "Хүүхдийн суваг 5 суваг", "Танин мэдэхүйн суваг 4", "Кино, интертэймент суваг 8", "Мэдээ, мэдээллийн суваг 7"]}/>
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
