import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../../advantage";
import Intro from "../../intro";
import Comment from "../../comment";
import { BiCommentDetail } from "react-icons/bi";
import {
  Wifi,
  Building2,
  ShieldCheck,
  Sparkles,
  Server,
  Network,
  Lock,
  Globe2,
  BadgeCheck,
} from "lucide-react";

const breadcrumb = ["Байгууллага", "БОДИТ ХУРДНЫ ИНТЕРНЭТ"];

const comments = [
  "Олон жилийн түүхтэй найрсаг хамт олон найдвартай үйлчилгээтэй.",
  "Засвар үйлчилгээг түргэн шуурхай засаж өгсөнд танай хамт олонд баярлалаа.",
  "Интернэт гацна гэдгийг мартсан.",
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-white to-white">
      <Breadcrumb data={breadcrumb} />

      <section className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        {/* Introduction section */}
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Intro
            title="БОДИТ ХУРДНЫ ИНТЕРНЭТ"
            bundle="Интернетийн үйлчилгээ"
            desc="Интернэтийн үйлчилгээг бодит хурд /dedicated/ болон хуваагдсан хурд /shared/-аар хэрэглэгчдэд хүргэдэг бөгөөд хуваагдсан хурд /shared/-ны интернэт нь дундын /public/ сүлжээ ашигладаг өрхийн хэрэгцээнд зориулагдсан байдаг бол бодит хурд /dedicated/-ны интернэт нь тухайн хэрэглэгчтэй холбосон /private/ шилэн кабелийн сүлжээг ашигладаг тул албан байгууллагын хэрэгцээнд тохиромжтой байдаг. Өөрөөр хэлбэл хуваагдсан хурдаар интернэтийн үйлчилгээ авахад идэвхтэй ашиглаж буй хэрэглэгчийн тооноос хамааран хурд нь хуваагдаж, багасдаг."
            logo="dedicated.png"
          />
        </div>

        {/* Dedicated info cards */}
        <div className="relative mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-[26px] border border-blue-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Network size={23} />
            </div>

            <h3 className="text-lg font-black text-[#061f57]">
              Dedicated private сүлжээ
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Байгууллагад зориулсан private шилэн кабелийн сүлжээ ашигладаг.
            </p>
          </div>

          <div className="rounded-[26px] border border-blue-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Wifi size={23} />
            </div>

            <h3 className="text-lg font-black text-[#061f57]">
              Бодит хурд
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Хэрэглэгчийн тооноос хамаарч хурд хуваагдахгүй, тогтвортой
              ажиллагаатай.
            </p>
          </div>

          <div className="rounded-[26px] border border-blue-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <Building2 size={23} />
            </div>

            <h3 className="text-lg font-black text-[#061f57]">
              Албан байгууллагад тохиромжтой
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Өдөр тутмын бизнесийн хэрэглээ, сервер, системийн найдвартай
              холболтод тохиромжтой.
            </p>
          </div>
        </div>

        {/* Advantage section */}
        <div className="relative mt-14">
          <div className="mb-8 text-center">
            <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600">
              <ShieldCheck size={17} />
              Байгууллагын давуу тал
            </p>

            <h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
              Давуу талуудаас
            </h2>

            <p className="mx-auto mt-3 max-w-[760px] text-sm leading-6 text-slate-500 md:text-base">
              Dedicated интернэт нь байгууллагын найдвартай ажиллагаа,
              тогтвортой хурд, хамгаалалт болон өргөн дэд бүтцийн давуу талтай.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Advantage
              desc="МУ-ын 21 аймаг, 251 сум сууринд манай компанийн сүлжээ хүрсэн"
              img="baiguullaga/icon9.png"
            />

            <Advantage
              desc="Facebook cache, Google cache сервертэй"
              img="baiguullaga/icon11.png"
            />

            <Advantage
              desc="24 цагийн тасралтгүй, найдвартай ажиллагаатай"
              img="baiguullaga/icon7.png"
            />

            <Advantage
              desc="Шилэн кабелийн сүлжээний найдвартай дэд бүтэцтэй"
              img="baiguullaga/icon6.png"
            />

            <Advantage
              desc="Бусад төрөл бүрийн үйлчилгээ ашиглах боломжтой /Колл центр, суурин утас, tv room/"
              img="baiguullaga/icon12.png"
            />

            <Advantage
              desc="DDos халдлагаас хамгаалагдсан, мөн сүлжээний хамгаалалтын Firewall management server-тэй"
              img="baiguullaga/icon13.png"
            />

            <Advantage
              desc="Интернэтийн давхар гадаад гарцтай, дэд бүтцийн найдвартай эх үүсвэрт холбогдсон."
              img="baiguullaga/icon14.png"
            />
          </div>
        </div>

        {/* Feature summary */}
        <div className="relative my-16 overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-cyan-100/70 blur-3xl" />

          <div className="relative z-10 mb-8">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-600">
              <BadgeCheck size={17} />
              Dedicated internet
            </p>

            <h2 className="text-3xl font-black tracking-[-0.6px] text-[#061f57] md:text-4xl">
              Байгууллагын найдвартай интернэт
            </h2>

            <p className="mt-3 max-w-[760px] text-sm leading-6 text-slate-500 md:text-base">
              Байгууллагын тасралтгүй үйл ажиллагаанд зориулсан бодит хурд,
              хамгаалалттай, давхар гадаад гарцтай интернэтийн шийдэл.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Network size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">Өргөн сүлжээ</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Монгол орны олон аймаг, сум сууринд сүлжээ хүрсэн.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Server size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">Cache сервер</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Facebook cache, Google cache серверийн давуу талтай.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Lock size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">Хамгаалалт</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                DDoS халдлагаас хамгаалалт, Firewall management server-тэй.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Globe2 size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">Давхар гадаад гарц</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Интернэтийн давхар гадаад гарц, найдвартай дэд бүтэцтэй.
              </p>
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
              Бодит хурдны интернэт ашиглаж буй хэрэглэгчдийн сэтгэгдлээс.
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