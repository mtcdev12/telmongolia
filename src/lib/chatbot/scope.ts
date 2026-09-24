export type ScopeMessage = {
  role: "user" | "assistant";
  content: string;
};

const BRAND_PATTERN =
  /(монголын\s+цахилгаан\s+холбоо|цахилгаан\s+холбоо|телеком(?:\s+монгол(?:иа)?)?|telecom(?:\s+mongolia)?|telecommongolia|mtc\s*one|mtcone)/iu;

const SERVICE_PATTERN =
  /(суурин\s+утас|г(?:урав|урвал)ласан|3\s*л(?:а)?сан|интерн[эе]т|internet|wi[-\s]?fi|вайфай|gpon|adsl|iptv|tv\s*room|mip\s*70|national\s*ка\s*тв|кабел(?:ь|ийн)?\s*(?:тв|телевиз)|call\s*center|дуудлагын\s+төв|шилэн\s+кабель|fiber|fibre|router|рутер|модем|set[-\s]?top|декодер|(?:телевиз(?:ийн)?|тв)\s+(?:суваг|дохио)|сувгийн\s+мэдээлэл|зураг\s+гарахгүй)/iu;

const ROMANIZED_TELECOM_PATTERN =
  /\b(?:uilchilg\w*|uiclhilg\w*|uichilg\w*|bagts\w*|guravlasan|gurvalsan|3l(?:a)?san|hosolson|suurin\s+utas|katv|tolbor\w*|tulbur\w*|dugaar\w*|zahial\w*|salbar\w*|gemtel\w*|tasaldal\w*|zasvar\w*)\b/iu;

const SUPPORT_PATTERN =
  /(үйлчилгээ|багц|тариф|нэхэмжлэл|төлбөр|дугаар\s*(?:захиал|сонго|авах)|салбар|байршил|ажиллах\s+цаг|цагийн\s+хуваарь|хамрах\s+хүрээ|гэмтэл|саатал|тасар|холболт|сүлжээ|засвар|техникийн\s+тусламж|оператор|ажилтан|хэрэглэгчийн\s+үйлчилгээ|service|plan|package|billing|invoice|outage|coverage|branch|opening\s+hours|appointment|repair|support|phone\s+number|telephone\s+number)/iu;

const COMPANY_PATTERN =
  /(хувьцаа\s*эзэмшигч|төлөөлөн\s+удирдах\s+зөвлөл|\bтүз\b|захирал|компанийн\s+(?:түүх|бүтэц|удирдлага)|санхүүгийн\s+тайлан|жилийн\s+тайлан|улирлын\s+тайлан|баланс|аудит|ил\s+тод\s+байдал|тендер|сонгон\s+шалгаруулалт|ажлын\s+байр|shareholder|board\s+of\s+directors|annual\s+report|audit|company\s+(?:history|structure|management)|career)/iu;

const OUT_OF_SCOPE_TASK_PATTERN =
  /(онигоо|шүлэг|үлгэр|өгүүллэг|дууны\s+үг|эсээ|зохио|дүрд\s+тогло|надтай\s+ярилц|чалч|зурхай|код\s+бич|программ\s+бич|имэйл\s+бич|cv\s+бич|орчуул|жор|цаг\s+агаар|нийслэл|математик|тэгшитгэл|гэрийн\s+даалгавар|txt\s*doc|text\s+document|\bjoke\b|\bpoem\b|fairy\s*tale|\bstory\b|song\s+lyrics|\broleplay\b|chat\s+with\s+me|write\s+(?:code|an?\s+email|a\s+poem|a\s+story)|\btranslate\b|\brecipe\b|\bweather\b|\bhomework\b)/iu;

const CONTEXTUAL_FOLLOW_UP_PATTERN =
  /(^|\s)(энэ|тэр|тухайн|дээрх|өмнөх|тэгвэл|харин|бас|өөр|бусад|эдгээр|тэдгээр|аль|ямар|яагаад|яаж|хэрхэн|хаана|хэзээ|хэд|үнэ|хурд|нөхцөл|өрхийнх|байгууллагынх|дэлгэрэнгүй|more|details|then|that|those|which|why|how|where|when|price|speed)(\s|$)/iu;

const COMPANY_PATH_PATTERN =
  /^\/(?:en\/)?(?:company|shareholders|news|bonus|offers|careers)(?:\/|$)/;

function normalize(value: string) {
  return value
    .toLocaleLowerCase("mn")
    .replace(/[.,!?;:()[\]{}"'`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasDirectTelecomIntent(value: string) {
  return (
    BRAND_PATTERN.test(value) ||
    SERVICE_PATTERN.test(value) ||
    ROMANIZED_TELECOM_PATTERN.test(value) ||
    SUPPORT_PATTERN.test(value)
  );
}

export function isTelecomSupportRequest(
  messages: ScopeMessage[],
  pathname = ""
) {
  const userMessages = messages
    .filter((message) => message.role === "user")
    .map((message) => normalize(message.content))
    .filter(Boolean);
  const latest = userMessages.at(-1) ?? "";

  if (!latest || OUT_OF_SCOPE_TASK_PATTERN.test(latest)) return false;
  if (hasDirectTelecomIntent(latest)) return true;

  if (
    COMPANY_PATTERN.test(latest) &&
    (COMPANY_PATH_PATTERN.test(pathname) ||
      userMessages.slice(0, -1).some(hasDirectTelecomIntent))
  ) {
    return true;
  }

  const previousTelecomQuestion = userMessages
    .slice(0, -1)
    .some(hasDirectTelecomIntent);

  return (
    previousTelecomQuestion &&
    latest.length <= 120 &&
    CONTEXTUAL_FOLLOW_UP_PATTERN.test(latest)
  );
}

export function getOutOfScopeAnswer(locale: "mn" | "en") {
  return locale === "en"
    ? "I can only help with Telecom Mongolia services, plans, billing, number orders, faults and service-location information."
    : "Би зөвхөн Монголын Цахилгаан Холбоо ХК-ийн үйлчилгээ, багц, төлбөр, дугаар захиалга, гэмтэл болон салбарын мэдээллээр тусална.";
}
