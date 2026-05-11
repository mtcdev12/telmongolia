import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../../advantage";
import Intro from "../../intro";
import Comment from "../../comment";
import Price from "../../price";
import { BiCommentDetail } from "react-icons/bi";
import {
  MonitorPlay,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  RotateCcw,
  Trophy,
  Smartphone,
  Film,
  Building2,
} from "lucide-react";

const breadcrumb = ["Байгууллага", "TVROOM"];

const comments = [
  "Долоо хоног болгон шинэ содон кино оруулж байгаад баярлалаа",
  "Нөхөж үзэх нь 96 цаг бүхэл бүтэн 4 өдөр нөхөж үзэх хугацаа дуусна гэж санаа зовохоо больсон",
  "Хэрэглэхэд авсаархан хаана ч аваад явж болохоор санагдсан",
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      <Breadcrumb data={breadcrumb} />

      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        {/* Introduction section */}
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Intro
            title="TVROOM"
            bundle="IPTV (OTT)"
            desc="TV room нь IPTV технологийн хөгжлийн дараагийн үе OTT технологи дээр суурилсан интернэтээр дамжуулан телевизийн суваг болон видео контентыг дуу, дүрсний өндөр чанартайгаар бүх төрлийн ухаалаг төхөөрөмжөөр үзэх боломжтой үйлчилгээ юм."
            logo="iptv.png"
          />
        </div>

        {/* Advantage section */}
        <div className="relative mt-12">
          <div className="mb-8 text-center">
            <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600">
              <ShieldCheck size={17} />
              Байгууллагын давуу тал
            </p>

            <h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
              Давуу талуудаас
            </h2>

            <p className="mx-auto mt-3 max-w-[720px] text-sm leading-6 text-slate-500 md:text-base">
              Байгууллагын орчинд ТВ суваг, кино контент, спортын сувгийг
              интернэтээр дамжуулан ухаалаг төхөөрөмжөөс үзэх боломж.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
              img="urh/psn.png"
            />

            <Advantage
              title="Контент сан"
              desc="Видео сангийн кино контент үнэгүй /Тусгай төлбөрт контентоос бусад/"
              img="urh/icon3.png"
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
                STANDARD болон PREMIUM багцаас байгууллагынхаа үзэх хэрэгцээнд
                тохируулан сонгоорой.
              </p>
            </div>

            <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              /НӨАТ орсон/
            </div>
          </div>

          {/* Feature summary */}
          <div className="relative z-10 mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Building2 size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">
                Байгууллагад тохиромжтой
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Оффис, үйлчилгээний заал болон байгууллагын орчинд ашиглахад
                тохиромжтой.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <MonitorPlay size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">80+ ТВ суваг</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                PREMIUM багцад 80-аас дээш ТВ суваг дагалдана.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Trophy size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">PSN спорт</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Спортын 5 суваг PREMIUM багцад дагалдана.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <RotateCcw size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">96 цаг нөхөж үзэх</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                PREMIUM багцад 96 цаг хүртэл нөхөж үзэх боломж дагалдана.
              </p>
            </div>
          </div>

          {/* Extra note */}
          <div className="relative z-10 mb-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Smartphone size={22} />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#061f57]">
                  Бүх төрлийн ухаалаг төхөөрөмжөөр үзэх боломжтой
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Гар утас, таблет, smart TV болон бусад төхөөрөмжөөр TVROOM
                  үйлчилгээг ашиглах боломжтой.
                </p>
              </div>
            </div>
          </div>

          {/* Price grid */}
          <div className="relative z-10 mx-auto grid max-w-[860px] grid-cols-1 gap-6 md:grid-cols-2">
            <Price
              title="STANDARD Багц"
              price={"7,700₮"}
              list={[
                "ТВ суваг 50-60 суваг",
                "PSN спортын 5 суваг боломжгүй",
                "96 цаг хүртэл нөхөж үзэх боломжгүй",
                "Нэг агшинд зэрэг үзэх төхөөрөмж 1",
              ]}
            />

            <Price
              title="PREMIUM Багц"
              price={"13,200₮"}
              list={[
                "ТВ суваг 80+",
                "PSN спортын 5 суваг Дагалдана",
                "96 цаг хүртэл нөхөж үзэх Дагалдана",
                "Нэг агшинд зэрэг үзэх төхөөрөмж 1",
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
              TVROOM үйлчилгээг ашиглаж буй хэрэглэгчдийн сэтгэгдлээс.
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