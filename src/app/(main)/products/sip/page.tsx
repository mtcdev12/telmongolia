import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../advantage";
import Intro from "../intro";
import Comment from "../comment";
import Price from "../price";
import { BiCommentDetail } from "react-icons/bi";
import {
  PhoneCall,
  Globe2,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  Smartphone,
  Wifi,
  CircleDollarSign,
} from "lucide-react";

const breadcrumb = ["Өрхийн хэрэглэгч", "MIP70"];

const comments = [
  "Хамгийн хямд хэрэглэхэд хялбар танай хамт олонд баярлалаа",
  "Олон жилийн түүхтэй найрсаг хамт олон найдвартай үйлчилгээтэй",
  "Засвар үйлчилгээг түргэн шуурхай засаж өгсөнд танай хамт олонд баярлалаа",
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      <Breadcrumb data={breadcrumb} />

      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        {/* Introduction section */}
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Intro
            title="MIP70"
            bundle="IP PHONE"
            desc="MIP70 нь хил хязгааргүй, орон зайнаас үл хамааран дэлхийн хаанаас ч интернэт орчинд телефон яриа хийх, SIP технологид суурилсан урьдчилсан төлбөрт үйлчилгээ юм."
            logo="sip.png"
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
              Интернэт орчинд SIP технологиор дамжуулан хаанаас ч хямд,
              хялбар телефон яриа хийх боломж.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Advantage
              title="Хямд яриа"
              desc="МЦХ ХК-ийн сүлжээнд үнэгүй, бусад сүлжээнд хамгийн хямдаар ярих"
              img="urh/icon5.png"
            />

            <Advantage
              title="Өргөн сонголт"
              desc="Хэрэглэгчийн төхөөрөмжийн өргөн сонголттой"
              img="urh/icon7.png"
            />

            <Advantage
              title="Хялбар"
              desc="Дуудлага хүлээн авагч нь интернэтэд холбогдох шаардлагагүй"
              img="urh/icon6.png"
            />

            <Advantage
              title="Free"
              desc="Гаднаас дуудлага хүлээн авч, яриа хийхэд төлбөргүй"
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

              <p className="mt-3 max-w-[720px] text-sm leading-6 text-slate-500 md:text-base">
                MIP70 дугаар, дагалдах ярианы эрх болон нэмэлт үйлчилгээний
                төлбөрийн мэдээлэл.
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
                <PhoneCall size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">MIP70 дугаар</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                7008-**** дугаартай IP phone үйлчилгээ.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Globe2 size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">Хаанаас ч ашиглана</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Интернэт орчинд дэлхийн хаанаас ч телефон яриа хийх боломжтой.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <CircleDollarSign size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">Хямд тариф</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Дагалдах 5000 нэгжтэй, бусад сүлжээнд хямд тарифтай.
              </p>
            </div>
          </div>

          {/* Device note */}
          <div className="relative z-10 mb-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Smartphone size={22} />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#061f57]">
                  Гар утас, tablet, SIP төхөөрөмжөөр ашиглах боломжтой
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Интернэт холболттой төхөөрөмж дээр SIP тохиргоо хийснээр
                  MIP70 үйлчилгээг ашиглана.
                </p>
              </div>
            </div>
          </div>

          {/* Price grid */}
          <div className="relative z-10 mx-auto grid max-w-[440px] grid-cols-1 gap-6">
            <Price
              title="Багц 1"
              price={"7,700₮"}
              list={[
                "MIP 70 дугаар 7008-****",
                "Анхны холболтын үнэ: 11’000₮",
                "Дагалдах ярианы эрх: 5000 нэгж, 30 хоног",
                "Бусад сүлжээнд 44₮",
                "Дугаар солих /1 удаа/: 3’300₮",
                "Эрх сэргээх /1 удаа/ 3’300₮",
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
              MIP70 үйлчилгээг ашиглаж буй хэрэглэгчдийн сэтгэгдлээс.
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