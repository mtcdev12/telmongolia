import Breadcrumb from "@/components/ui/breadcrumb";
const breadcrumb = ["Компанийн засаглал", "Гүйцэтгэх удирдлагын баг"];
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      <div className="flex gap-4 flex-wrap">
        <Card
          name="Т.Сайнжаргал"
          desc="Гүйцэтгэх захирал"
          tel="70102245"
          email="sainjargal@mtcone.net"
          pic="Т.Сайнжаргал.png"
        />
         <Card
          name="Ч.Цогтгэрэл"
          desc="Удирдлага, хүний нөөцийн газрын захирал"
          tel="70102900"
          email="ch.tsogtgerel@mtcone.net"
          pic="Ч.Цогтгэрэл.png"
        />
        <Card
          name="Л.Батбаяр"
          desc="Дотоод аудитын газрын захирал"
          tel="70102902"
          email="batbayar@mtcone.net"
          pic="Л.Батбаяр.png"
        />
        <Card
          name="Ч.Содхүү"
          desc="Инновац, бизнес хөгжлийн газрын захирал"
          tel="70102424"
          email="sodkhuu@mtcone.net"
          pic="Ч.Содхүү.png"
        />
        <Card
          name="О.Цолмон"
          desc="Маркетинг, борлуулалтын газрын захирал"
          tel="11311717"
          email="tsolmon@mtcone.net"
          pic="О.Цолмон.png"
        />
        <Card
          name="Г.Нямжав"
          desc="Техник, технологийн ашиглалтын газрын захирал"
          tel="70102220"
          email="nyamjav@mtcone.net"
          pic="2.jpg"
        />
        <Card
          name="Б.Идэрбат"
          desc="Mэдээллийн технологийн төвийн захирал"
          tel="70102509"
          email="iderbat@mtcone.net"
          pic="Б.Идэрбат.png"
        />
        <Card
          name="Н.Цэрэнбанзад"
          desc="Санхүү бүртгэл, аж ахуйн газрын захирал"
          tel="70102155"
          email="tserenbanzad@mtcone.net"
          pic="Н.Цэрэнбанзад.png"
        />
        <Card
          name="Б.Батсайхан"
          desc="Эм Ти Си Сервис ХХК Гүйцэтгэх захирал"
          tel="70106879"
          email="batsaikhan@mtcone.net"
          pic="Б.Батсайхан.png"
        />
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
