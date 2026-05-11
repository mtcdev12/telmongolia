import React from "react";
import { Wifi, Building2, Home, Info } from "lucide-react";

const tariffs = [
  {
    no: 1,
    type: "Хувь хэрэглэгч",
    icon: Home,
    connect: "10,000₮",
    speeds: {
      "1mbps": "13,000₮",
      "2mbps": "20,000₮",
      "3mbps": "27,000₮",
      "4mbps": "33,000₮",
      "5mbps": "39,000₮",
      "6mbps": "44,000₮",
      "10mbps": "110,000₮",
      "15mbps": "165,000₮",
    },
  },
  {
    no: 2,
    type: "Алба хэрэглэгч",
    icon: Building2,
    connect: "10,000₮",
    speeds: {
      "1mbps": "-",
      "2mbps": "25,000₮",
      "3mbps": "45,000₮",
      "4mbps": "65,000₮",
      "5mbps": "85,000₮",
      "6mbps": "105,000₮",
      "10mbps": "155,000₮",
      "15mbps": "230,000₮",
    },
  },
];

const speedColumns = [
  "1mbps",
  "2mbps",
  "3mbps",
  "4mbps",
  "5mbps",
  "6mbps",
  "10mbps",
  "15mbps",
];

function Help5() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-[24px] bg-gradient-to-r from-[#062b78] via-[#0b5fe8] to-[#1a9cff] p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]">
        <p className="mb-2 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
          Интернэт үйлчилгээ
        </p>

        <h2 className="flex items-center gap-3 text-2xl font-black tracking-[-0.4px] md:text-3xl">
          <Wifi size={28} />
          Интернэтийн суурь хураамж болон тариф
        </h2>

        <p className="mt-3 max-w-[720px] text-sm leading-6 text-white/85 md:text-base">
          Улаанбаатар, Дархан-Уул, Орхон аймгийн төвийн shared интернэтийн
          үйлчилгээний сарын хураамж.
        </p>
      </div>

      {/* Info */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium leading-6 text-blue-800">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 shrink-0" size={20} />
          <p>
            Доорх тариф нь хурдны ангиллаар сарын хураамжийг харуулна.
            Технологийн холболтын төрөл: <strong>шилэн кабель</strong>.
          </p>
        </div>
      </div>

      {/* Cards mobile/tablet */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {tariffs.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.no}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.08)]"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e8cff] to-[#065fd4] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
                  <Icon size={23} />
                </div>

                <div>
                  <p className="text-xs font-black tracking-[0.18em] text-blue-500">
                    #{String(item.no).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-black text-[#061f57]">
                    {item.type}
                  </h3>
                </div>
              </div>

              <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  Анхны холболт
                </p>
                <p className="mt-1 text-2xl font-black text-[#061f57]">
                  {item.connect}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {speedColumns.map((speed) => (
                  <div
                    key={speed}
                    className="rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <p className="text-xs font-bold text-slate-500">
                      {speed}
                    </p>
                    <p className="mt-1 text-sm font-black text-blue-700">
                      {item.speeds[speed]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div className="mb-4">
          <h3 className="text-lg font-black text-[#061f57]">
            Тарифын хүснэгт
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Хүснэгтийг баруун, зүүн тийш гүйлгэж үзнэ үү.
          </p>
        </div>

        <div className="overflow-auto rounded-2xl border border-slate-200">
          <table className="min-w-[980px] w-full border-collapse bg-white text-sm">
            <thead>
              <tr className="bg-[#062b78] text-white">
                <th className="border border-slate-200 px-4 py-3 text-left font-black">
                  №
                </th>
                <th className="border border-slate-200 px-4 py-3 text-left font-black">
                  Хэрэглэгчийн төрөл
                </th>
                <th className="border border-slate-200 px-4 py-3 text-left font-black">
                  Анхны холболт
                </th>
                {speedColumns.map((speed) => (
                  <th
                    key={speed}
                    className="border border-slate-200 px-4 py-3 text-left font-black"
                  >
                    {speed}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tariffs.map((item) => (
                <tr
                  key={item.no}
                  className="transition hover:bg-blue-50/70 even:bg-slate-50/70"
                >
                  <td className="border border-slate-200 px-4 py-3 font-bold text-slate-700">
                    {item.no}
                  </td>
                  <td className="border border-slate-200 px-4 py-3 font-black text-[#061f57]">
                    {item.type}
                  </td>
                  <td className="border border-slate-200 px-4 py-3 font-bold text-blue-700">
                    {item.connect}
                  </td>
                  {speedColumns.map((speed) => (
                    <td
                      key={speed}
                      className="border border-slate-200 px-4 py-3 font-semibold text-slate-700"
                    >
                      {item.speeds[speed]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-800">
        <strong>Санамж:</strong> Дээрх үнэд НӨАТ ороогүй.
      </div>
    </div>
  );
}

export default Help5;