import Breadcrumb from "@/components/ui/breadcrumb";
const breadcrumb = ["Компанийн засаглал", "Гүйцэтгэх удирдлагын баг"];
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      <div className="flex gap-4 flex-wrap">
        <Card
          name="Баатаржав Чинбат"
          desc="Гүйцэтгэх захирал"
          tel="70102245"
          email="chinbat@mtcone.net"
          pic="3.jpg"
        />
        <Card
          name="Гомбосүрэн Болдсайхан"
          desc="Дотоод аудитын газрын захирал"
          tel="70102902"
          email="boldsaikhan@mtcone.net"
          pic="5.jpg"
        />
                <Card
          name="Чимэдцэрэн Цогтгэрэл"
          desc="Удирдлага, хүний нөөцийн газрын захирал"
          tel="70102900"
          email="ch.tsogtgerel@mtcone.net"
          pic="4.jpg"
        />
                <Card
          name="Жанчивдорж Баасандорж"
          desc="Инновац, бизнес хөгжлийн газрын захирал"
          tel="70102424"
          email="baasandorj@mtcone.net"
          pic="7.jpg"
        />
                <Card
          name="Омбоосүрэн Цолмон"
          desc="Маркетингийн захирал"
          tel="311717"
          email="tsolmon@mtcone.net"
          pic="tsolmon.png"
        />
                <Card
          name="Гончигсүрэн Нямжав"
          desc="Техник, технологийн ашиглалтын газрын захирал"
          tel="70102220"
          email="nyamjav@mtcone.net"
          pic="2.jpg"
        />
                <Card
          name="Бямбацогт Идэрбат"
          desc="Mэдээллийн технологийн төвийн захирал"
          tel="70102503"
          email="iderbat@mtcone.net"
          pic="noimageuser.png"
        />
        <Card
          name="Нямбуугийн Мягмарсүрэн"
          desc="Санхүү бүртгэл, аж ахуйн газар захирал"
          tel="70102155"
          email="myagaa@mtcone.net"
          pic="Myangmar.png"
        />
                        {/* <Card
          name="Болд Биндэръяа"
          desc="Эм Ти Си СЕРВИС ХХК-ийн захирал"
          tel="70106879"
          email="binderiya@mtcone.net"
          pic="6.jpg"
        /> */}
      </div>
    </div>
  );
};

const Card = ({
  name,
  desc,
  tel,
  email,
  pic,
}: {
  name: string;
  desc: string;
  tel: string;
  email: string;
  pic: string;
}) => {
  return (
    <div className="w-[280px] flex flex-col justify-center items-center gap-2 border border-brand-1/20 rounded-2xl p-4 cursor-pointer relative overflow-hidden group">
      <div className="relative h-[140px] w-[140px] rounded-full shadow-lg bg-white border border-slate-100 overflow-hidden">
        <Image
          src={"/assets/company/images/" + pic}
          fill
          alt={name}
          className="object-contain scale-100"
        />
      </div>
      <div className="font-medium text-base">{name}</div>
      <div className="text-sm tracking-tight text-justify h-[40px]">{desc}</div>
      <div className="mt-4 text-left text-[14px] text-slate-50 font-medium bg-brand-1 p-2 absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        Утас: {tel}   
        <br />
        Email: {email}
      </div>
    </div>
  );
};

export default Page;
