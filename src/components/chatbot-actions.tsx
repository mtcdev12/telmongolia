"use client";

import { type FormEvent, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Headphones,
  Loader2,
  PackageSearch,
  Receipt,
  Signal,
} from "lucide-react";

import { VERIFIED_SERVICE_LOCATIONS } from "@/lib/chatbot/contact";
import type { ChatAction, ChatLocale } from "@/lib/chatbot/actions";
import { getEnglishLocationName } from "@/lib/i18n/english";
import styles from "./chatbot.module.css";

type ActionResult = {
  type: "success" | "error";
  message: string;
  data?: unknown;
};

type Recommendation = {
  service: string;
  name: string;
  technology: string | null;
  price: string;
  speed: number | null;
  conditions: string[];
  note: string | null;
};

const resultLabels: Record<string, string> = {
  status: "Төлөв",
  affectedArea: "Хамрах байршил",
  startedAt: "Эхэлсэн цаг",
  estimatedResolution: "Хэвийн болох хугацаа",
  description: "Тайлбар",
  period: "Төлбөрийн хугацаа",
  previousBalance: "Өмнөх үлдэгдэл",
  serviceCharge: "Үйлчилгээний төлбөр",
  additionalCharge: "Нэмэлт төлбөр",
  payments: "Төлөлт",
  total: "Нийт төлбөр",
  dueDate: "Төлөх хугацаа",
};

const englishResultLabels: Record<string, string> = {
  status: "Status",
  affectedArea: "Affected area",
  startedAt: "Started",
  estimatedResolution: "Estimated resolution",
  description: "Description",
  period: "Billing period",
  previousBalance: "Previous balance",
  serviceCharge: "Service charge",
  additionalCharge: "Additional charge",
  payments: "Payments",
  total: "Total",
  dueDate: "Due date",
};

