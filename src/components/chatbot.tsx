"use client";

import {
  Fragment,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Bot,
  CheckCircle2,
  Clock3,
  ImagePlus,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Mic,
  Phone,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";

import styles from "./chatbot.module.css";
import { ChatActionCard } from "./chatbot-actions";
import {
  getPageQuickQuestions,
  type ChatAction,
  type ChatLocale,
} from "@/lib/chatbot/actions";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  action?: ChatAction;
  imageUrl?: string;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: {
    results: { [index: number]: { [index: number]: { transcript: string } } };
  }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const chatbotCopy = {
  mn: {
    welcome: "Сайн байна уу? Би Телеком туслах. Үйлчилгээний мэдээлэл өгөхөөс гадна тантай энгийнээр ярилцаж чадна. Юугаар туслах вэ?",
    title: "Телеком туслах",
    online: "Онлайн",
    security: "Нууц үг, картын мэдээлэл, нэг удаагийн код бүү оруулаарай.",
    listen: "Сонсох",
    input: "Асуултаа энд бичээрэй...",
    disclaimer: "AI хариултыг чухал шийдвэрийн өмнө нягтлаарай.",
    imageName: "Төхөөрөмжийн зураг",
    imageHint: "Зургийн талаар асуултаа бичиж болно.",
    imageQuestion: "Төхөөрөмжийн зургийг шалгаарай.",
    imageAlt: "Хэрэглэгчийн хавсаргасан төхөөрөмжийн зураг",
    addImage: "Төхөөрөмжийн зураг нэмэх",
    speak: "Монгол хэлээр ярих",
    stopSpeak: "Яриаг зогсоох",
    close: "Чатыг хаах",
    open: "Телеком туслахыг нээх",
    send: "Илгээх",
    timeout: "Хариу удааширлаа. Дахин оролдоно уу.",
    connectionError: "Холболтын алдаа гарлаа. Дахин оролдоно уу.",
    typing: "Хариулт бичиж байна",
    outgoingImage: "Илгээх зураг",
    removeImage: "Зургийг хасах",
  },
  en: {
    welcome: "Hello! I’m Telecom Assistant. I can explain verified services and plans, help you compare options, find a branch or simply have a conversation. How can I help?",
    title: "Telecom Assistant",
    online: "Online",
    security: "Do not enter passwords, full card details or one-time codes.",
    listen: "Listen",
    input: "Type your question here…",
    disclaimer: "Please verify AI answers before making an important decision.",
    imageName: "Device photo",
    imageHint: "You may add a short description of the problem.",
    imageQuestion: "Please check this device photo.",
    imageAlt: "Device photo attached by the customer",
    addImage: "Attach a device photo",
    speak: "Speak in English",
    stopSpeak: "Stop listening",
    close: "Close assistant",
    open: "Open Telecom Assistant",
    send: "Send",
    timeout: "The response took too long. Please try again.",
    connectionError: "A connection error occurred. Please try again.",
    typing: "Writing a response",
    outgoingImage: "Image to send",
    removeImage: "Remove image",
  },
} as const;

function createWelcomeMessage(locale: ChatLocale): ChatMessage {
  return { id: `welcome-${locale}`, role: "assistant", content: chatbotCopy[locale].welcome };
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const tokenPattern = /(\*\*[^*]+\*\*)/g;

  return text.split(tokenPattern).filter(Boolean).map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    const strongMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (strongMatch) {
      return (
        <strong key={key} className={styles.strongText}>
          {renderInline(strongMatch[1], `${key}-strong`)}
        </strong>
      );
    }

    return <Fragment key={key}>{part}</Fragment>;
  });
}

function prepareApiMessages(messages: ChatMessage[]) {
  const prepared: Array<Pick<ChatMessage, "role" | "content">> = [];
  let remainingCharacters = 7_800;

  for (const message of messages.slice(-12).reverse()) {
    if (remainingCharacters <= 0) break;
    const content = message.content.slice(0, Math.min(2_000, remainingCharacters));
    if (!content) continue;
    prepared.push({ role: message.role, content });
    remainingCharacters -= content.length;
  }

  return prepared.reverse();
}

