import { Building2, Mail, MapPin, Phone, User } from "lucide-react";

type SourcePerson =
  | "tsetsgee"
  | "ariungerel"
  | "dagvadorj"
  | "byambasuren"
  | "khaliunaa";

const sourcePeople: Record<
  SourcePerson,
  { employee: string; employeeEn: string; email: string; phone: string; room: string; roomEn: string }
> = {
  tsetsgee: {
    employee: "ТУЗ-ийн Нарийн бичгийн дарга Х.Цэцэгмаа",
    employeeEn: "Board Secretary Kh. Tsetsegmaa",
    email: "tsesegmaa@mtcone.net",
    phone: "70102210",
    room: "Компанийн төв байрны 408 тоот",
    roomEn: "Room 408, company headquarters",
  },
  ariungerel: {
    employee: "Удирдлага, хүний нөөцийн газрын ахлах менежер Б.Ариунгэрэл",
    employeeEn: "Senior Manager, Management and Human Resources Department B. Ariungerel",
    email: "ariuka_hr@mtcone.net",
    phone: "70102250",
    room: "Компанийн төв байрны 428 тоот",
    roomEn: "Room 428, company headquarters",
  },
  dagvadorj: {
    employee: "Хуулийн мэргэжилтэн Б.Дагвадорж",
    employeeEn: "Legal Specialist B. Dagvadorj",
    email: "dagvadorj@mtcone.net",
    phone: "70102305",
    room: "Компанийн төв байрны 410 тоот",
    roomEn: "Room 410, company headquarters",
  },
  byambasuren: {
    employee: "Бодлого төлөвлөлтийн албаны ерөнхий менежер Т.Бямбасүрэн",
    employeeEn: "General Manager, Policy and Planning Division T. Byambasuren",
    email: "planning@mtcone.net",
    phone: "70102211",
    room: "Компанийн төв байрны 402 тоот",
    roomEn: "Room 402, company headquarters",
  },
  khaliunaa: {
    employee: "Санхүү бүртгэл, аж ахуйн газрын ерөнхий менежер Т.Халиунаа",
    employeeEn: "General Manager, Finance, Accounting and Administration Department T. Khaliunaa",
    email: "khaliunaa@mtcone.net",
    phone: "70102242",
    room: "Компанийн төв байрны 406 тоот",
    roomEn: "Room 406, company headquarters",
  },
};

export default function SourceContact({
  person = "tsetsgee",
  locale = "mn",
}: {
  person?: SourcePerson;
  locale?: "mn" | "en";
}) {
  const source = sourcePeople[person];
  const sourceDetails = [
    {
      icon: Building2,
      label: "",
      content: locale === "en" ? "Telecom Mongolia JSC" : "Монголын цахилгаан холбоо ХК",
    },
    {
      icon: User,
      label: locale === "en" ? "Responsible officer" : "Хариуцсан ажилтан",
      content: locale === "en" ? source.employeeEn : source.employee,
    },
    {
      icon: Mail,
      label: locale === "en" ? "Email" : "И-мэйл",
      content: (
        <a
          className="break-all text-brand-1 underline decoration-brand-2/50 underline-offset-4 transition-colors hover:text-brand-2"
          href={`mailto:${source.email}`}
        >
          {source.email}
        </a>
      ),
    },
    {
      icon: Phone,
      label: locale === "en" ? "Phone" : "Утас",
      content: (
        <a
          className="text-brand-1 underline decoration-brand-2/50 underline-offset-4 transition-colors hover:text-brand-2"
          href={`tel:${source.phone}`}
        >
          {source.phone}
        </a>
      ),
    },
    {
      icon: MapPin,
      label: locale === "en" ? "Office" : "Өрөө",
      content: locale === "en" ? source.roomEn : source.room,
    },
  ];

  return (
    <aside
      aria-labelledby="source-contact-title"
      className="my-6 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3"
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <h2
          id="source-contact-title"
          className="shrink-0 font-semibold text-brand-1"
        >
          {locale === "en" ? "Source:" : "Эх сурвалж:"}
        </h2>
        <dl className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2">
          {sourceDetails.map(({ icon: Icon, label, content }) => (
            <div
              key={label || "Байгууллага"}
              className="flex min-w-0 items-center gap-1.5 text-slate-700"
            >
              <Icon
                aria-hidden="true"
                className="shrink-0 text-brand-1"
                size={15}
                strokeWidth={1.9}
              />
              {label && <dt className="sr-only">{label}</dt>}
              <dd className="min-w-0 leading-5">{content}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
