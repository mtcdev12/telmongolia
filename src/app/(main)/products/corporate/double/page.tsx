import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../../advantage";
import Intro from "../../intro";
import Comment from "../../comment";
import Price from "../../price";
import { BiCommentDetail } from "react-icons/bi";
import {
  Wifi,
  Phone,
  Building2,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  // Cable,
  CircleDollarSign,
} from "lucide-react";

const breadcrumb = ["Байгууллага", "Хосолсон багц"];

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
            desc="Интернэт болон суурин утас нь албан байгууллага ажил хэргээ хөтлөн явуулах өдөр тутмын салшгүй хэрэглээ болсон. Иймд эрүүл мэндэд сөрөг нөлөөгүй, сүлжээндээ үнэгүй ярих боломжтой суурин утас болон дата хязгааргүй интернэтийн үйлчилгээг хослуулан, өөрийн хэрэглээндээ тохируулан авах боломжтой олон сонголттой хосолсон багцуудыг хэрэглэгч Танд санал болгож байна."
            logo="double.png"
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
              Байгууллагын өдөр тутмын интернэт болон албан харилцааны
              хэрэгцээг нэг багцаар найдвартай, хэмнэлттэй шийдэх боломж.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Advantage
              title="Хямд зардал"
              desc="Суурин утас болон интернэтийн үйлчилгээг нэг байгууллагаас авч зардал хэмнэгдэнэ"
              img="urh/icon5.png"
            />

            <Advantage
              title="Дата хязгааргүй"
              desc="Шилэн кабелийн сүлжээний дэд бүтэцтэй, дата хэрэглээ хязгааргүй интернэт"
              img="urh/icon6.png"
            />

            <Advantage
              title="Тасралтгүй"
              desc="24 цагийн тасралтгүй, найдвартай ажиллагаа, хяналтын системтэй"
              img="urh/icon14.png"
            />

            <Advantage
              title="Хязгааргүй"
              desc="Сүлжээндээ хязгааргүй болон бусад сүлжээнд ярих минутын эрхтэй"
              img="urh/icon8.png"
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

              <p className="mt-3 max-w-[760px] text-sm leading-6 text-slate-500 md:text-base">
                GPON болон ADSL технологийн байгууллагад зориулсан хосолсон
                багцуудаас хэрэглээндээ тохируулан сонгоорой.
              </p>
            </div>

            <div className="inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              /НӨАТ орсон/
            </div>
          </div>

          {/* Feature summary */}
          <div className="relative z-10 mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Building2 size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">
                Байгууллагын хэрэглээ
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Албан байгууллагын интернэт болон суурин утасны хэрэгцээнд
                тохиромжтой.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Wifi size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">
                Дата хязгааргүй
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Дата хэрэглээ хязгааргүй, найдвартай интернэтийн үйлчилгээ.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Phone size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">
                Сүлжээндээ хязгааргүй
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Сүлжээндээ болон 26хххх дугаар руу хязгааргүй ярих боломжтой.
              </p>
            </div>
          </div>

          {/* GPON */}
          <div className="relative z-10">
            <div className="mb-6 text-center">
              <p className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full bg-[#061f57] px-5 py-2 text-sm font-bold text-white shadow-[0_10px_25px_rgba(6,31,87,0.18)]">
                {/* <Cable size={17} /> */}
                Шилэн кабель GPON
              </p>

              <p className="text-sm font-medium text-slate-500">
                Өндөр хурдны шилэн кабелийн байгууллагын хосолсон багц
              </p>
            </div>

            <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-6 md:grid-cols-2">
              <Price
                title="S Багц"
                price={"55,000₮"}
                list={[
                  "Анхны холболтын хураамж 16,500₮",
                  "Интернэтийн хурд 10Мbps",
                  "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                  "Бусад сүлжээнд 200 минут",
                  "Нэмэлт үйлчилгээ 5ш",
                ]}
              />

              <Price
                title="M Багц"
                price={"99,000₮"}
                list={[
                  "Анхны холболтын хураамж 16,500₮",
                  "Интернэтийн хурд 30Мbps",
                  "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                  "Бусад сүлжээнд 400 минут",
                  "Нэмэлт үйлчилгээ 7ш",
                ]}
              />
            </div>
          </div>

          {/* ADSL */}
          <div className="relative z-10 mt-12">
            <div className="mb-6 text-center">
              <p className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-700">
                <Phone size={17} />
                Физик кабель ADSL
              </p>

              <p className="text-sm font-medium text-slate-500">
                Суурин шугамд суурилсан интернэт + утасны багц
              </p>
            </div>

            <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Price
                title="S Багц"
                price="42,900₮"
                list={[
                  "Анхны холболтын хураамж 22,000₮",
                  "Интернэтийн хурд 3Мbps",
                  "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                  "Бусад сүлжээнд 200 минут",
                  "Нэмэлт үйлчилгээ 3ш",
                ]}
              />

              <Price
                title="M Багц"
                price={"64,900₮"}
                list={[
                  "Анхны холболтын хураамж 22,000₮",
                  "Интернэтийн хурд 4Мbps",
                  "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                  "Бусад сүлжээнд 350 минут",
                  "Нэмэлт үйлчилгээ 5ш",
                ]}
              />

              <Price
                title="L Багц"
                price={"86,900₮"}
                list={[
                  "Анхны холболтын хураамж 22,000₮",
                  "Интернэтийн хурд 5Мbps",
                  "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй",
                  "Бусад сүлжээнд 500 минут",
                  "Нэмэлт үйлчилгээ 7ш",
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
              Байгууллагын хосолсон багцыг ашиглаж буй хэрэглэгчдийн
              сэтгэгдлээс.
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