function ResultBox({
  result,
  locale = "mn",
}: {
  result: ActionResult | null;
  locale?: ChatLocale;
}) {
  if (!result) return null;

  const rows =
    result.data && typeof result.data === "object" && !Array.isArray(result.data)
      ? Object.entries(result.data as Record<string, unknown>)
          .filter(([, value]) =>
            ["string", "number", "boolean"].includes(typeof value)
          )
          .slice(0, 8)
      : [];

  return (
    <div
      className={
        result.type === "success" ? styles.orderSuccess : styles.orderError
      }
      role={result.type === "error" ? "alert" : "status"}
    >
      <span>{result.message}</span>
      {rows.length > 0 && (
        <dl className={styles.actionResultList}>
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>
                {locale === "en"
                  ? englishResultLabels[label] ?? label
                  : resultLabels[label] ?? label}
              </dt>
              <dd>{String(value)}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function PackageAdviserCard({ locale }: { locale: ChatLocale }) {
  const isEnglish = locale === "en";
  const [audience, setAudience] = useState<
    "Өрхийн хэрэглэгч" | "Байгууллага"
  >("Өрхийн хэрэглэгч");
  const [usage, setUsage] = useState<"light" | "balanced" | "heavy">(
    "balanced"
  );
  const [needsInternet, setNeedsInternet] = useState(true);
  const [needsTv, setNeedsTv] = useState(false);
  const [monthlyBudget, setMonthlyBudget] = useState("50000");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);
    setRecommendations([]);

    try {
      const response = await fetch("/api/assistant/package-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audience,
          usage,
          needsInternet,
          needsTv,
          monthlyBudget: Number(monthlyBudget || 0),
          locale,
        }),
      });
      const data = (await response.json()) as {
        recommendations?: Recommendation[];
        message?: string;
        error?: string;
      };
      if (!response.ok) {
        throw new Error(
          isEnglish ? "Plans could not be compared." : data.error || "Багц сонгож чадсангүй."
        );
      }

      setRecommendations(data.recommendations ?? []);
      setResult({
        type: "success",
        message:
          data.message ||
          (isEnglish
            ? "Suitable plans have been ranked for you."
            : "Танд тохирох багцуудыг эрэмбэллээ."),
      });
    } catch (error) {
      setResult({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : isEnglish
            ? "Plans could not be compared."
            : "Багц сонгож чадсангүй.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.orderCard} onSubmit={submit}>
      <div className={styles.orderHeader}>
        <span className={styles.orderIcon} aria-hidden="true">
          <PackageSearch size={17} />
        </span>
        <div>
          <h3>{isEnglish ? "Find a suitable plan" : "Танд тохирох багц"}</h3>
          <p>{isEnglish ? "Choose your needs to compare verified plans." : "Хэрэглээгээ сонгоход тохирох багцуудыг харьцуулна."}</p>
        </div>
      </div>

      <label className={styles.orderField}>
        <span>{isEnglish ? "Customer type" : "Хэрэглэгчийн төрөл"}</span>
        <select
          value={audience}
          onChange={(event) =>
            setAudience(event.target.value as typeof audience)
          }
        >
          <option value="Өрхийн хэрэглэгч">{isEnglish ? "Residential" : "Өрхийн хэрэглэгч"}</option>
          <option value="Байгууллага">{isEnglish ? "Business" : "Байгууллага"}</option>
        </select>
      </label>

      <label className={styles.orderField}>
        <span>{isEnglish ? "Internet usage" : "Интернэтийн хэрэглээ"}</span>
        <select
          value={usage}
          onChange={(event) => setUsage(event.target.value as typeof usage)}
        >
          <option value="light">{isEnglish ? "Light — social media and news" : "Энгийн — сошиал, мэдээ"}</option>
          <option value="balanced">{isEnglish ? "Balanced — video and meetings" : "Дундаж — видео, цахим хурал"}</option>
          <option value="heavy">{isEnglish ? "Heavy — multiple devices and 4K" : "Өндөр — олон төхөөрөмж, 4K"}</option>
        </select>
      </label>

      <div className={styles.actionCheckRow}>
        <label>
          <input
            type="checkbox"
            checked={needsInternet}
            onChange={(event) => setNeedsInternet(event.target.checked)}
          />
          {isEnglish ? "Internet" : "Интернэт"}
        </label>
        <label>
          <input
            type="checkbox"
            checked={needsTv}
            onChange={(event) => setNeedsTv(event.target.checked)}
          />
          {isEnglish ? "Television" : "Телевиз"}
        </label>
      </div>

      <label className={styles.orderField}>
        <span>{isEnglish ? "Monthly budget" : "Сарын төсөв"}</span>
        <input
          type="number"
          inputMode="numeric"
          min="0"
          max="5000000"
          value={monthlyBudget}
          onChange={(event) => setMonthlyBudget(event.target.value.slice(0, 7))}
          placeholder="50000"
        />
      </label>

      <button className={styles.orderSubmit} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className={styles.orderSpinner} size={16} />
            {isEnglish ? "Comparing" : "Тооцоолж байна"}
          </>
        ) : (
          isEnglish ? "Recommend plans" : "Багц санал болгох"
        )}
      </button>

      <ResultBox result={result} locale={locale} />
      {recommendations.length > 0 && (
        <div className={styles.recommendationList}>
          {recommendations.map((item, index) => (
            <article key={`${item.service}-${item.name}-${index}`}>
              <div>
                <span>{index + 1}</span>
                <strong>
                  {item.service} — {item.name}
                </strong>
              </div>
              <b>{item.price}</b>
              {item.technology && <small>{item.technology}</small>}
              <ul>
                {item.conditions.slice(0, 5).map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </form>
  );
}

const actionMeta = {
  "outage-check": {
    title: "Үйлчилгээний төлөв шалгах",
    description: "Дугаар эсвэл байршлаар саатал байгаа эсэхийг шалгана.",
    submit: "Шалгах",
    icon: Signal,
  },
  "bill-explain": {
    title: "Төлбөрийн задаргаа",
    description: "Үйлчилгээний дугаараар төлбөрийн мэдээллээ шалгана.",
    submit: "Төлбөр шалгах",
    icon: Receipt,
  },
  "ticket-create": {
    title: "Засварын хүсэлт",
    description: "Асуудлын мэдээллээ оруулаад хүсэлт илгээнэ.",
    submit: "Хүсэлт илгээх",
    icon: ClipboardList,
  },
  "appointment-book": {
    title: "Салбарт цаг авах",
    description: "Салбар болон үйлчлүүлэх өдрөө сонгоно.",
    submit: "Цаг захиалах",
    icon: CalendarDays,
  },
  "human-handoff": {
    title: "Ажилтантай холбогдох",
    description: "Таны хүсэлтийг товч мэдээллийн хамт дамжуулна.",
    submit: "Холбогдох хүсэлт илгээх",
    icon: Headphones,
  },
} as const;

const englishActionMeta = {
  "outage-check": {
    title: "Check service status",
    description: "Check an outage using a service number or location.",
    submit: "Check status",
    icon: Signal,
  },
  "bill-explain": {
    title: "Billing breakdown",
    description: "Check billing information using a service number.",
    submit: "Check bill",
    icon: Receipt,
  },
  "ticket-create": {
    title: "Repair request",
    description: "Describe the issue and submit a repair request.",
    submit: "Submit request",
    icon: ClipboardList,
  },
  "appointment-book": {
    title: "Book a branch appointment",
    description: "Choose a service location and preferred date.",
    submit: "Request appointment",
    icon: CalendarDays,
  },
  "human-handoff": {
    title: "Contact an employee",
    description: "Send a short summary with your contact details.",
    submit: "Request contact",
    icon: Headphones,
  },
} as const;

type ConnectorAction = keyof typeof actionMeta;

function ConnectorActionCard({
  action,
  conversationSummary,
  locale,
}: {
  action: ConnectorAction;
  conversationSummary: string;
  locale: ChatLocale;
}) {
  const isEnglish = locale === "en";
  const meta = isEnglish ? englishActionMeta[action] : actionMeta[action];
  const Icon = meta.icon;
  const [serviceNumber, setServiceNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [issue, setIssue] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [branch, setBranch] = useState(VERIFIED_SERVICE_LOCATIONS[0]?.name ?? "");
  const [service, setService] = useState("Лавлагаа, зөвлөгөө");
  const [date, setDate] = useState("");
  const [channel, setChannel] = useState<"chat" | "phone">("phone");
  const [summary, setSummary] = useState(conversationSummary.slice(0, 1_500));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const payloadByAction: Record<ConnectorAction, Record<string, unknown>> = {
      "outage-check": {
        action,
        locale,
        ...(serviceNumber ? { serviceNumber } : {}),
        ...(location ? { location } : {}),
      },
      "bill-explain": { action, locale, serviceNumber },
      "ticket-create": {
        action,
        locale,
        serviceNumber,
        phone,
        location,
        issue,
        ...(preferredTime ? { preferredTime } : {}),
      },
      "appointment-book": { action, locale, branch, service, date, phone },
      "human-handoff": { action, locale, phone, channel, summary },
    };

    try {
      const response = await fetch("/api/telecom/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadByAction[action]),
      });
      const data = (await response.json()) as {
        message?: string;
        error?: string;
        data?: unknown;
        referenceId?: string | number | null;
      };
      if (!response.ok) {
        throw new Error(
          isEnglish
            ? "This service is not available in the assistant yet."
            : data.error || "Хүсэлтийг илгээж чадсангүй."
        );
      }

      setResult({
        type: "success",
        message: data.referenceId
          ? `${isEnglish ? "Request received." : data.message || "Хүсэлт хүлээн авлаа."} №${data.referenceId}`
          : isEnglish
          ? "Request received."
          : data.message || "Хүсэлт хүлээн авлаа.",
        data: data.data,
      });
    } catch (error) {
      setResult({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : isEnglish
            ? "The request could not be submitted."
            : "Хүсэлтийг илгээж чадсангүй.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.orderCard} onSubmit={submit}>
      <div className={styles.orderHeader}>
        <span className={styles.orderIcon} aria-hidden="true">
          <Icon size={17} />
        </span>
        <div>
          <h3>{meta.title}</h3>
          <p>{meta.description}</p>
        </div>
      </div>

      {(action === "outage-check" ||
        action === "bill-explain" ||
        action === "ticket-create") && (
        <label className={styles.orderField}>
          <span>{isEnglish ? "Service number" : "Үйлчилгээний дугаар"}</span>
          <input
            value={serviceNumber}
            onChange={(event) =>
              setServiceNumber(event.target.value.replace(/\D/g, "").slice(0, 12))
            }
            inputMode="numeric"
            minLength={action === "outage-check" ? 0 : 4}
            maxLength={12}
            required={action !== "outage-check" || !location}
            placeholder={isEnglish ? "Service number" : "Үйлчилгээний дугаар"}
          />
        </label>
      )}

      {(action === "outage-check" || action === "ticket-create") && (
        <label className={styles.orderField}>
          <span>{isEnglish ? "Location" : "Байршил"}</span>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value.slice(0, 120))}
            required={action === "ticket-create" || !serviceNumber}
            placeholder={isEnglish ? "District, khoroo or province" : "Дүүрэг, хороо эсвэл аймаг"}
          />
        </label>
      )}

      {action === "ticket-create" && (
        <>
          <label className={styles.orderField}>
            <span>{isEnglish ? "Issue description" : "Асуудлын тайлбар"}</span>
            <textarea
              value={issue}
              onChange={(event) => setIssue(event.target.value.slice(0, 500))}
              minLength={5}
              maxLength={500}
              required
              placeholder={isEnglish ? "Briefly describe the problem" : "Ямар асуудал гарсныг товч бичнэ үү"}
            />
          </label>
          <label className={styles.orderField}>
            <span>{isEnglish ? "Preferred contact time" : "Холбогдоход тохиромжтой цаг"}</span>
            <input
              value={preferredTime}
              onChange={(event) => setPreferredTime(event.target.value.slice(0, 60))}
              placeholder={isEnglish ? "Example: 14:00–17:00" : "Жишээ: 14:00–17:00"}
            />
          </label>
        </>
      )}

      {action === "appointment-book" && (
        <>
          <label className={styles.orderField}>
            <span>{isEnglish ? "Service location" : "Салбар"}</span>
            <select value={branch} onChange={(event) => setBranch(event.target.value)}>
              {VERIFIED_SERVICE_LOCATIONS.map((item) => (
                <option key={item.name} value={item.name}>
                  {isEnglish ? getEnglishLocationName(item.name) : item.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.orderField}>
            <span>{isEnglish ? "Service" : "Үйлчилгээ"}</span>
            <select value={service} onChange={(event) => setService(event.target.value)}>
              <option value="Лавлагаа, зөвлөгөө">{isEnglish ? "Information and advice" : "Лавлагаа, зөвлөгөө"}</option>
              <option value="Шинэ үйлчилгээ">{isEnglish ? "New service" : "Шинэ үйлчилгээ"}</option>
              <option value="Гэрээ, шилжилт хөдөлгөөн">{isEnglish ? "Contract or transfer" : "Гэрээ, шилжилт хөдөлгөөн"}</option>
              <option value="Төлбөр, тооцоо">{isEnglish ? "Billing" : "Төлбөр, тооцоо"}</option>
            </select>
          </label>
          <label className={styles.orderField}>
            <span>{isEnglish ? "Date" : "Өдөр"}</span>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>
        </>
      )}

      {action === "human-handoff" && (
        <>
          <label className={styles.orderField}>
            <span>{isEnglish ? "Contact method" : "Холбогдох хэлбэр"}</span>
            <select
              value={channel}
              onChange={(event) => setChannel(event.target.value as typeof channel)}
            >
              <option value="phone">{isEnglish ? "Telephone" : "Утсаар"}</option>
              <option value="chat">{isEnglish ? "Chat" : "Чатаар"}</option>
            </select>
          </label>
          <label className={styles.orderField}>
            <span>{isEnglish ? "Request summary" : "Хүсэлтийн товч утга"}</span>
            <textarea
              value={summary}
              onChange={(event) => setSummary(event.target.value.slice(0, 1_500))}
              minLength={5}
              maxLength={1_500}
              required
            />
          </label>
        </>
      )}

      {(action === "ticket-create" ||
        action === "appointment-book" ||
        action === "human-handoff") && (
        <label className={styles.orderField}>
          <span>{isEnglish ? "Contact telephone" : "Холбоо барих утас"}</span>
          <input
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value.replace(/\D/g, "").slice(0, 8))
            }
            inputMode="numeric"
            pattern="\d{8}"
            maxLength={8}
            required
            placeholder="99000000"
          />
        </label>
      )}

      <button className={styles.orderSubmit} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className={styles.orderSpinner} size={16} />
            {isEnglish ? "Submitting" : "Илгээж байна"}
          </>
        ) : result?.type === "success" ? (
          <>
            <CheckCircle2 size={16} />
            {isEnglish ? "Received" : "Хүлээн авсан"}
          </>
        ) : (
          meta.submit
        )}
      </button>
      <ResultBox result={result} locale={locale} />
    </form>
  );
}

export function ChatActionCard({
  action,
  conversationSummary,
  locale = "mn",
}: {
  action: Exclude<ChatAction, "number-order">;
  conversationSummary: string;
  locale?: ChatLocale;
}) {
  if (action === "package-adviser") return <PackageAdviserCard locale={locale} />;
  return (
    <ConnectorActionCard
      action={action}
      conversationSummary={conversationSummary}
      locale={locale}
    />
  );
}
