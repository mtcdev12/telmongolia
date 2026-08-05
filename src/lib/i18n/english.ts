import { VERIFIED_PRODUCT_PLANS, type ProductPlan } from "@/lib/chatbot/knowledge";

export type EnglishService = {
  slug: string;
  sourceName: string;
  title: string;
  eyebrow: string;
  description: string;
};

export const ENGLISH_SERVICES: EnglishService[] = [
  {
    slug: "fixed-line",
    sourceName: "Суурин утас",
    title: "Fixed-line telephone",
    eyebrow: "Reliable voice service",
    description:
      "Clear, dependable calling for homes and organizations throughout Mongolia.",
  },
  {
    slug: "double-play",
    sourceName: "Хосолсон багц",
    title: "Double-play bundles",
    eyebrow: "Internet + telephone",
    description:
      "One monthly plan combining broadband internet and fixed-line calling.",
  },
  {
    slug: "triple-play",
    sourceName: "Гуравласан багц",
    title: "Triple-play bundles",
    eyebrow: "Internet + telephone + TV",
    description:
      "A complete home package with broadband, voice and TV ROOM entertainment.",
  },
  {
    slug: "national-catv",
    sourceName: "National КаТВ",
    title: "National Cable TV",
    eyebrow: "Cable television",
    description:
      "A broad selection of Mongolian, sports, children’s, knowledge and entertainment channels.",
  },
  {
    slug: "tv-room",
    sourceName: "TV ROOM",
    title: "TV ROOM",
    eyebrow: "Internet television",
    description:
      "Flexible television packages with live channels, sports and catch-up viewing options.",
  },
  {
    slug: "mip70",
    sourceName: "MIP70",
    title: "MIP70",
    eyebrow: "Internet-based telephone",
    description:
      "A 7008-series telephone number with included units and simple monthly service.",
  },
  {
    slug: "call-center",
    sourceName: "Call Center",
    title: "Call Center",
    eyebrow: "For organizations",
    description:
      "Business calling tools including IVR, routing, queues, history and reporting.",
  },
];

const serviceNames: Record<string, string> = Object.fromEntries(
  ENGLISH_SERVICES.map((service) => [service.sourceName, service.title])
);

const exactConditions: Record<string, string> = {
  "толгой дугаар": "Main telephone number",
  "ажлын цагийн тохиргоо": "Business-hours configuration",
  "автомат хариулагч": "Automated attendant",
  "дуудлага шилжүүлэх": "Call forwarding",
  "техникийн туслалцаа": "Technical assistance",
  "STANDARD багцын боломжууд": "All STANDARD plan features",
  "операторын ачаалал хуваарилах": "Operator workload distribution",
  "дуудлага бүлэглэх, түүх, тайлан": "Call groups, history and reports",
  "IVR хоолой": "IVR voice menu",
  "IVR хоолой бичүүлэх": "Recorded IVR voice menu",
  "хяналтын самбар, тайлан статистик": "Dashboard, reports and statistics",
  "дуудлагын түүх": "Call history",
  "нөхцөл зааж болон хариу өгөөгүй үед дуудлага шилжүүлэх":
    "Conditional and no-answer call forwarding",
};

function translateCondition(condition: string) {
  if (exactConditions[condition]) return exactConditions[condition];

  const replacements: Array<[RegExp, string]> = [
    [/анхны холболт Улаанбаатарт ([\d,]+₮), орон нутагт ([\d,]+₮)/i, "Initial connection: $1 in Ulaanbaatar, $2 in regional areas"],
    [/анхны холболт ([\d,]+₮)/i, "Initial connection: $1"],
    [/интернэтийн хурд ([\d]+Mbps)/i, "Internet speed: $1"],
    [/сүлжээндээ болон 26хххх дугаар руу хязгааргүй/i, "Unlimited calls within the network and to 26xxxx numbers"],
    [/бусад сүлжээнд ([\d]+) минут/i, "$1 minutes to other networks"],
    [/нэмэлт үйлчилгээ ([\d]+)ш/i, "$1 additional service(s)"],
    [/TV ROOM 80\+ суваг/i, "TV ROOM with 80+ channels"],
    [/PSN спорт болон 96 цаг нөхөж үзэх боломж/i, "PSN sports and 96-hour catch-up viewing"],
    [/Монгол ([\d]+), спорт ([\d]+), хүүхдийн ([\d]+), танин мэдэхүйн ([\d]+), кино\/интертэймент ([\d]+), мэдээний ([\d]+) суваг/i, "$1 Mongolian, $2 sports, $3 children’s, $4 knowledge, $5 movie/entertainment and $6 news channels"],
    [/Монгол ([\d]+), спорт ([\d]+), хүүхдийн ([\d]+) суваг/i, "$1 Mongolian, $2 sports and $3 children’s channels"],
    [/Монгол ([\d]+), хүүхдийн ([\d]+), кино\/интертэймент ([\d]+) суваг/i, "$1 Mongolian, $2 children’s and $3 movie/entertainment channels"],
    [/([\d–+]+) ТВ суваг/i, "$1 TV channels"],
    [/PSN спортын 5 суваг болон 96 цаг нөхөж үзэх боломж дагалдахгүй/i, "PSN sports channels and 96-hour catch-up are not included"],
    [/PSN спортын 5 суваг болон 96 цаг нөхөж үзэх боломж дагалдана/i, "Includes 5 PSN sports channels and 96-hour catch-up viewing"],
    [/зэрэг үзэх төхөөрөмж ([\d]+)/i, "$1 simultaneous viewing device"],
    [/30 хоногийн 5000 нэгж дагалдана/i, "Includes 5,000 units valid for 30 days"],
    [/7008-\*\*\*\* дугаар/i, "7008-**** telephone number"],
    [/бусад сүлжээнд 44₮/i, "Calls to other networks: 44₮"],
    [/дугаар солих болон эрх сэргээх тус бүр 3,300₮/i, "Number change and service restoration: 3,300₮ each"],
    [/дотуур дугаар болон дуудлага хүлээлгэх тус бүр ([\d]+)ш/i, "$1 extensions and $1 call-waiting lines"],
  ];

  return replacements.reduce(
    (translated, [pattern, replacement]) =>
      translated.replace(pattern, replacement),
    condition
  );
}

