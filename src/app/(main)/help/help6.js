import React from "react";
import {
  FileText,
  Building2,
  User,
  Phone,
  Wifi,
  MonitorPlay,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const contractMaterials = [
  {
    title: "Алба хэрэглэгч",
    icon: Building2,
    items: [
      "70008000 дугаарт захиалга өгөх",
      "ААН-ийн гэрчилгээ",
      "Тамга",
      "Захирлын иргэний цахим үнэмлэх",
      "Түрээсийн байранд бол түрээсийн гэрээ болон тухайн байгууллагын зөвшөөрөл",
    ],
  },
  {
    title: "Хувь хэрэглэгч",
    icon: User,
    items: [
      "70008000 дугаарт захиалга өгөх",
      "Иргэний үнэмлэх",
      "Үнэмлэхний хаяг захиалга өгсөн хаягтай таарч байх",
    ],
  },
];

const cancelServices = [
  {
    title: "Утас",
    icon: Phone,
    personal: [
      "Гэрээний дэвтэр",
      "Иргэний үнэмлэх",
      "Биллээс гарсан төлбөр төлөх /Гэрээ цуцлах хүртэлх өдрийн билл уншигдана/",
    ],
    company: [
      "Гэрээний дэвтэр",
      "Албан бичиг",
      "Биллээс гарсан төлбөр төлөх /Гэрээ цуцлах хүртэлх өдрийн билл уншигдана/",
    ],
  },
  {
    title: "Интернэт",
    icon: Wifi,
    personal: ["Бичиг баримттайгаа салбарт хандах"],
    company: ["Албан хүсэлттэй салбарт хандах"],
    note: "Интернэтийн гэрээ цуцлахад хугацаа дуусаагүй бол өргөдөл бичиж өгөөд мөнгөө буцааж авах эсвэл суурин утасны төлбөр лүү шилжүүлэх боломжтой.",
  },
  {
    title: "КаТВ",
    icon: MonitorPlay,
    personal: ["Бичиг баримттайгаа салбарт хандах"],
    company: ["Албан хүсэлттэй салбарт хандах"],
  },
];

function MaterialCard({ title, items, Icon }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-[0_18px_45px_rgba(37,99,235,0.14)]">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
          <Icon size={23} />
        </div>

        <h3 className="text-lg font-black text-[#061f57]">{title}</h3>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
            <CheckCircle className="mt-1 shrink-0 text-blue-600" size={18} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CancelServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
          <Icon size={23} />
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-500">
            Гэрээ цуцлах
          </p>
          <h3 className="text-xl font-black text-[#061f57]">{service.title}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 flex items-center gap-2 font-black text-[#061f57]">
            <User size={18} className="text-blue-600" />
            Хувь хэрэглэгч
          </h4>

          <ul className="space-y-2">
            {service.personal.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 flex items-center gap-2 font-black text-[#061f57]">
            <Building2 size={18} className="text-blue-600" />
            Алба хэрэглэгч
          </h4>

          <ul className="space-y-2">
            {service.company.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {service.note && (
        <div className="border-t border-amber-100 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 shrink-0" size={20} />
            <p>{service.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Help6() {
  return (
    <div className="space-y-7">
      <div className="rounded-[24px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
        <p className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
          Гэрээний мэдээлэл
        </p>

        <h2 className="flex items-center gap-3 text-2xl font-black tracking-[-0.4px] md:text-3xl">
          <FileText size={28} />
          Гэрээ хийх болон цуцлах материал
        </h2>

        <p className="mt-3 max-w-[720px] text-sm leading-6 text-white/85 md:text-base">
          Алба болон хувь хэрэглэгчийн гэрээ байгуулах, гэрээ цуцлахад
          бүрдүүлэх материалын мэдээлэл.
        </p>
      </div>

      <section>
        <div className="mb-4">
          <h3 className="text-lg font-black text-[#061f57]">
            Гэрээ хийхэд бүрдүүлэх материал
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Захиалга өгөх болон бүрдүүлэх бичиг баримтын жагсаалт.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {contractMaterials.map((item) => (
            <MaterialCard
              key={item.title}
              title={item.title}
              items={item.items}
              Icon={item.icon}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-lg font-black text-[#061f57]">
            Гэрээ цуцлах
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Үйлчилгээний төрлөөр шаардлагатай материал.
          </p>
        </div>

        <div className="space-y-4">
          {cancelServices.map((service) => (
            <CancelServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Help6;