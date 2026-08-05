export type ChatAction =
  | "number-order"
  | "package-adviser"
  | "outage-check"
  | "bill-explain"
  | "ticket-create"
  | "appointment-book"
  | "human-handoff";

export type ChatLocale = "mn" | "en";

type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

function latestUserMessage(messages: ConversationMessage[]) {
  return (
    [...messages]
      .reverse()
      .find((message) => message.role === "user")
      ?.content.toLocaleLowerCase("mn") ?? ""
  );
}

export function detectChatAction(
  messages: ConversationMessage[]
): ChatAction | null {
  const latest = latestUserMessage(messages);
  if (!latest) return null;

  if (
    /(дугаар|утасны дугаар|суурин утас|phone number|telephone number|new number)/.test(latest) &&
    /(захиал|сонго|авмаар|авах|хадгал|reserve|order|choose|get)/.test(latest)
  ) {
    return "number-order";
  }

  if (
    /(багц|үйлчилгээ|plan|package|service)/.test(latest) &&
    /(зөвлө|сонго|тохирох|хэмнэлт|хэрэглээнд|recommend|choose|best|suitable)/.test(latest)
  ) {
    return "package-adviser";
  }

  if (
    /(төлбөр|нэхэмжлэл|bill|invoice|charge)/.test(latest) &&
    /(тайлбар|задаргаа|яагаад|нэмэгд|шалга|explain|breakdown|check|higher)/.test(latest)
  ) {
    return "bill-explain";
  }

  if (/(ажилтан|оператор|хүнтэй холбог|амьд хүн|human agent|employee|operator|speak to (a )?person)/.test(latest)) {
    return "human-handoff";
  }

  if (/(салбар.*цаг|цаг.*(захиал|авах)|appointment|book.*branch|branch.*book)/.test(latest)) {
    return "appointment-book";
  }

  if (/(засварын хүсэлт|гомдол.*бүртг|ticket|дуудлага бүртг|repair request|report.*issue)/.test(latest)) {
    return "ticket-create";
  }

  if (/(тасар|ажиллахгүй|сүлжээ алга|гэмтэл байгаа|саатал|outage|service down|not working|no internet|network issue)/.test(latest)) {
    return "outage-check";
  }

  return null;
}

export function getActionInstructions(
  action: ChatAction | null,
  locale: ChatLocale = "mn"
) {
  if (!action) return "";

  if (locale === "en") {
    const englishInstructions: Record<ChatAction, string> = {
      "number-order": "use the form below to choose and order a telephone number",
      "package-adviser": "answer the short questions below to compare suitable plans",
      "outage-check": "enter a service number or location below to check the service status",
      "bill-explain": "enter the service number below to check the billing breakdown",
      "ticket-create": "use the form below to submit a repair request",
      "appointment-book": "choose a branch and date below to request an appointment",
      "human-handoff": "enter contact details below to request help from an employee",
    };
    return `Reply in one short English sentence telling the customer to ${englishInstructions[action]}. The action panel will appear automatically. Do not discuss implementation details.`;
  }

  const instructionByAction: Record<ChatAction, string> = {
    "number-order":
      "доорх формд мэдээллээ бөглөөд дугаараа сонгон захиалахыг хэл",
    "package-adviser":
      "доорх богино асуултуудад хариулаад тохирох багцаа сонгохыг хэл",
    "outage-check":
      "доорх хэсэгт үйлчилгээний мэдээллээ оруулаад саатал байгаа эсэхийг шалгахыг хэл",
    "bill-explain":
      "доорх хэсэгт үйлчилгээний дугаараа оруулаад төлбөрийн задаргаагаа шалгахыг хэл",
    "ticket-create": "доорх формоор засварын хүсэлтээ илгээхийг хэл",
    "appointment-book":
      "доорх хэсгээс салбар, өдрөө сонгон цаг авахыг хэл",
    "human-handoff":
      "доорх хэсэгт холбоо барих мэдээллээ оруулаад ажилтантай холбогдох хүсэлт илгээхийг хэл",
  };

  return `
Энэ хүсэлтэд нэг л богино өгүүлбэрээр ${instructionByAction[action]}.
Техникийн хэрэгжилт, дотоод систем, хамгаалалт, model, API-ийн талаар бүү ярь.
Доорх үйлдлийн хэсэг хэрэглэгчид автоматаар харагдана.
`;
}

const pageLabels: Array<[RegExp, string]> = [
  [/^\/$/, "Нүүр хуудас"],
  [/^\/products\/double/, "Хосолсон багц"],
  [/^\/products\/triple/, "Гуравласан багц"],
  [/^\/products\/single/, "Суурин утас"],
  [/^\/products\/catv/, "National КаТВ"],
  [/^\/products\/iptv/, "TV ROOM"],
  [/^\/products\/sip/, "MIP70"],
  [/^\/reservenumber/, "Дугаар захиалга"],
  [/^\/locations/, "Салбарын байршил"],
  [/^\/help/, "Тусламж"],
];

const englishPageLabels: Array<[RegExp, string]> = [
  [/^\/en$/, "English home page"],
  [/^\/en\/services\//, "English service details"],
  [/^\/en\/services/, "English service catalogue"],
  [/^\/en\/locations/, "English service locations"],
  [/^\/en\/help/, "English customer help"],
  [/^\/en\/contact/, "English contact page"],
];

export function getCurrentPageContext(
  pathname?: string,
  locale: ChatLocale = "mn"
) {
  if (!pathname) return "";
  const labels = locale === "en" ? englishPageLabels : pageLabels;
  const label = labels.find(([pattern]) => pattern.test(pathname))?.[1];
  if (!label) return "";

  return locale === "en"
    ? `<current_page_context>The customer is viewing the “${label}”. Use this context only when relevant.</current_page_context>`
    : `<current_page_context>Хэрэглэгч одоо “${label}” хуудсыг үзэж байна. Асуулттай нь холбоотой үед энэ контекстыг ашигла.</current_page_context>`;
}

export function getPageQuickQuestions(
  pathname: string,
  locale: ChatLocale = "mn"
) {
  if (locale === "en") {
    if (pathname.startsWith("/en/services")) {
      return [
        "Recommend a suitable plan",
        "Compare internet plans",
        "What TV packages are available?",
        "I want to order a new number",
      ];
    }
    if (pathname.startsWith("/en/locations")) {
      return [
        "Show all service locations",
        "Which branch is in Ulaanbaatar?",
        "What are the opening hours?",
        "I want to book a branch appointment",
      ];
    }
    return [
      "Recommend a suitable plan",
      "I want to order a new number",
      "Check a service outage",
      "Show all service locations",
    ];
  }
  if (pathname.startsWith("/products/double")) {
    return [
      "Хосолсон багцуудыг харьцуул",
      "Надад тохирох багц зөвлө",
      "Интернэт ажиллахгүй байна",
      "Засварын хүсэлт бүртгүүлье",
    ];
  }

  if (pathname.startsWith("/products/catv")) {
    return [
      "КаТВ-ийн багцуудыг харьцуул",
      "Сувгийн мэдээлэл өг",
      "Зураг гарахгүй байна",
      "Засварын хүсэлт бүртгүүлье",
    ];
  }

  return [
    "Надад тохирох багц зөвлө",
    "Дугаар захиалах",
    "Үйлчилгээ тасалдсан эсэхийг шалгах",
    "Бүх салбарын мэдээлэл",
  ];
}
