import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../advantage";
import Intro from "../intro";
import Comment from "../comment";
import Price from "../price";
import { BiCommentDetail } from "react-icons/bi";
import { Phone, Wifi, Tv, ShieldCheck, Sparkles, BadgeCheck } from "lucide-react";

const breadcrumb = ["Өрхийн хэрэглэгч", "Гуравласан багц"];

const comments = [
  "Үнэ их боломжийн санагдсан надад лав таалагдсан",
  "Спортын үнэнч фен бидэнд зориулсан олон спортын сувагтай шүү баярлалаа танай хамт олонд.",
  "Wifi холболттой болохоор өрөөн дотроо хөдөлгөхөд их амар санагдсан",
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      <Breadcrumb data={breadcrumb} />

      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        {/* Introduction section */}
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Intro
            title="Гуравласан багц"
            bundle="СУУРИН УТАС + ИНТЕРНЭТ + IPTV (OTT)"
            desc="Суурин утас, дата хязгааргүй, өндөр хурдны интернэт, дуу, дүрсний өндөр чанар телевизийн олон суваг (IPTV-ийн хөгжлийн дараагийн ОТТ технологи ашигладаг) зэргийг нэгтгэсэн гуравласан үйлчилгээг санал болгож байна."
            logo="triple.png"
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

            <p className="mx-auto mt-3 max-w-[680px] text-sm leading-6 text-slate-500 md:text-base">
              Суурин утас, интернэт, IPTV үйлчилгээг нэг дор багтаасан
              гэр бүлийн иж бүрэн багц.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                Суурин утас, өндөр хурдны интернэт, TV ROOM телевизийн сувгууд,
                PSN спорт багц болон 96 цагийн нөхөж үзэх боломжтой багцууд.
              </p>
            </div>

            <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              /НӨАТ орсон/
            </div>
          </div>

          {/* Feature mini cards */}
          <div className="relative z-10 mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Phone size={21} />
              </div>
              <h3 className="font-black text-[#061f57]">Суурин утас</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Сүлжээндээ болон 26хххх дугаар руу хязгааргүй ярина.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Wifi size={21} />
              </div>
              <h3 className="font-black text-[#061f57]">Интернэт</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Өндөр хурдны дата хязгааргүй интернэт үйлчилгээ.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Tv size={21} />
              </div>
              <h3 className="font-black text-[#061f57]">TV ROOM</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                80+ ТВ суваг, PSN спорт багц, 96 цаг нөхөж үзэх боломж.
              </p>
            </div>
          </div>

          {/* Price grid */}
          <div className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Price
              title="Багц 1"
              price={"49,500₮"}
              list={[
                "Анхны холболтын хураамж 22,000₮",
                "Интернэтийн хурд 20Мbps",
                "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                "Бусад сүлжээнд 30 минут",
                "TV ROOM ТВ суваг 80+",
                "PSN спорт багц Дагалдана",
                "96 цагийн нөхөж үзэх дагалдана",
                "Нэмэлт үйлчилгээ 1ш",
              ]}
            />

            <Price
              title="Багц 2"
              price={"66,000₮"}
              list={[
                "Анхны холболтын хураамж 22,000₮",
                "Интернэтийн хурд 50Мbps",
                "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                "Бусад сүлжээнд 60 минут",
                "TV ROOM ТВ суваг 80+",
                "PSN спорт багц Дагалдана",
                "96 цагийн нөхөж үзэх дагалдана",
                "Нэмэлт үйлчилгээ 3ш",
              ]}
            />

            <Price
              title="Сумын Багц"
              price={"49,500₮"}
              list={[
                "Анхны холболтын хураамж 22,000₮",
                "Интернэтийн хурд 10Мbps",
                "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                "Бусад сүлжээнд 30 минут",
                "TV ROOM ТВ суваг 80+",
                "PSN спорт багц Дагалдана",
                "96 цагийн нөхөж үзэх дагалдана",
                "Нэмэлт үйлчилгээ 1ш",
              ]}
            />

            <Price
              title="Сумын алба хэрэглэгчид Багц"
              price={"165,000₮"}
              list={[
                "Анхны холболтын хураамж 22,000₮",
                "Интернэтийн хурд 12Мbps",
                "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                "Бусад сүлжээнд 400 минут",
                "TV ROOM ТВ суваг 80+",
                "PSN спорт багц Дагалдана",
                "96 цагийн нөхөж үзэх дагалдана",
                "Нэмэлт үйлчилгээ 1ш",
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
              Манай гуравласан багцыг ашиглаж буй хэрэглэгчдийн сэтгэгдлээс.
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