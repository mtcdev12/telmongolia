import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../advantage";
import Intro from "../intro";
import Comment from "../comment";
import Price from "../price";
import { BiCommentDetail } from "react-icons/bi";
import { Phone, ShieldCheck, Sparkles } from "lucide-react";

const breadcrumb = ["Өрхийн хэрэглэгч", "Суурин утас"];

const comments = [
  "Сүлжээгүй үед ч асуудалгүй ажиллах сүүлийн хэрэглээ",
  "Байгууллагын дотоод холбоог бүрэн найдвартай хийж өгсөнд баярлалаа",
  "Засвар үйлчилгээг түргэн шуурхай засаж өгсөнд танай хамт олонд баярлалаа.",
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      <Breadcrumb data={breadcrumb} />

      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        {/* Introduction section */}
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Intro
            title="Суурин утас"
            bundle="Дан багцийн үйлчилгээ"
            desc="Та гэр бүлийнхээ харилцаа холбооны хэрэгцээгээ эрүүл мэндэд сөрөг
            нөлөөгүй, гэнэтийн ослын үед ч тасралтгүй найдвартай ажиллах суурин
            утсанд даатгаарай."
            logo="single.png"
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

            <p className="mx-auto mt-3 max-w-[620px] text-sm leading-6 text-slate-500 md:text-base">
              Суурин утас нь найдвартай, тасралтгүй, өдөр тутмын хэрэглээнд
              тохиромжтой үйлчилгээ юм.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Price plans */}
        <div className="relative my-16 overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-cyan-100/70 blur-3xl" />

          <div className="relative z-10 mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600">
                <Phone size={17} />
                Тарифын мэдээлэл
              </p>

              <h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
                Багцын тариф
              </h2>

              <p className="mt-3 max-w-[600px] text-sm leading-6 text-slate-500 md:text-base">
                Өөрийн хэрэглээнд тохирсон суурин утасны багцаа сонгоорой.
              </p>
            </div>

            <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              /НӨАТ орсон/
            </div>
          </div>

          <div className="relative z-10 mx-auto grid max-w-[860px] grid-cols-1 gap-6 md:grid-cols-2">
            <Price
              title="Багц 1"
              price={"9,900₮"}
              list={[
                "Анхны холболтын хураамж Улаанбаатарт 33,000₮, Орон нутагт 16,500₮",
                "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                "Бусад сүлжээнд 100 минут",
                "Нэмэлт үйлчилгээ 1ш",
              ]}
            />

            <Price
              title="Багц 2"
              price={"16,500₮"}
              list={[
                "Анхны холболтын хураамж Улаанбаатарт 33,000₮, Орон нутагт 16,500₮",
                "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                "Бусад сүлжээнд 200 минут",
                "Нэмэлт үйлчилгээ 3ш",
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
              Манай үйлчилгээг ашиглаж буй хэрэглэгчдийн сэтгэгдлээс.
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
