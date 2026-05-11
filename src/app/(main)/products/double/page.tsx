import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../advantage";
import Intro from "../intro";
import Comment from "../comment";
import Price from "../price";
import { BiCommentDetail } from "react-icons/bi";
import { Wifi, Phone, ShieldCheck, Sparkles } from "lucide-react";

const breadcrumb = ["Өрхийн хэрэглэгч", "Хосолсон багц"];

const comments = [
  "Олон жилийн түүхтэй найрсаг хамт олон найдвартай үйлчилгээтэй",
  "Засвар үйлчилгээг түргэн шуурхай засаж өгсөнд танай хамт олонд баярлалаа.",
  "Өмнө өөр нэт хэрэглэдэг байсан гацаад тоглож болдоггүй байсан одоо болохоор гацах гэдэг асуудлыг мартсан танайхыг сонгосонд сэтгэл их ханамж 100%",
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      <Breadcrumb data={breadcrumb} />

      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        {/* Introduction section */}
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Intro
            title="Хосолсон багц"
            bundle="СУУРИН УТАС + ИНТЕРНЭТ"
            desc="Бидний амьдралын өдөр тутмын салшгүй хэрэглээ болсон интернэтээ эрүүл мэндэд сөрөг нөлөөгүй, харилцаа холбооны найдвартай хэрэгсэл болсон суурин утастай хослуулан, гэр бүлийн хэрэгцээндээ тохирох багцуудаас сонгон авч үйлчлүүлээрэй."
            logo="double.png"
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

            <p className="mx-auto mt-3 max-w-[650px] text-sm leading-6 text-slate-500 md:text-base">
              Суурин утас болон интернэтийг нэг багцаар найдвартай, хялбар
              ашиглах боломж.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Advantage
              title="Найдвартай"
              desc="Шилэн кабелийн сүлжээний найдвартай дэд бүтэцтэй"
              img="urh/icon12.png"
            />

            <Advantage
              title="Цар хүрээ өргөн"
              desc="Монгол орон даяар хамгийн өргөн сүлжээтэй"
              img="urh/icon13.png"
            />

            <Advantage
              title="Тасралтгүй"
              desc="24 цагийн тасралтгүй, найдвартай ажиллагаа, хяналтын системтэй"
              img="urh/icon14.png"
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
                <Wifi size={17} />
                Тарифын мэдээлэл
              </p>

              <h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
                Багцын тариф
              </h2>

              <p className="mt-3 max-w-[650px] text-sm leading-6 text-slate-500 md:text-base">
                GPON болон ADSL технологийн хосолсон багцаас өөрийн хэрэглээнд
                тохируулан сонгоорой.
              </p>
            </div>

            <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              /НӨАТ орсон/
            </div>
          </div>

          {/* GPON */}
          <div className="relative z-10">
            <div className="mb-6 text-center">
              <p className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full bg-[#061f57] px-5 py-2 text-sm font-bold text-white shadow-[0_10px_25px_rgba(6,31,87,0.18)]">
                {/* <Cable size={17} /> */}
                Шилэн кабел GPON
              </p>

              <p className="text-sm font-medium text-slate-500">
                Өндөр хурдны шилэн кабелийн хосолсон багц
              </p>
            </div>

            <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-6 md:grid-cols-2">
              <Price
                title="S Багц"
                price={"30,000₮"}
                list={[
                  "Анхны холболтын хураамж 16,500₮",
                  "Интернэтийн хурд 10Мbps",
                  "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                  "Бусад сүлжээнд 100 минут",
                  "Нэмэлт үйлчилгээ 1ш",
                ]}
              />

              <Price
                title="M Багц"
                price={"40,000₮"}
                list={[
                  "Анхны холболтын хураамж 16,500₮",
                  "Интернэтийн хурд 30Мbps",
                  "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                  "Бусад сүлжээнд 200 минут",
                  "Нэмэлт үйлчилгээ 3ш",
                ]}
              />
            </div>
          </div>

          {/* ADSL */}
          <div className="relative z-10 mt-12">
            <div className="mb-6 text-center">
              <p className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-700">
                {/* <Phone size={17} /> */}
                Физик кабел ADSL
              </p>

              <p className="text-sm font-medium text-slate-500">
                Суурин шугамд суурилсан интернэт + утасны багц
              </p>
            </div>

            <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Price
                title="S Багц"
                price="19,800₮ - 24,200₮"
                list={[
                  "Анхны холболтын хураамж Улаанбаатарт 22,000₮, Орон нутагт 16,500₮",
                  "Интернэтийн хурд 2Мbps",
                  "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                  "Бусад сүлжээнд 100 минут",
                  "Нэмэлт үйлчилгээ 1ш",
                ]}
              />

              <Price
                title="M Багц"
                price={"29,700₮ - 38,500₮"}
                list={[
                  "Анхны холболтын хураамж Улаанбаатарт 22,000₮, Орон нутагт 16,500₮",
                  "Интернэтийн хурд 3Мbps",
                  "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                  "Бусад сүлжээнд 200 минут",
                  "Нэмэлт үйлчилгээ 3ш",
                ]}
              />

              <Price
                title="L Багц"
                price={"39,600₮ - 49,500₮"}
                list={[
                  "Анхны холболтын хураамж Улаанбаатарт 22,000₮, Орон нутагт 16,500₮",
                  "Интернэтийн хурд 5Мbps",
                  "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                  "Бусад сүлжээнд 200 минут",
                  "Нэмэлт үйлчилгээ 5ш",
                ]}
              />
            </div>
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
              Манай хосолсон багцыг ашиглаж буй хэрэглэгчдийн сэтгэгдлээс.
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