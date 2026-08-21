import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../../advantage";
import Intro from "../../intro";
import Comment from "../../comment";
import Price from "../../price";
import { BiCommentDetail } from "react-icons/bi";
import {
  Headphones,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  BarChart3,
  Mic,
  Clock,
  Network,
} from "lucide-react";

const breadcrumb = ["Байгууллага", "Call center"];

const comments = [
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
            title="Call center"
            bundle="ДУУДЛАГЫН ТӨВ"
            desc="Call center нь тухайн байгууллагын харилцагчийн үйлчилгээний үүргийг гүйцэтгэх технологийн шийдэл бөгөөд бизнестээ Call center үйлчилгээг нэвтрүүлснээр харилцагчийн үйлчилгээтэй холбоотой зардлыг бууруулан, ажлын бүтээмж, борлуулалтыг нэмэгдүүлж, харилцагчийн сэтгэл ханамжийг сайжруулах чухал ач холбогдолтой юм"
            logo="callcenter.png"
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
              Харилцагчийн дуудлага хүлээн авах, автомат хариулагч, тайлан,
              бичлэг, операторын ачаалал хуваарилалт зэрэг боломжуудтай
              байгууллагын дуудлагын төвийн шийдэл.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Advantage
              title="Тохиромжтой"
              desc="Танай байгууллага нэмэлт төхөөрөмж худалдан авах шаардлагагүйгээр зөвхөн суурин утастай байхад энэ үйлчилгээг авах боломжтой"
              img="urh/icon15.png"
            />

            <Advantage
              title="Элгэсэг"
              desc="Суурин утасгүй тохиолдолд интернэт орчинд дугаар үүсгэж ашиглах боломжтой"
              img="baiguullaga/icon16.png"
            />

            <Advantage
              title="Хяналтын самбар"
              desc="Дуудлагын дэлгэрэнгүй тайланг Dashboard /вэб орчинд/ хяналтын самбараас харах боломжтой"
              img="baiguullaga/icon17.png"
            />

            <Advantage
              title="Автомат"
              desc="Автомат хариулагч, ярианы бичлэг архивлах, сонсох, хянах боломжтой"
              img="baiguullaga/icon18.png"
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
                Физик кабель болон шилэн кабелийн Call center багцуудаас
                байгууллагынхаа дуудлагын хэрэгцээнд тохируулан сонгоорой.
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
                <Headphones size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">Дуудлагын төв</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Толгой дугаар, оператор, дуудлага шилжүүлэх боломжтой.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Clock size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">
                Ажлын цагийн тохиргоо
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Байгууллагын ажлын цагт тохируулан дуудлага зохион байгуулна.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Mic size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">IVR хоолой</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Автомат хариулагч, IVR хоолой, дуудлага ангилах боломжтой.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <BarChart3 size={21} />
              </div>

              <h3 className="font-black text-[#061f57]">Тайлан статистик</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Дуудлагын түүх, тайлан, хяналтын самбараар харах боломжтой.
              </p>
            </div>
          </div>

          {/* Physical cable */}
          <div className="relative z-10">
            <div className="mb-6 text-center">
              <p className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full bg-[#061f57] px-5 py-2 text-sm font-bold text-white shadow-[0_10px_25px_rgba(6,31,87,0.18)]">
                {/* <Cable size={17} /> */}
                Физик кабель Call center
              </p>

              <p className="text-sm font-medium text-slate-500">
                Физик кабелийн Call center үйлчилгээний багцууд
              </p>
            </div>

            <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-6 md:grid-cols-2">
              <Price
                title="STANDARD Багц"
                price={"55,000₮"}
                list={[
                  "Толгой дугаар",
                  "Ажлын цагийн тохиргоо",
                  "Автомат хариулагч",
                  "Дуудлага шилжүүлэх",
                  "Техникийн туслалцаа",
                ]}
              />

              <Price
                title="OPERATOR Багц"
                price={"165,000₮"}
                list={[
                  "Толгой дугаар",
                  "Ажлын цагийн тохиргоо",
                  "Автомат хариулагч",
                  "Дуудлага шилжүүлэх",
                  "Техникийн туслалцаа",
                  "Операторын ачаалал хувиарлах",
                  "Дуудлагыг бүлэглэн ангилах",
                  "Дуудлагын түүх, тайлан",
                  "Оператор түр завсарлах",
                  "IVR хоолой",
                ]}
              />
            </div>
          </div>

          {/* Fiber */}
          <div className="relative z-10 mt-12">
            <div className="mb-6 text-center">
              <p className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-700">
                <Network size={17} />
                Шилэн кабель Call center
              </p>

              <p className="text-sm font-medium text-slate-500">
                Шилэн кабелийн Call center үйлчилгээний багцууд
              </p>
            </div>

            <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Price
                title="S Багц"
                price={"55,000₮"}
                list={[
                  "Толгой дугаар",
                  "Ажлын цагийн тохиргоо",
                  "Автомат хариулагч",
                  "Дуудлага шилжүүлэх",
                  "Дотуур дугаар - 2ш",
                  "Дуудлага хүлээлгэх - 2ш",
                ]}
              />

              <Price
                title="OPERATOR Багц"
                price={"165,000₮"}
                list={[
                  "Толгой дугаар",
                  "Ажлын цагийн тохиргоо",
                  "Автомат хариулагч",
                  "Дуудлага шилжүүлэх",
                  "Дотуур дугаар - 5ш",
                  "Дуудлага хүлээлгэх - 5ш",
                  "Дуудлагыг бүлэглэн ангилах",
                  "Дуудлагын түүх, тайлан",
                  "Оператор түр засварлах",
                  "IVR хоолой бичүүлэх",
                ]}
              />

              <Price
                title="BUSINESS Багц"
                price={"385,000₮"}
                list={[
                  "Толгой дугаар",
                  "Ажлын цагийн тохиргоо",
                  "Автомат хариулагч",
                  "Дуудлага шилжүүлэх",
                  "Нөхцөл зааж дуудлага шилжүүлэх",
                  "Хариу өгөөгүй тохиолдолд дуудлага шилжүүлэх",
                  "Ажлын цагийн тохиргоо",
                  "Яриа хийж байхад дуудлага шилжүүлэх",
                  "Хяналтын самбар, тайлан статистик",
                  "Дуудлагын түүх",
                  "Дуудлагын түүх хадгалах хугацаа",
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
              Call center үйлчилгээг ашиглаж буй хэрэглэгчдийн сэтгэгдлээс.
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