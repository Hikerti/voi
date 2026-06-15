import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  source?: string;
  pageUrl?: string;
  startedAt?: string;
  company?: string;
  consent?: boolean;
};

type StoredLeadResult = {
  ok: boolean;
  id?: number;
  error?: string;
};

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

function backendLeadPath(source?: string) {
  const normalized = source?.toLowerCase() ?? "";
  if (normalized.includes("review")) return "/leads/review";
  if (normalized.includes("question") || normalized.includes("faq")) return "/leads/question";
  if (normalized.includes("callback")) return "/leads/callback";
  return "/leads/contact";
}

function cleanOptional(value?: string) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function validatePayload(body: ContactPayload) {
  const source = body.source?.toLowerCase() ?? "";
  const isReview = source.includes("review");
  const needsPhone = source.includes("callback") || source.includes("general");

  if (body.phone && countDigits(body.phone) < 10) return "Укажите телефон, минимум 10 цифр";
  if (needsPhone && countDigits(body.phone ?? "") < 10) return "Телефон обязателен для обратного звонка";
  if (body.email && !body.email.includes("@")) return "Некорректный email";
  if (!isReview && !body.phone && !body.email) return "Укажите телефон или email";
  if (!body.consent) return "Необходимо согласие на обработку персональных данных";

  return null;
}

function backendCandidates() {
  const configured = (
    process.env.CMS_API_URL ||
    process.env.NEXT_PUBLIC_CMS_API_URL ||
    "http://127.0.0.1:4000/api"
  ).replace(/\/+$/, "");

  const candidates = configured.endsWith("/api")
    ? [configured, configured.slice(0, -4)]
    : [configured, `${configured}/api`];

  return Array.from(new Set(candidates));
}

async function storeLead(body: ContactPayload): Promise<StoredLeadResult> {
  const path = backendLeadPath(body.source);
  let lastError = "Backend unavailable";

  for (const baseUrl of backendCandidates()) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanOptional(body.name),
          phone: cleanOptional(body.phone),
          email: cleanOptional(body.email),
          message: cleanOptional(body.message),
          source: cleanOptional(body.source),
          pageUrl: cleanOptional(body.pageUrl),
          startedAt: body.startedAt,
          company: cleanOptional(body.company),
          consent: body.consent,
        }),
        cache: "no-store",
      });

      if (response.status === 404) {
        lastError = `Lead endpoint not found at ${baseUrl}`;
        continue;
      }

      if (!response.ok) {
        lastError = await response.text();
        continue;
      }

      const data = (await response.json()) as { id?: number };
      return { ok: true, id: data.id };
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Backend unavailable";
    }
  }

  return { ok: false, error: lastError };
}

async function sendEmail(body: ContactPayload, leadId?: number) {
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM ?? "site@voitov.studio";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey || !to) return;

  const subject = `Новая заявка с сайта${body.source ? `: ${body.source}` : ""}`;
  const text = [
    "Новая заявка с сайта Voitov Studio",
    "",
    leadId ? `ID заявки: ${leadId}` : null,
    body.name ? `Имя: ${body.name}` : null,
    body.phone ? `Телефон: ${body.phone}` : null,
    body.email ? `Email: ${body.email}` : null,
    body.message ? `Сообщение: ${body.message}` : null,
    body.source ? `Источник: ${body.source}` : null,
    body.pageUrl ? `Страница: ${body.pageUrl}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Email send error:", await response.text());
    }
  } catch (error) {
    console.error("Email transport error:", error);
  }
}

export async function handleContactPost(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const validationError = validatePayload(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const storedLead = await storeLead(body);
    if (!storedLead.ok) {
      console.error("Lead store error:", storedLead.error);
      return NextResponse.json(
        { error: "Не удалось отправить заявку. Повторите попытку позже или позвоните нам." },
        { status: 502 },
      );
    }

    await sendEmail(body, storedLead.id);
    return NextResponse.json({ ok: true, leadId: storedLead.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Не удалось обработать заявку. Проверьте поля и повторите попытку." },
      { status: 500 },
    );
  }
}
