"use client";
import { useState, useEffect } from "react";

const ub = [
  "7070",
  "7000",
  "7004",
  "7010",
  "7011",
  "7012",
  "7013",
  "7014",
  "7015",
  "7016",
  "7017",
  "7018",
  "7028",
  "1130",
  "1131",
  "1132",
  "1133",
  "1134",
  "1135",
  "1136",
  "1145",
  "1146",
  "1148",
  "7008",
];
const countryside = {
  Архангай: "7033",
  БаянӨлгий: "7042",
  Баянхонгор: "7044",
  Булган: "7034",
  ГовьАлтай: "7048",
  Дорноговь: "7052",
  Дорнод: "7058",
  Дундговь: "7059",
  Завхан: "7046",
  Өвөрхангай: "7032",
  Өмнөговь: "7053",
  Сүхбаатар: "7051",
  Сэлэнгэ: "7036",
  Төв: "7027",
  Увс: "7045",
  Ховд: "7043",
  Хөвсгөл: "7038",
  Хэнтий: "7056",
  ДарханУул: "7037",
  Налайх: "7023",
  Орхон: "7035",
  Орхон2: "7039",
  Багануур: "7021",
  Говьсүмбэр: "7054",
  MIP70: "7008",
};


const provinceNames: Record<string, string> = {
  Архангай: "Arkhangai", БаянӨлгий: "Bayan-Ölgii", Баянхонгор: "Bayankhongor", Булган: "Bulgan", ГовьАлтай: "Govi-Altai", Дорноговь: "Dornogovi", Дорнод: "Dornod", Дундговь: "Dundgovi", Завхан: "Zavkhan", Өвөрхангай: "Övörkhangai", Өмнөговь: "Ömnögovi", Сүхбаатар: "Sükhbaatar", Сэлэнгэ: "Selenge", Төв: "Töv", Увс: "Uvs", Ховд: "Khovd", Хөвсгөл: "Khövsgöl", Хэнтий: "Khentii", ДарханУул: "Darkhan-Uul", Налайх: "Nalaikh", Орхон: "Orkhon", Орхон2: "Orkhon 2", Багануур: "Baganuur", Говьсүмбэр: "Govisümber", MIP70: "MIP70",
};

const Prefix = (props: any) => {
  const isEnglish = props.locale === "en";
  const [division, setDivision] = useState("Улаанбаатар");
  const [prefix, setPrefix] = useState("7070");

  function handleDivision(e: any) {
    setDivision(e.target.value);
  }
  function handlePrefix(d: string) {
    setPrefix(d);
  }
  useEffect(() => {
    props.onPrefixChange(prefix);
  }, [prefix]);

  return (
    <div className="w-[340px]">
      <select value={division} onChange={handleDivision} className="border w-full border-brand-1/60 p-2 rounded-md">
        <option value="Улаанбаатар">{isEnglish ? "Ulaanbaatar" : "Улаанбаатар"}</option>
        <option value="Орон нутаг">{isEnglish ? "Regional areas" : "Орон нутаг"}</option>
      </select>
      <p className="text-center my-2 tracking-tight text-brand-1 font-semibold">{isEnglish ? "Available prefixes" : "Боломжит угтварууд"}</p>
      <div className="grid grid-cols-3 gap-2 text-center tracking-tight text-slate-800">
        {division === "Улаанбаатар"
          ? ub.map((option) => (
              <div key={option} onClick={() => handlePrefix(option)} className={`border border-slate-300 rounded-md py-1 cursor-pointer hover:bg-brand-2 hover:text-white transition-colors ${prefix == option && 'bg-brand-2 text-white'}`}>
                {option !== "7008" ? option : "MIP70"}
              </div>
            ))
          : Object.entries(countryside).map((row, index) => (
              <div key={index} onClick={() => handlePrefix(row[1])} className={`border border-slate-300 rounded-md py-1 cursor-pointer hover:bg-brand-2 hover:text-white transition-colors ${prefix==row[1] && 'bg-brand-2 text-white' }`}>
                {isEnglish ? provinceNames[row[0]] ?? row[0] : row[0]}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Prefix;
