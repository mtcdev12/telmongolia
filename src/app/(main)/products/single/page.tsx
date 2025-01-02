import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../advantage";
import Intro from "../intro";
import Comment from "../comment";
import Price from "../price";
import { BiCommentDetail } from "react-icons/bi";


const breadcrumb = ["Өрхийн хэрэглэгч", "Суурин утас"];
const comments = ["Сүлжээгүй үед ч асуудалгүй ажиллах сүүлийн хэрэглээ",
                   "Байгууллагын дотоод холбоог бүрэн найдвартай хийж өгсөнд баярлалаа",
                   "Засвар үйлчилгээг түргэн шуурхай засаж өгсөнд танай хамт олонд баярлалаа."
                 ];
const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      {/* Introduction section */}
      <Intro
        title="Суурин утас"
        bundle="Дан багцийн үйлчилгээ"
        desc="Та гэр бүлийнхээ харилцаа холбооны хэрэгцээгээ эрүүл мэндэд сөрөг
                нөлөөгүй, гэнэтийн ослын үед ч тасралтгүй найдвартай ажиллах суурин
                утсанд даатгаарай."
        logo="single.png"
      />
      {/* Advantage section */}
      <div className="relative mt-[30px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
          Давуу талуудаас ...
        </h2>
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4">
          <Advantage
            title="Тасралтгүй"
            desc="Цахилгаан тасарсан үед ч ажиллана"
            img="urh/icon9.png"
          />
          <Advantage
            title="Найдвартай"
            desc="Сүлжээ унах эрсдэлгүй"
            img="urh/icon10.png"
          />
          <Advantage
            title="Ээлтэй"
            desc="Радиа долгион ялгаруулдаггүй"
            img="urh/icon11.png"
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
            <Price title="Багц 1" price={"9,900₮"} list={["Анхны холболтын хураамж Улаанбаатарт 33,000₮, Орон нутагт 16,500₮", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 100 минут", "Нэмэлт үйлчилгээ 1ш"]}/>
            <Price title="Багц 2" price={"16,500₮"} list={["Анхны холболтын хураамж Улаанбаатарт 33,000₮, Орон нутагт 16,500₮", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 200 минут", "Нэмэлт үйлчилгээ 3ш"]}/>
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
