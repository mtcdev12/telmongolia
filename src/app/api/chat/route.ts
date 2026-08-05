import { createHash, randomUUID } from "node:crypto";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getVerifiedKnowledgeContext } from "@/lib/chatbot/context";
import { buildChatbotInstructions } from "@/lib/chatbot/prompt";
import { getCrawledSiteContext } from "@/lib/chatbot/site-crawler";
import {
  detectChatAction,
  getActionInstructions,
  getCurrentPageContext,
  type ChatAction,
} from "@/lib/chatbot/actions";
import { recordAssistantEvent } from "@/lib/chatbot/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2_000),
});

const requestSchema = z
  .object({
    messages: z.array(messageSchema).min(1).max(12),
    sessionId: z.string().regex(/^[A-Za-z0-9_-]{16,128}$/),
    pathname: z
      .string()
      .regex(/^\/[A-Za-z0-9/_-]*$/)
      .max(200)
      .optional(),
    locale: z.enum(["mn", "en"]).default("mn"),
  })
  .superRefine((value, context) => {
    if (value.messages[value.messages.length - 1]?.role !== "user") {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["messages"],
        message: "The final message must be from the user.",
      });
    }

    const totalCharacters = value.messages.reduce(
      (total, message) => total + message.content.length,
      0
    );
    if (totalCharacters > 8_000) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["messages"],
        message: "Conversation is too long.",
      });
    }
  });

type RateLimitEntry = { count: number; resetAt: number };
const globalRateLimit = globalThis as typeof globalThis & {
  telecomChatRateLimit?: Map<string, RateLimitEntry>;
};
const rateLimitStore =
  globalRateLimit.telecomChatRateLimit ??
  (globalRateLimit.telecomChatRateLimit = new Map<string, RateLimitEntry>());

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_REQUESTS = 12;
const MAX_REQUEST_BYTES = 24_000;
const AI_TIMEOUT_MS = 30_000;
const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash";
const DEFAULT_GEMINI_FALLBACK_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-flash-latest",
];

type ChatMessage = z.infer<typeof messageSchema>;
type AiProvider = "gemini" | "openai";

const MONGOLIAN_TYPO_CORRECTIONS: Array<[RegExp, string]> = [
  [/холбоулах/giu, "холбуулах"],
];

function json(body: unknown, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function sanitizeAnswer(value: string) {
  const correctedValue = MONGOLIAN_TYPO_CORRECTIONS.reduce(
    (answer, [pattern, replacement]) =>
      answer.replace(pattern, replacement),
    value
  );

  return correctedValue
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/[^\s)]+/gi, "")
    .replace(/\bwww\.[^\s)]+/gi, "")
    .replace(
      /(^|\s)\/(?:products|help|locations|order|reservenumber)(?:\/[A-Za-z0-9_-]+)*/g,
      "$1"
    )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function sanitizeActionAnswer(
  value: string,
  action: ChatAction | null,
  locale: "mn" | "en"
) {
  const answer = sanitizeAnswer(value);
  if (!action) return answer;

  const containsTechnicalExplanation =
    /(хамгаалагдсан|систем|ai\s*model|хиймэл оюуны модел|нууцлал|аюулгүй байдал)/iu.test(
      answer
    );
  const isTooLong = answer.length > 180 || answer.includes("\n");
  const doesNotPointToAction = !/(доорх|хэсэг|сонголт|форм)/iu.test(answer);

  if (
    !containsTechnicalExplanation &&
    !isTooLong &&
    !doesNotPointToAction
  ) {
    return answer;
  }

  const fallbackByAction: Record<ChatAction, string> = {
    "number-order": "Доорх хэсгээс дугаараа сонгоод захиалгаа илгээнэ үү.",
    "package-adviser":
      "Доорх сонголтуудыг бөглөвөл танд тохирох багцуудыг харьцуулж өгнө.",
    "outage-check":
      "Доорх хэсэгт дугаар эсвэл байршлаа оруулаад үйлчилгээний төлөвөө шалгана уу.",
    "bill-explain":
      "Доорх хэсэгт үйлчилгээний дугаараа оруулаад төлбөрийн задаргаагаа шалгана уу.",
    "ticket-create": "Доорх формоор засварын хүсэлтээ илгээнэ үү.",
    "appointment-book":
      "Доорх хэсгээс салбар болон өдрөө сонгоод цаг захиална уу.",
    "human-handoff":
      "Доорх хэсэгт мэдээллээ оруулаад ажилтантай холбогдох хүсэлт илгээнэ үү.",
  };

  const englishFallbackByAction: Record<ChatAction, string> = {
    "number-order": "Choose a number and submit the order form below.",
    "package-adviser": "Answer the short questions below to compare suitable plans.",
    "outage-check": "Enter a service number or location below to check the service status.",
    "bill-explain": "Enter the service number below to check the billing breakdown.",
    "ticket-create": "Use the form below to submit a repair request.",
    "appointment-book": "Choose a service location and date below to request an appointment.",
    "human-handoff": "Enter your contact details below to request help from an employee.",
  };

  return locale === "en"
    ? englishFallbackByAction[action]
    : fallbackByAction[action];
}

function anonymize(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address = forwardedFor?.split(",")[0]?.trim() || "local";
  return anonymize(address);
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;

  return new OpenAI({
    apiKey,
    timeout: AI_TIMEOUT_MS,
    maxRetries: 2,
  });
}

