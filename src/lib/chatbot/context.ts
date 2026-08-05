import { VERIFIED_SERVICE_LOCATIONS } from "@/lib/chatbot/contact";
import {
  VERIFIED_PRODUCT_PLANS,
  type ProductPlan,
} from "@/lib/chatbot/knowledge";

type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

type Audience = ProductPlan["audience"];

const serviceAliases: Array<{ service: string; aliases: string[] }> = [
  {
    service: "Гуравласан багц",
    aliases: ["гуравласан", "гурвалсан", "triple"],
  },
  {
    service: "Хосолсон багц",
    aliases: ["хосолсон", "double", "интернэт утас", "интернет утас"],
  },
  {
    service: "Суурин утас",
    aliases: ["суурин утас", "дан багц", "ярианы багц"],
  },
  {
    service: "National КаТВ",
    aliases: ["national катв", "катв", "ка тв", "кабелийн тв", "кабель тв"],
  },
  {
    service: "TV ROOM",
    aliases: ["tv room", "tvroom", "тв рүүм", "тв өрөө", "iptv"],
  },
  {
    service: "MIP70",
    aliases: ["mip70", "mip 70", "sip", "ip phone"],
  },
  {
    service: "Call Center",
    aliases: ["call center", "callcenter", "колл центр", "дуудлагын төв"],
  },
  {
    service: "Dedicated интернэт",
    aliases: ["dedicated", "бодит хурд", "зориулалтын интернэт"],
  },
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("mn")
    .replace(/[.,!?;:()[\]{}"'`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findAudience(text: string): Audience | null {
  if (/\b(байгууллага|компани|бизнес|албан газар|аж ахуйн)\b/.test(text)) {
    return "Байгууллага";
  }

  if (/\b(өрх|өрхийн|гэр|хувь хүн)\b/.test(text)) {
    return "Өрхийн хэрэглэгч";
  }

  return null;
}

function findService(text: string) {
  return (
    serviceAliases.find(({ aliases }) =>
      aliases.some((alias) => text.includes(alias))
    )?.service ?? null
  );
}

function isShortFollowUp(text: string) {
  return /^(өөр|өөр нь|өөр багц|өөр үйлчилгээ|бусад|бусад нь|цааш нь|тэгвэл өөр)$/i.test(
    text
  );
}

function hasProductIntent(text: string) {
  return /(үйлчилгээ|багц|үнэ|тариф|хурд|нөхцөл|дагалдах|сонголт|зөвлө|хэд вэ|ямар вэ|хамгийн|интернэт|интернет|телевиз|утас)/.test(
    text
  );
}

function getTopicText(messages: ConversationMessage[]) {
  const userMessages = messages
    .filter((message) => message.role === "user")
    .map((message) => normalize(message.content));
  const latest = userMessages.at(-1) ?? "";

  if (!isShortFollowUp(latest)) return latest;

  const previousTopic = userMessages
    .slice(0, -1)
    .reverse()
    .find((message) => findService(message) || hasProductIntent(message));

  return previousTopic ? `${previousTopic} ${latest}` : latest;
}

function selectProductFacts(messages: ConversationMessage[]) {
  const topic = getTopicText(messages);
  if (!topic || !hasProductIntent(topic)) return [];

  const service = findService(topic);
  const audience = findAudience(topic);
  const asksAboutInternet =
    !service && /\b(интернэт|интернет|internet)\b/.test(topic);

  return VERIFIED_PRODUCT_PLANS.filter((plan) => {
    if (audience && plan.audience !== audience) return false;
    if (service && service !== "Dedicated интернэт") {
      return plan.service === service;
    }
    if (service === "Dedicated интернэт") return false;
    if (asksAboutInternet) {
      return plan.conditions.some((condition) =>
        normalize(condition).includes("интернэтийн хурд")
      );
    }
    return true;
  });
}

function formatProductFacts(plans: ProductPlan[]) {
  if (!plans.length) return "";

  const lines = plans.map((plan) =>
    JSON.stringify({
      audience: plan.audience,
      service: plan.service,
      technology: plan.technology,
      name: plan.name,
      price: plan.price,
      conditions: plan.conditions,
      note: plan.note,
    })
  );

  return [
    "<verified_product_facts>",
    "Эдгээр нь бэлэн хариулт биш, зөвхөн хариулт найруулахад ашиглах баримтууд.",
    ...lines,
    "</verified_product_facts>",
  ].join("\n");
}

function selectLocationFacts(messages: ConversationMessage[]) {
  const latest = normalize(
    [...messages].reverse().find((message) => message.role === "user")
      ?.content ?? ""
  );
  if (!latest) return [];

  const exactLocation = VERIFIED_SERVICE_LOCATIONS.find((location) =>
    location.aliases.some((alias) => latest.includes(normalize(alias)))
  );
  if (exactLocation) return [exactLocation];

  if (/(салбар|байршил|хаана|хаяг|цагийн хуваарь)/.test(latest)) {
    return VERIFIED_SERVICE_LOCATIONS;
  }

  return [];
}

function formatLocationFacts(
  locations: typeof VERIFIED_SERVICE_LOCATIONS
) {
  if (!locations.length) return "";

  const lines = locations.map((location) =>
    JSON.stringify({
      name: location.name,
      region: location.region,
      address: location.address,
      phones: location.phones,
      emails: location.emails,
      hours: location.hours,
    })
  );

  return [
    "<verified_location_facts>",
    "Эдгээр нь бэлэн хариулт биш, зөвхөн хариулт найруулахад ашиглах баримтууд.",
    ...lines,
    "</verified_location_facts>",
  ].join("\n");
}

export function getVerifiedKnowledgeContext(
  messages: ConversationMessage[]
) {
  const productFacts = selectProductFacts(messages);
  const locationFacts = selectLocationFacts(messages);
  const topic = getTopicText(messages);
  const extraFacts =
    findService(topic) === "Dedicated интернэт"
      ? [
          "<verified_extra_facts>",
          "Байгууллагын dedicated интернэтийн нийтэд тавьсан тогтсон үнэ энэ вебд байхгүй. Байршил, хурд, SLA, холболтын нөхцөлөөр үнийн санал гарна.",
          "</verified_extra_facts>",
        ].join("\n")
      : "";

  return [
    formatProductFacts(productFacts),
    formatLocationFacts(locationFacts),
    extraFacts,
  ]
    .filter(Boolean)
    .join("\n\n");
}
