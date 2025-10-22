import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../advantage";
import Intro from "../intro";
import Comment from "../comment";
import Price from "../price";
import { BiCommentDetail } from "react-icons/bi";


const breadcrumb = ["Өрхийн хэрэглэгч", "Гуравласан багц"];
const comments = ["Үнэ их боломжийн санагдсан надад лав таалагдсан",
                   "Спортын үнэнч фен бидэнд зориулсан олон спортын сувагтай шүү баярлалаа танай хамт олонд.",
                   "Wifi холболттой болохоор өрөөн дотроо хөдөлгөхөд их амар санагдсан"
                 ];
const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      {/* Introduction section */}
      <Intro
        title="Гуравласан багц"
        bundle="СУУРИН УТАС + ИНТЕРНЭТ + IPTV (OTT)"
        desc="Суурин утас, дата хязгааргүй, өндөр хурдны интернэт, дуу, дүрсний өндөр чанар телевизийн олон суваг (IPTV-ийн хөгжлийн дараагийн ОТТ технологи ашигладаг) зэргийг нэгтгэсэн гуравласан үйлчилгээг санал болгож байна."
        logo="triple.png"
      />
      {/* Advantage section */}
      <div className="relative mt-[30px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
          Давуу талуудаас ...
        </h2>
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4">
          <Advantage
            title="Дата хязгааргүй"
            desc="Дата хязгааргүй интернэт"
            img="urh/icon5.png"
          />
          <Advantage
            title="Дураараа ярь"
            desc="Сүлжээндээ хязгааргүй болон бусад сүлжээнд ярих минутын эрхтэй"
            img="urh/icon15.png"
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
            <Price title="Багц 1" price={"49,500₮"} list={["Анхны холболтын хураамж 22,000₮", "Интернэтийн хурд 20Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 30 минут", "TV ROOM ТВ суваг 80+", "SPS спорт багц Дагалдана", "96 цагийн нөхөж үзэх дагалдана", "Нэмэлт үйлчилгээ 1ш"]}/>
            <Price title="Багц 2" price={"66,000₮"} list={["Анхны холболтын хураамж 22,000₮", "Интернэтийн хурд 50Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 60 минут", "TV ROOM ТВ суваг 80+", "SPS спорт багц Дагалдана", "96 цагийн нөхөж үзэх дагалдана", "Нэмэлт үйлчилгээ 3ш"]}/>
            <Price title="Сумын Багц" price={"49,500₮"} list={["Анхны холболтын хураамж 22,000₮", "Интернэтийн хурд 10Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 30 минут", "TV ROOM ТВ суваг 80+", "SPS спорт багц Дагалдана", "96 цагийн нөхөж үзэх дагалдана", "Нэмэлт үйлчилгээ 1ш"]}/>
            <Price title="Сумын алба хэрэглэгчид Багц" price={"165,000₮"} list={["Анхны холболтын хураамж 22,000₮", "Интернэтийн хурд 12Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 400 минут", "TV ROOM ТВ суваг 80+", "SPS спорт багц Дагалдана", "96 цагийн нөхөж үзэх дагалдана", "Нэмэлт үйлчилгээ 1ш"]}/>
        
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