function getAiProviders(): AiProvider[] {
  const configuredProvider = process.env.AI_PROVIDER?.trim().toLowerCase();
  const hasGemini = Boolean(process.env.GEMINI_API_KEY?.trim());
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY?.trim());

  if (configuredProvider === "gemini") {
    return [
      ...(hasGemini ? (["gemini"] as const) : []),
      ...(hasOpenAI ? (["openai"] as const) : []),
    ];
  }

  if (configuredProvider === "openai") {
    return [
      ...(hasOpenAI ? (["openai"] as const) : []),
      ...(hasGemini ? (["gemini"] as const) : []),
    ];
  }

  if (configuredProvider) {
    return [];
  }

  return [
    ...(hasGemini ? (["gemini"] as const) : []),
    ...(hasOpenAI ? (["openai"] as const) : []),
  ];
}

async function getGeminiAnswer(
  messages: ChatMessage[],
  instructions: string
) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const configuredFallbacks =
    process.env.GEMINI_FALLBACK_MODELS?.split(",")
      .map((model) => model.trim())
      .filter(Boolean) ?? [];
  const models = Array.from(
    new Set([
      process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL,
      ...configuredFallbacks,
      ...DEFAULT_GEMINI_FALLBACK_MODELS,
    ])
  );
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    let lastError: Error | null = null;

    for (const model of models) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: instructions }],
            },
            contents: messages.map((message) => ({
              role: message.role === "assistant" ? "model" : "user",
              parts: [{ text: message.content }],
            })),
          generationConfig: {
            maxOutputTokens: 4_000,
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
          }),
          cache: "no-store",
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        lastError = new Error(
          `Gemini model ${model} failed with status ${response.status}.`
        );
        if (response.status === 429 || response.status >= 500) continue;
        throw lastError;
      }

      const data = (await response.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
        }>;
      };
      const answer =
        data.candidates?.[0]?.content?.parts
          ?.map((part) => part.text ?? "")
          .join("")
          .trim() ?? "";

      if (answer) return answer;
      lastError = new Error(`Gemini model ${model} returned no text output.`);
    }

    throw lastError ?? new Error("No Gemini model was available.");
  } finally {
    clearTimeout(timeout);
  }
}

async function getOpenAIAnswer(
  messages: ChatMessage[],
  sessionId: string,
  instructions: string
) {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL?.trim() || "gpt-5.6-sol",
    instructions,
    input: messages,
    reasoning: { effort: "low" },
    text: { verbosity: "low" },
    max_output_tokens: 2_400,
    safety_identifier: anonymize(sessionId),
    store: false,
  });

  const answer = response.output_text.trim();
  if (!answer) {
    throw new Error("The model returned no text output.");
  }

  return answer;
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();

  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return json({ error: "Зөвшөөрөгдөөгүй хүсэлт байна." }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ error: "JSON хүсэлт шаардлагатай." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return json({ error: "Хүсэлтийн хэмжээ хэтэрсэн байна." }, 413);
  }

  const rateLimit = checkRateLimit(getClientKey(request));
  if (!rateLimit.allowed) {
    return json(
      { error: "Хэт олон хүсэлт илгээлээ. Түр хүлээгээд дахин оролдоно уу." },
      429,
      { "Retry-After": String(rateLimit.retryAfter) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "JSON өгөгдөл буруу байна." }, 400);
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "Чатын мэдээлэл буруу эсвэл хэт урт байна." }, 400);
  }

  const action = detectChatAction(parsed.data.messages);
  const providers = getAiProviders();
  if (providers.length === 0) {
    await recordAssistantEvent({
      type: "chat",
      outcome: "error",
      action,
      source: "not-configured",
    });
    return json(
      {
        error:
          "AI тохиргоо хийгдээгүй байна. .env.local файлд GEMINI_API_KEY эсвэл OPENAI_API_KEY-гээ оруулаад серверээ дахин асаана уу.",
      },
      503
    );
  }

  try {
    const verifiedContext = getVerifiedKnowledgeContext(
      parsed.data.messages
    );
    const crawledContext = await getCrawledSiteContext(
      parsed.data.messages,
      request.nextUrl.origin
    );
    const knowledgeContext = [verifiedContext, crawledContext]
      .filter(Boolean)
      .join("\n\n");
    const instructions = [
      buildChatbotInstructions(knowledgeContext, parsed.data.locale),
      getCurrentPageContext(parsed.data.pathname, parsed.data.locale),
      getActionInstructions(action, parsed.data.locale),
    ]
      .filter(Boolean)
      .join("\n\n");
    let answer = "";
    let providerUsed: AiProvider | null = null;
    let lastProviderError: Error | null = null;

    for (const provider of providers) {
      try {
        answer =
          provider === "gemini"
            ? await getGeminiAnswer(parsed.data.messages, instructions)
            : await getOpenAIAnswer(
                parsed.data.messages,
                parsed.data.sessionId,
                instructions
              );
        providerUsed = provider;
        break;
      } catch (error) {
        lastProviderError =
          error instanceof Error ? error : new Error("Unknown provider error");
        console.warn("Telecom chatbot provider fallback", {
          requestId,
          provider,
          message: lastProviderError.message,
        });
      }
    }

    if (!answer || !providerUsed) {
      throw lastProviderError ?? new Error("No AI provider was available.");
    }

    await recordAssistantEvent({
      type: "chat",
      outcome: "success",
      action,
      source: knowledgeContext
        ? `${providerUsed}-grounded`
        : providerUsed,
    });

    return json({
      answer: sanitizeActionAnswer(answer, action, parsed.data.locale),
      requestId,
      source: knowledgeContext
        ? `${providerUsed}-grounded`
        : providerUsed,
      action,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Telecom chatbot request failed", {
      requestId,
      provider: providers.join(","),
      message,
    });
    await recordAssistantEvent({
      type: "chat",
      outcome: "error",
      action,
      source: providers.join(","),
    });
    return json(
      {
        error:
          "Туслах одоогоор хариулах боломжгүй байна. Түр хүлээгээд дахин оролдоно уу.",
        requestId,
      },
      502
    );
  }
}