function buildConversationSummary(messages: ChatMessage[], locale: ChatLocale) {
  return messages
    .slice(-6)
    .map(
      (message) =>
        `${
          message.role === "user"
            ? locale === "en"
              ? "Customer"
              : "Хэрэглэгч"
            : locale === "en"
            ? "Assistant"
            : "Туслах"
        }: ${message.content}`
    )
    .join("\n")
    .slice(0, 1_500);
}

function RichMessage({ content }: { content: string }) {
  return (
    <div className={styles.richMessage}>
      {content.split(/\r?\n/).map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line) {
          return (
            <span
              key={`space-${index}`}
              className={styles.messageSpacer}
              aria-hidden="true"
            />
          );
        }

        const headingMatch = line.match(/^(#{1,6})\s*(\S.*)$/);
        if (headingMatch && headingMatch[1].length <= 2) {
          return (
            <h3 key={`heading-${index}`} className={styles.responseHeading}>
              {renderInline(headingMatch[2], `heading-${index}`)}
            </h3>
          );
        }

        if (headingMatch && headingMatch[1].length === 3) {
          return (
            <h4 key={`subheading-${index}`} className={styles.responseSubheading}>
              {renderInline(headingMatch[2], `subheading-${index}`)}
            </h4>
          );
        }

        if (headingMatch) {
          return (
            <h5 key={`item-heading-${index}`} className={styles.responseItemHeading}>
              {renderInline(headingMatch[2], `item-heading-${index}`)}
            </h5>
          );
        }

        const contactMatch = line.match(
          /^- \*\*(Хаяг|Утас|И-мэйл|Цагийн хуваарь):\*\*/
        );
        if (contactMatch) {
          const icon =
            contactMatch[1] === "Хаяг" ? (
              <MapPin size={15} />
            ) : contactMatch[1] === "Утас" ? (
              <Phone size={15} />
            ) : contactMatch[1] === "И-мэйл" ? (
              <Mail size={15} />
            ) : (
              <Clock3 size={15} />
            );

          return (
            <div key={`contact-${index}`} className={styles.contactInfoRow}>
              <span className={styles.contactInfoIcon} aria-hidden="true">
                {icon}
              </span>
              <span>{renderInline(line.slice(2), `contact-${index}`)}</span>
            </div>
          );
        }

        if (/^[-*] /.test(line)) {
          return (
            <div key={`bullet-${index}`} className={styles.bulletLine}>
              <span className={styles.bulletDot} aria-hidden="true" />
              <span>{renderInline(line.slice(2), `bullet-${index}`)}</span>
            </div>
          );
        }

        return (
          <p key={`paragraph-${index}`}>
            {renderInline(line, `paragraph-${index}`)}
          </p>
        );
      })}
    </div>
  );
}

