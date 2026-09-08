import Breadcrumb from "@/components/ui/breadcrumb";
const breadcrumb = ["Компанийн засаглал", "ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛ"];
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      <h5 className="text-brand-1 text-center text-xl font-medium tracking-tight my-2">
        Mонгол улсын төрийн өмчийн төлөөллийг хэрэгжүүлж буй гишүүд
      </h5>
      <div className="flex gap-4 flex-wrap">
        <Card
          name="Вандангийн Дарханбаатар"
          desc="Төрийн өмчийн бодлого, зохицуулалтын газрын Удирдлага, төлөөллийн албаны дарга"
          date="08/27/2026"
          datedesc=""
          pic="1.png"
        />
        <Card
          name="Аминдаваагийн МОЛОР"
          desc="Төрийн өмчийн бодлого, зохицуулалтын газар, Төрийн өмчийн удирдлага, зохицуулалтын хэлтэс, мэргэжилтэн"
          date="04/29/2026"
          datedesc="2024 оны 4 дүгээр сарын 30-ний өдрийн Хувьцаа эзэмшигчдийн
                ээлжит хурлаар дахин сонгогдсон."
          pic="Molor.png"
        />
        <Card
          name="Бат-эрдэмийн ТӨРБАТ"
          desc="Монгол Улсын Засгийн газрын Хэрэг эрхлэх газар, шинжээч"
          date="04/29/2026"
          datedesc="2024 оны 4 дүгээр сарын 30-ний өдрийн Хувьцаа эзэмшигчдийн
          ээлжит хурлаар дахин сонгогдсон."
          pic="turbat.jpg"
        />
        <Card
          name="Батжаргалын Төгөлдөр"
          desc="Эдийн засаг, хөгжлийн яамны Хөрөнгө оруулалтын бодлогын газрын дарга"
          date="08/27/2026"
          datedesc="2024 оны 4 дүгээр сарын 30-ний өдрийн Хувьцаа эзэмшигчдийн
          ээлжит хурлаар дахин сонгогдсон."
          pic="12.png"
        />
         <Card
          name="Гомбожавын Дэлгэрмаа"
          desc="Төрийн өмчийн бодлого, зохицуулалтын газрын Төрийн өмчийн удирдлага, зохицуулалтын хэлтсийн мэргэжилтэн"
          date="08/27/2026"
          datedesc="2024 оны 4 дүгээр сарын 30-ний өдрийн Хувьцаа эзэмшигчдийн
          ээлжит хурлаар дахин сонгогдсон."
          pic="13.png"
        />
            <Card
          name="Содовжамцын Цагаанхүү"
          desc="Цахим хөгжил, инновац, харилцаа холбооны яамны Салбарын хяналт, шинжилгээ, үнэлгээ, дотоод аудитын газрын дарга"
          date="08/27/2026"
          datedesc="2024 оны 4 дүгээр сарын 30-ний өдрийн Хувьцаа эзэмшигчдийн
          ээлжит хурлаар дахин сонгогдсон."
          pic="14.png"
        />
      </div>
      <h5 className="text-brand-1 text-center text-xl font-medium tracking-tight my-2">
        Хараат бус гишүүд
      </h5>
      <div className="flex gap-4 flex-wrap">
        <Card
            name="Насангийн ТУУЛ"
            desc=""
            date="4/29/2026"
            datedesc="           2023 оны 4 дүгээр сарын 28-ны өдрийн Хувьцаа эзэмшигчдийн
            ээлжит хурлаар дахин сонгогдсон."
            pic="tuul.jpg"
            />
            <Card
            name="Содномдаваагийн 
            ЦОЛМОН"
            desc="Мандах их сургуулийн Ахисан түвшний сургуулийн багш"
            date="4/29/2026"
            datedesc="     2023 оны 4 дүгээр сарын 28-ны өдрийн Хувьцаа эзэмшигчдийн
            ээлжит хурлаар сонгогдсон."
            pic="tsolmon.jpg"
            />
            <Card
            name="Найдангийн ДАНЗАНДАГВА"
            desc= "“Голомт капитал” ҮЦК-ийн Гүйцэтгэх захирлын орлогч" 
            date="4/29/2026"
            datedesc=""
            pic="Danzandagva.jpg"
            />
        </div>
    </div>
  );
};

const Card = ({
  name,
  desc,
  date,
  datedesc,
  pic,
}: {
  name: string;
  desc: string;
  date: string;
  datedesc: string;
  pic: string;
}) => {
  return (
    <div className="w-[280px] flex flex-col justify-center items-center gap-2 border border-brand-1/20 rounded-2xl p-4 cursor-pointer">
      <div className="relative h-[140px] w-[140px] rounded-full shadow-lg bg-white border border-slate-100 overflow-hidden">
        <Image
          src={"/assets/company/images/" + pic}
          fill
          alt={name}
          className="object-contain scale-100"
        />
      </div>
      <div className="font-medium text-base text-center w-[140px]">{name}</div>
      <div className="text-sm tracking-tight text-justify h-[100px]">{desc}</div>
      <div className="mt-4 text-center text-[14px] text-brand-1 font-medium">
        Сонгогдсон <br />
        {date}
      </div>
    </div>
  );
};

export default Page;
