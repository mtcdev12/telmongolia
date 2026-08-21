import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../advantage";
import Intro from "../intro";
import Comment from "../comment";
import Price from "../price";
import { BiCommentDetail } from "react-icons/bi";
import {
  MonitorPlay,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  Tv,
  Trophy,
  Film,
} from "lucide-react";

const breadcrumb = ["Өрхийн хэрэглэгч", "National КаТВ"];

const comments = [
  "Танин мэдэхүйн Discovery, World wide, Animal plamet танин мэдэхүйгээ дээшлүүлэхэд тустай олон сувагтай",
  "Хүүхдийн Disney болон олон хүүхдийн сувагтай манай хүүхдүүд их дуртай",
  "Хамгийн хямд хэрэглэхэд хялбар танай хамт олонд баярлалаа.",
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      <Breadcrumb data={breadcrumb} />

      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        {/* Introduction section */}
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Intro
            title="National КаТВ"
            bundle="КАБЕЛИЙН ТВ ҮЙЛЧИЛГЭЭ"
            desc="National кабелийн телевизийн үйлчилгээг Улаанбаатар хот, аймагт шилэн кабель, коаксиаль кабель, агаарын сувгаар хослуулан дуу, дүрсний өндөр чанартайгаар хэрэглэгчдэд хүргэж байна. Монгол улсын хэмжээнд 16 студиэр дамжуулан 80 гаруй телевизийн сувгийг хэрэглэгчдэд хүргэн ажиллаж байна"
            logo="catv.png"
          />
        </div>

        {/* Advantage section */}
        <div className="relative mt-12">
          <div className="mb-8 text-center">
            <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600">
              <ShieldCheck size={17} />
              Үйлчилгээний давуу тал
            </p>

            <h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
              Давуу талуудаас
            </h2>

            <p className="mx-auto mt-3 max-w-[700px] text-sm leading-6 text-slate-500 md:text-base">
              Дуу, дүрсний өндөр чанартай, найдвартай сүлжээтэй, спорт болон
              кино сувгийн өргөн сонголттой кабелийн телевизийн үйлчилгээ.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
              img="urh/psn.png"
            />
          </div>
        </div>

        {/* Price plans */}
        <div className="relative my-16 overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-cyan-100/70 blur-3xl" />

          <div className="relative z-10 mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600">
                <BadgeCheck size={17} />
                Тарифын мэдээлэл
              </p>

              <h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
                Багцын тариф
              </h2>

              <p className="mt-3 max-w-[720px] text-sm leading-6 text-slate-500 md:text-base">
                STANDARD болон PREMIUM багцаас өөрийн хэрэглээнд тохируулан
                сонгоорой.
              </p>
            </div>

            <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              /Багцын үнийн тариф/
            </div>
          </div>

          {/* Feature summary */}
          <div className="relative z-10 mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Tv size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">80+ суваг</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Монгол, спорт, хүүхэд, танин мэдэхүй, кино болон мэдээллийн
                сувгууд.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Trophy size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">Спорт багц</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                PSN спорт багц болон спортын сувгуудын сонголттой.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Film size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">Кино, контент</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                MovieBox болон кино, энтертайнмент сувгийн өргөн сонголттой.
              </p>
            </div>
          </div>

          {/* Price grid */}
          <div className="relative z-10 mx-auto grid max-w-[860px] grid-cols-1 gap-6 md:grid-cols-2">
            <Price
              title="STANDARD Багц"
              price={"12,000₮"}
              list={[
                "Анхны холболтын хураамж 5,500₮",
                "Монгол суваг 59 суваг",
                "Спорт суваг 10 суваг",
                "Хүүхдийн суваг 5 суваг",
                "Танин мэдэхүйн суваг 0",
                "Кино, энтертайнмент суваг 0",
                "Мэдээ, мэдээллийн суваг 0",
              ]}
            />

            <Price
              title="PREMIUM Багц"
              price={"14,000₮"}
              list={[
                "Анхны холболтын хураамж 5,500₮",
                "Монгол суваг 59 суваг",
                "Спорт суваг 10 суваг",
                "Хүүхдийн суваг 5 суваг",
                "Танин мэдэхүйн суваг 4",
                "Кино, энтертайнмент суваг 8",
                "Мэдээ, мэдээллийн суваг 7",
              ]}
            />
          </div>
        </div>

        {/* User comments */}
        <div className="relative my-16">
          <div className="mb-8 text-center">
            <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600">
              <Sparkles size={17} />
              Хэрэглэгчдийн үнэлгээ
            </p>

            <h2 className="flex items-center justify-center gap-3 text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
              <BiCommentDetail />
              Хэрэглэгчдийн сэтгэгдэл
            </h2>

            <p className="mx-auto mt-3 max-w-[620px] text-sm leading-6 text-slate-500 md:text-base">
              National КаТВ үйлчилгээг ашиглаж буй хэрэглэгчдийн сэтгэгдлээс.
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
            <Comment comments={comments} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;