function NumberOrderForm({ locale }: { locale: ChatLocale }) {
  const isEnglish = locale === "en";
  const [number, setNumber] = useState("");
  const [availableNumbers, setAvailableNumbers] = useState<
    Array<{ number: string; grade: string | null }>
  >([]);
  const [numberPage, setNumberPage] = useState(1);
  const [hasMoreNumbers, setHasMoreNumbers] = useState(false);
  const [isLoadingNumbers, setIsLoadingNumbers] = useState(true);
  const [numberListMessage, setNumberListMessage] = useState("");
  const [email, setEmail] = useState("");
  const [register, setRegister] = useState("");
  const [place, setPlace] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function loadAvailableNumbers(page: number) {
    if (isLoadingNumbers && page !== 1) return;

    setIsLoadingNumbers(true);
    setNumberListMessage("");

    try {
      const params = new URLSearchParams({
        pattern: "________",
        grade: "A",
        page: String(page),
      });
      const response = await fetch(
        `/api/number-order/search?${params.toString()}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
        }
      );
      const data = (await response.json()) as {
        numbers?: Array<{ number: string; grade: string | null }>;
        page?: number;
        hasMore?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          isEnglish
            ? "Available numbers could not be loaded."
            : data.error || "Сул дугаарын жагсаалт авах боломжгүй байна."
        );
      }

      const numbers = Array.isArray(data.numbers) ? data.numbers : [];
      setAvailableNumbers(numbers);
      setNumberPage(data.page ?? page);
      setHasMoreNumbers(Boolean(data.hasMore));
      setNumberListMessage(
        numbers.length > 0
          ? ""
          : isEnglish
          ? "No available numbers were found."
          : data.message || "Сул дугаар олдсонгүй."
      );
      if (numbers.length > 0 && !number) {
        setNumber(numbers[0].number);
      }
    } catch (error) {
      setAvailableNumbers([]);
      setHasMoreNumbers(false);
      setNumberListMessage(
        isEnglish
          ? "Available numbers could not be loaded."
          : error instanceof Error
          ? error.message
          : "Сул дугаарын жагсаалт авах боломжгүй байна."
      );
    } finally {
      setIsLoadingNumbers(false);
    }
  }

  useEffect(() => {
    void loadAvailableNumbers(1);
    // The initial list should load only when the order form appears.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || result?.type === "success") return;

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/number-order/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number,
          email,
          register,
          place,
        }),
      });
      const data = (await response.json()) as {
        result?: string;
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          isEnglish
            ? "The number order could not be submitted."
            : data.error || "Захиалгын хүсэлт амжилтгүй боллоо."
        );
      }

      if (data.result !== "ok") {
        throw new Error(
          isEnglish
            ? "This number is not available for ordering."
            : data.message || "Энэ дугаарыг одоогоор захиалах боломжгүй байна."
        );
      }

      setResult({
        type: "success",
        message:
          isEnglish
            ? "Your number order has been received."
            : data.message || "Дугаарын захиалга амжилттай бүртгэгдлээ.",
      });
    } catch (error) {
      setResult({
        type: "error",
        message:
          isEnglish
            ? error instanceof Error
              ? error.message
              : "The number order could not be submitted."
            : error instanceof Error
            ? error.message
            : "Захиалгын хүсэлт амжилтгүй боллоо.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isComplete =
    /^\d{8}$/.test(number) &&
    email.trim().length > 3 &&
    register.trim().length >= 10 &&
    place.trim().length >= 2;

  return (
    <form className={styles.orderCard} onSubmit={submitReservation}>
      <div className={styles.orderHeader}>
        <span className={styles.orderIcon} aria-hidden="true">
          <Phone size={16} />
        </span>
        <div>
          <h3>{isEnglish ? "Order a telephone number" : "Дугаар захиалах"}</h3>
          <p>{isEnglish ? "Choose an available 8-digit number." : "Сонгосон 8 оронтой дугаараа оруулна уу."}</p>
        </div>
      </div>

      <div className={styles.numberPicker}>
        <div className={styles.numberPickerHeader}>
          <span>{isEnglish ? "Available numbers" : "Сонгох боломжтой дугаарууд"}</span>
          <button
            type="button"
            className={styles.numberRefresh}
            onClick={() =>
              void loadAvailableNumbers(hasMoreNumbers ? numberPage + 1 : 1)
            }
            disabled={isLoadingNumbers || isSubmitting}
          >
            <RefreshCw
              size={13}
              className={isLoadingNumbers ? styles.orderSpinner : undefined}
            />
            {isEnglish ? "More numbers" : "Өөр дугаар"}
          </button>
        </div>

        {isLoadingNumbers ? (
          <div className={styles.numberPickerState}>
            <Loader2 className={styles.orderSpinner} size={16} />
            {isEnglish ? "Loading numbers" : "Дугааруудыг уншиж байна"}
          </div>
        ) : availableNumbers.length > 0 ? (
          <div className={styles.numberGrid}>
            {availableNumbers.map((item) => (
              <button
                key={item.number}
                type="button"
                className={`${styles.numberOption} ${
                  number === item.number ? styles.numberOptionSelected : ""
                }`}
                onClick={() => {
                  setNumber(item.number);
                  setResult(null);
                }}
                disabled={isSubmitting || result?.type === "success"}
                aria-pressed={number === item.number}
              >
                {item.number}
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.numberPickerState}>{numberListMessage}</div>
        )}
      </div>

      <label className={styles.orderField}>
        <span>{isEnglish ? "Selected number" : "Сонгосон дугаар"}</span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={number}
          onChange={(event) =>
            setNumber(event.target.value.replace(/\D/g, "").slice(0, 8))
          }
          placeholder="70000000"
          pattern="\d{8}"
          maxLength={8}
          required
          disabled={isSubmitting || result?.type === "success"}
        />
      </label>

      <label className={styles.orderField}>
        <span>{isEnglish ? "Email" : "И-мэйл"}</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value.slice(0, 50))}
          placeholder="name@example.mn"
          maxLength={50}
          required
          disabled={isSubmitting || result?.type === "success"}
        />
      </label>

      <label className={styles.orderField}>
        <span>{isEnglish ? "Registration number" : "Регистрийн дугаар"}</span>
        <input
          type="text"
          autoComplete="off"
          value={register}
          onChange={(event) => setRegister(event.target.value.slice(0, 20))}
          placeholder="АА00000000"
          minLength={10}
          maxLength={20}
          required
          disabled={isSubmitting || result?.type === "success"}
        />
      </label>

      <label className={styles.orderField}>
        <span>{isEnglish ? "Location" : "Байршил"}</span>
        <input
          type="text"
          autoComplete="address-level1"
          value={place}
          onChange={(event) => setPlace(event.target.value.slice(0, 35))}
          placeholder={isEnglish ? "Ulaanbaatar" : "Улаанбаатар"}
          minLength={2}
          maxLength={35}
          required
          disabled={isSubmitting || result?.type === "success"}
        />
      </label>

      <p className={styles.orderConsent}>
        {isEnglish
          ? "Confirmation information will be sent by email after submission."
          : "Захиалгаа илгээсний дараа баталгаажуулах мэдээлэл и-мэйлээр очно."}
      </p>

      <button
        type="submit"
        className={styles.orderSubmit}
        disabled={!isComplete || isSubmitting || result?.type === "success"}
      >
        {isSubmitting ? (
          <>
            <Loader2 className={styles.orderSpinner} size={16} />
            {isEnglish ? "Submitting" : "Илгээж байна"}
          </>
        ) : result?.type === "success" ? (
          <>
            <CheckCircle2 size={16} />
            {isEnglish ? "Submitted" : "Захиалсан"}
          </>
        ) : (
          isEnglish ? "Submit order" : "Захиалга илгээх"
        )}
      </button>

      {result && (
        <div
          className={
            result.type === "success"
              ? styles.orderSuccess
              : styles.orderError
          }
          role={result.type === "error" ? "alert" : "status"}
        >
          {result.message}
        </div>
      )}
    </form>
  );
}

export default function Chatbot({ locale = "mn" }: { locale?: ChatLocale }) {
  const pathname = usePathname();
  const copy = chatbotCopy[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage(locale)]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [attachmentError, setAttachmentError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const sessionId = useRef("");
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechRecognition = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const saved = window.sessionStorage.getItem("telecom-chat-session");
    sessionId.current = saved || makeId();
    if (!saved) {
      window.sessionStorage.setItem("telecom-chat-session", sessionId.current);
    }
  }, []);

  useEffect(() => {
    setMessages([createWelcomeMessage(locale)]);
    setInput("");
    setImagePreview(null);
  }, [locale]);

  useEffect(() => {
    const openAssistant = () => setIsOpen(true);
    window.addEventListener("telecom-chat-open", openAssistant);
    return () => window.removeEventListener("telecom-chat-open", openAssistant);
  }, []);

  useEffect(() => {
    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    setSpeechAvailable(
      Boolean(
        speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition
      )
    );

    return () => speechRecognition.current?.stop();
  }, []);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  async function submitMessage(rawMessage: string) {
    const content = rawMessage.trim();
    const currentImage = imagePreview;
    if ((!content && !currentImage) || isLoading) return;

    const userMessage: ChatMessage = {
      id: makeId(),
      role: "user",
      content: content || copy.imageQuestion,
      imageUrl: currentImage ?? undefined,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setImagePreview(null);
    setAttachmentError("");
    setIsLoading(true);

    if (!sessionId.current) {
      sessionId.current = makeId();
      window.sessionStorage.setItem("telecom-chat-session", sessionId.current);
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 35_000);

    try {
      const response = currentImage
        ? await fetch("/api/assistant/image-diagnostic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image: currentImage,
              question: content,
              sessionId: sessionId.current,
              locale,
            }),
            signal: controller.signal,
          })
        : await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: prepareApiMessages(nextMessages),
              sessionId: sessionId.current,
              pathname,
              locale,
            }),
            signal: controller.signal,
          });

      const result = (await response.json()) as {
        answer?: string;
        error?: string;
        action?: ChatAction | null;
      };
      if (!response.ok || !result.answer) {
        throw new Error(
          locale === "en"
            ? currentImage
              ? "The photo could not be checked. Please try again."
              : "The assistant could not answer. Please try again."
            : result.error || "Хариу авахад алдаа гарлаа."
        );
      }

      setMessages((current) => [
        ...current,
        {
          id: makeId(),
          role: "assistant",
          content: result.answer as string,
          action: result.action ?? undefined,
        },
      ]);
    } catch (error) {
      const content =
        error instanceof DOMException && error.name === "AbortError"
          ? copy.timeout
          : error instanceof Error
          ? error.message
          : copy.connectionError;
      setMessages((current) => [
        ...current,
        { id: makeId(), role: "assistant", content },
      ]);
    } finally {
      window.clearTimeout(timeout);
      setIsLoading(false);
    }
  }

  function handleImageSelection(file?: File) {
    setAttachmentError("");
    if (!file) return;
    if (!/^(image\/jpeg|image\/png|image\/webp)$/.test(file.type)) {
      setAttachmentError(
        locale === "en"
          ? "Please select a JPEG, PNG or WebP image."
          : "JPEG, PNG эсвэл WebP зураг сонгоно уу."
      );
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setAttachmentError(
        locale === "en"
          ? "The image must be smaller than 5 MB."
          : "Зураг 5MB-аас бага байна."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setImagePreview(reader.result);
    };
    reader.onerror = () =>
      setAttachmentError(
        locale === "en"
          ? "The image could not be read."
          : "Зургийг уншиж чадсангүй."
      );
    reader.readAsDataURL(file);
  }

  function toggleVoiceInput() {
    if (isListening) {
      speechRecognition.current?.stop();
      return;
    }

    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Recognition =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.lang = locale === "en" ? "en-US" : "mn-MN";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();
      if (transcript) setInput((current) => `${current} ${transcript}`.trim());
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    speechRecognition.current = recognition;
    setIsListening(true);
    recognition.start();
  }

  function speakAnswer(content: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      content.replace(/[#*_`]/g, " ").replace(/\s+/g, " ").trim()
    );
    utterance.lang = locale === "en" ? "en-US" : "mn-MN";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage(input);
    }
  }

  return (
    <div className={styles.root}>
      {isOpen && (
        <section
          className={styles.panel}
          role="dialog"
          aria-label={copy.title}
          aria-modal="false"
        >
          <header className={styles.header}>
            <div className={styles.identity}>
              <span className={styles.avatar} aria-hidden="true">
                <Bot size={22} />
              </span>
              <div>
                <div className={styles.titleRow}>
                  <h2>{copy.title}</h2>
                  <Sparkles size={15} aria-hidden="true" />
                </div>
                <p><span className={styles.onlineDot} /> {copy.online}</p>
              </div>
            </div>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setIsOpen(false)}
              aria-label={copy.close}
            >
              <X size={21} />
            </button>
          </header>

          <div className={styles.messages} aria-live="polite">
            <div className={styles.securityNote}>
              <ShieldCheck size={15} aria-hidden="true" />
              {copy.security}
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.messageRow} ${
                  message.role === "user" ? styles.userRow : styles.assistantRow
                }`}
              >
                {message.role === "assistant" && (
                  <span className={styles.messageAvatar} aria-hidden="true">
                    <Bot size={15} />
                  </span>
                )}
                {message.role === "assistant" ? (
                  <div className={styles.assistantMessageContent}>
                    <div className={styles.bubble}>
                      <RichMessage content={message.content} />
                    </div>
                    <button
                      type="button"
                      className={styles.speakButton}
                      onClick={() => speakAnswer(message.content)}
                      aria-label={copy.listen}
                      title={copy.listen}
                    >
                      <Volume2 size={13} />
                      {copy.listen}
                    </button>
                    {message.action === "number-order" && <NumberOrderForm locale={locale} />}
                    {message.action && message.action !== "number-order" && (
                      <ChatActionCard
                        action={message.action}
                        conversationSummary={buildConversationSummary(messages, locale)}
                        locale={locale}
                      />
                    )}
                  </div>
                ) : (
                  <div className={styles.userMessageContent}>
                    {message.imageUrl && (
                      <Image
                        src={message.imageUrl}
                        alt={copy.imageAlt}
                        className={styles.messageImage}
                        width={210}
                        height={180}
                        unoptimized
                      />
                    )}
                    <div className={styles.bubble}>{message.content}</div>
                  </div>
                )}
              </div>
            ))}

            {messages.length === 1 && (
              <div className={styles.quickQuestions}>
                {getPageQuickQuestions(pathname, locale).map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void submitMessage(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className={`${styles.messageRow} ${styles.assistantRow}`}>
                <span className={styles.messageAvatar} aria-hidden="true">
                  <Bot size={15} />
                </span>
                <div className={styles.typing} aria-label={copy.typing}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {imagePreview && (
            <div className={styles.attachmentPreview}>
              <Image
                src={imagePreview}
                alt={copy.outgoingImage}
                width={48}
                height={42}
                unoptimized
              />
              <div>
                <strong>{copy.imageName}</strong>
                <span>{copy.imageHint}</span>
              </div>
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                aria-label={copy.removeImage}
              >
                <X size={15} />
              </button>
            </div>
          )}
          {attachmentError && (
            <p className={styles.attachmentError} role="alert">
              {attachmentError}
            </p>
          )}

          <form className={styles.composer} onSubmit={handleSubmit}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className={styles.hiddenFileInput}
              onChange={(event) => {
                handleImageSelection(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
            <button
              type="button"
              className={styles.composerToolButton}
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              aria-label={copy.addImage}
              title={copy.addImage}
            >
              <ImagePlus size={17} />
            </button>
            {speechAvailable && (
              <button
                type="button"
                className={`${styles.composerToolButton} ${
                  isListening ? styles.composerToolButtonActive : ""
                }`}
                onClick={toggleVoiceInput}
                disabled={isLoading}
                aria-label={isListening ? copy.stopSpeak : copy.speak}
                title={isListening ? copy.stopSpeak : copy.speak}
              >
                <Mic size={17} />
              </button>
            )}
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, 2_000))}
              onKeyDown={handleKeyDown}
              placeholder={copy.input}
              rows={1}
              maxLength={2_000}
              disabled={isLoading}
              aria-label={copy.input}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={(!input.trim() && !imagePreview) || isLoading}
              aria-label={copy.send}
            >
              <Send size={18} />
            </button>
          </form>
          <p className={styles.disclaimer}>{copy.disclaimer}</p>
        </section>
      )}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? copy.close : copy.open}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={27} />}
        {!isOpen && <span className={styles.launcherDot} aria-hidden="true" />}
      </button>
    </div>
  );
}
