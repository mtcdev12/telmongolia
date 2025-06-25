import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../../advantage";
import Intro from "../../intro";
import Comment from "../../comment";
import Price from "../../price";
import { BiCommentDetail } from "react-icons/bi";


const breadcrumb = ["Байгууллага", "БОДИТ ХУРДНЫ ИНТЕРНЭТ"];
const comments = ["Олон жилийн түүхтэй найрсаг хамт олон найдвартай үйлчилгээтэй.",
                   "Засвар үйлчилгээг түргэн шуурхай засаж өгсөнд танай хамт олонд баярлалаа.",
                   "Интернэт гацна гэдгийг мартсан."
                 ];
const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      {/* Introduction section */}
      <Intro
        title="БОДИТ ХУРДНЫ ИНТЕРНЭТ"
        bundle="Интернетийн үйлчилгээ"
        desc="Интернэтийн үйлчилгээг бодит хурд /dedicated/ болон хуваагдсан хурд /shared/-аар хэрэглэгчдэд хүргэдэг бөгөөд хуваагдсан хурд /shared/-ны интернэт нь дундын /public/ сүлжээ ашигладаг өрхийн хэрэгцээнд зориулагдсан байдаг бол бодит хурд /dedicated/-ны интернэт нь тухайн хэрэглэгчтэй холбосон /private/ шилэн кабелийн сүлжээг ашигладаг тул албан байгууллагын хэрэгцээнд тохиромжтой байдаг. Өөрөөр хэлбэл хуваагдсан хурдаар интернэтийн үйлчилгээ авахад идэвхтэй ашиглаж буй хэрэглэгчийн тооноос хамааран хурд нь хуваагдаж, багасдаг."
        logo="dedicated.png"
      />
      {/* Advantage section */}
      <div className="relative mt-[30px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
          Давуу талуудаас ...
        </h2>
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4">
          <Advantage
            desc="МУ-ын 21 аймаг, 251 сум сууринд манай компанийн сүлжээ хүрсэн"
            img="baiguullaga/icon9.png"
          />
          {/* <Advantage
            desc="24 цагийн турш монгол дахь интернэт сүлжээнд, 00:00 – 08:00 цаг хүртэл гадаад интернэт сүлжээнд хурдны хязгааргүй холбогдоно."
            img="baiguullaga/icon10.png"
          /> */}
          
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
      {/* user comments */}
      <div className="relative my-[60px]">
        <div className="text-2xl font-bold text-brand-1 my-4 flex items-center justify-center gap-2"><BiCommentDetail/> Хэрэглэгчдийн сэтгэгдэл </div>
        <Comment comments={comments} />
      </div>
    </div>
  );
};

export default Page;
