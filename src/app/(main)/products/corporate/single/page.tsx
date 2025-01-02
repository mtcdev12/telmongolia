import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../../advantage";
import Intro from "../../intro";
import Comment from "../../comment";
import Price from "../../price";
import { BiCommentDetail } from "react-icons/bi";


const breadcrumb = ["Байгууллага", "Суурин утас"];
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
        desc="Суурин утас нь орчин үед албан харилцааны чухал хэрэгсэл, бизнесийн соёлыг бүрдүүлэх болсон төдийгүй суурин утасны дугаар нь тухайн байгууллагын байр суурь, үйл ажиллагааны тогтвортой байдал, үнэ цэнийг илэрхийлдэг."
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
            desc="Үл тасалдах чанар /Цахилгаан тасарсан үед ч ажиллана/"
            img="baiguullaga/icon1.png"
          />
          <Advantage
            title="Хязгааргүй"
            desc="Сүлжээндээ хязгааргүй болон бусад сүлжээнд ярих минутын эрхтэй"
            img="baiguullaga/icon2.png"
          />
          <Advantage
            title="Элгэсэг"
            desc="Суурин утасны дугаарын сүүлийн 4 оронгоор байгууллага дотроо үнэгүй ярина"
            img="baiguullaga/icon3.png"
          />
          <Advantage
            title="Тохиромжтой"
            desc="Байгууллагын дуудлагыг гар утасруугаа шилжүүлэх боломжтой"
            img="baiguullaga/icon4.png"
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
            <Price title="Багц 1" price={"16,500₮"} list={["Анхны холболтын хураамж Улаанбаатарт 33,000₮, Орон нутагт 16,500₮", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 200 минут", "Нэмэлт үйлчилгээ 1ш"]}/>
            <Price title="Багц 2" price={"33,000₮"} list={["Анхны холболтын хураамж Улаанбаатарт 33,000₮, Орон нутагт 16,500₮", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 400 минут", "Нэмэлт үйлчилгээ 3ш"]}/>
            <Price title="Багц 3" price={"49,500₮"} list={["Анхны холболтын хураамж Улаанбаатарт 33,000₮, Орон нутагт 16,500₮", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 600 минут", "Нэмэлт үйлчилгээ 5ш"]}/>
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