function translatePlanName(name: string) {
  return name
    .replace("Багц", "Plan")
    .replace("багц", "plan")
    .replace("Сумын алба хэрэглэгчийн", "Regional office customer")
    .replace("Сумын", "Regional");
}

function translateTechnology(value?: string) {
  if (value === "Физик кабель") return "Copper cable";
  if (value === "Шилэн кабель") return "Fiber optic";
  return value ?? null;
}

export type EnglishPlan = ProductPlan & {
  englishAudience: "Residential" | "Business";
  englishService: string;
  englishName: string;
  englishTechnology: string | null;
  englishConditions: string[];
  englishNote: string | null;
};

export const ENGLISH_PLANS: EnglishPlan[] = VERIFIED_PRODUCT_PLANS.map(
  (plan) => ({
    ...plan,
    englishAudience:
      plan.audience === "Өрхийн хэрэглэгч" ? "Residential" : "Business",
    englishService: serviceNames[plan.service] ?? plan.service,
    englishName: translatePlanName(plan.name),
    englishTechnology: translateTechnology(plan.technology),
    englishConditions: plan.conditions.map(translateCondition),
    englishNote: plan.note
      ? "The published price is marked as VAT-inclusive."
      : null,
  })
);

export function getEnglishService(slug: string) {
  return ENGLISH_SERVICES.find((service) => service.slug === slug) ?? null;
}

export function getEnglishPlans(slug: string) {
  const service = getEnglishService(slug);
  if (!service) return [];
  return ENGLISH_PLANS.filter((plan) => plan.service === service.sourceName);
}

const locationNames: Record<string, string> = {
  "Хэрэглэгчийн үйлчилгээний төв": "Central Customer Service Center",
  "Хан-Уул үйлчилгээний төв": "Khan-Uul Customer Service Center",
  "Баянзүрх үйлчилгээний төв": "Bayanzurkh Customer Service Center",
  "Сонгинохайрхан үйлчилгээний төв": "Songinokhairkhan Customer Service Center",
  "11-р хороолол салбар": "11th Microdistrict Branch",
  "3, 4-р хороолол салбар": "3rd–4th Microdistrict Branch",
  "Өлзийт салбар": "Ulziit Branch",
};

const provinceNames: Record<string, string> = {
  Архангай: "Arkhangai",
  "Баян-Өлгий": "Bayan-Ulgii",
  Баянхонгор: "Bayankhongor",
  Булган: "Bulgan",
  "Говь-Алтай": "Govi-Altai",
  Говьсүмбэр: "Govisumber",
  "Дархан-Уул": "Darkhan-Uul",
  Дорноговь: "Dornogovi",
  Дорнод: "Dornod",
  Дундговь: "Dundgovi",
  Завхан: "Zavkhan",
  Орхон: "Orkhon",
  Өвөрхангай: "Uvurkhangai",
  Өмнөговь: "Umnugovi",
  Сүхбаатар: "Sukhbaatar",
  Сэлэнгэ: "Selenge",
  Төв: "Tuv",
  Увс: "Uvs",
  Ховд: "Khovd",
  Хөвсгөл: "Khuvsgul",
  Хэнтий: "Khentii",
};

export function getEnglishLocationName(name: string) {
  if (locationNames[name]) return locationNames[name];
  const province = Object.entries(provinceNames).find(([mongolian]) =>
    name.startsWith(mongolian)
  );
  return province ? `${province[1]} Regional Telecommunications Office` : name;
}

export function translateHours(hours: string) {
  return hours
    .replace(/Даваа–Баасан/g, "Mon–Fri")
    .replace(/Бямба–Ням/g, "Sat–Sun");
}
