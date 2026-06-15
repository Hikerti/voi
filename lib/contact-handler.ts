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
  status?: number;
};

type EmailResult = {
  ok: boolean;
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

function addBackendVariants(candidates: string[], value?: string) {
  const configured = value?.trim().replace(/\/+$/, "");
  if (!configured) return;

  candidates.push(configured);
  candidates.push(configured.endsWith("/api") ? configured.slice(0, -4) : `${configured}/api`);
}

function backendCandidates(requestOrigin?: string) {
  const candidates: string[] = [];

  addBackendVariants(candidates, process.env.CMS_API_URL);
  addBackendVariants(candidates, process.env.NEXT_PUBLIC_CMS_API_URL);
  addBackendVariants(candidates, "http://127.0.0.1:4000/api");
  addBackendVariants(candidates, "http://localhost:4000/api");
  addBackendVariants(candidates, "http://backend:4000/api");

  const normalizedOrigin = requestOrigin?.trim().replace(/\/+$/, "");
  if (normalizedOrigin) candidates.push(`${normalizedOrigin}/api`);

  return Array.from(new Set(candidates));
}

function readBackendError(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) return "Backend request failed";

  try {
    const parsed = JSON.parse(trimmed) as { message?: string | string[]; error?: string };
    if (Array.isArray(parsed.message)) return parsed.message.join(". ");
    return parsed.message || parsed.error || trimmed;
  } catch {
    return trimmed;
  }
}

async function storeLead(body: ContactPayload, requestOrigin?: string): Promise<StoredLeadResult> {
  const path = backendLeadPath(body.source);
  let lastError = "Backend unavailable";
  let lastStatus: number | undefined;

  for (const baseUrl of backendCandidates(requestOrigin)) {
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
        signal: AbortSignal.timeout(6000),
      });

      const responseText = await response.text();

      if (response.status === 404) {
        lastError = `Lead endpoint not found at ${baseUrl}`;
        lastStatus = response.status;
        continue;
      }

      if (!response.ok) {
        const error = readBackendError(responseText);

        if (response.status >= 400 && response.status < 500) {
          return { ok: false, error, status: response.status };
        }

        lastError = error;
        lastStatus = response.status;
        continue;
      }

      const data = responseText ? (JSON.parse(responseText) as { id?: number }) : {};
      return { ok: true, id: data.id };
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Backend unavailable";
    }
  }

  return { ok: false, error: lastError, status: lastStatus };
}

async function sendEmail(body: ContactPayload, leadId?: number): Promise<EmailResult> {
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM ?? "Voitov Studio <onboarding@resend.dev>";
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey || !to) {
    return { ok: false, error: "Email transport is not configured" };
  }

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
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        ...(body.email ? { reply_to: body.email } : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Email send error:", error);
      return { ok: false, error };
    }

    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email transport error";
    console.error("Email transport error:", error);
    return { ok: false, error: message };
  }
}

export async function handleContactPost(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const validationError = validatePayload(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const storedLead = await storeLead(body, request.nextUrl.origin);

    if (
      !storedLead.ok &&
      storedLead.status !== undefined &&
      storedLead.status >= 400 &&
      storedLead.status < 500
    ) {
      return NextResponse.json(
        { error: storedLead.error || "Проверьте заполненные поля." },
        { status: storedLead.status },
      );
    }

    const emailResult = await sendEmail(body, storedLead.id);

    if (storedLead.ok) {
      return NextResponse.json({ ok: true, leadId: storedLead.id, emailSent: emailResult.ok });
    }

    if (emailResult.ok) {
      console.error("Lead store error; delivered by email:", storedLead.error);
      return NextResponse.json({ ok: true, delivery: "email" });
    }

    console.error("Lead store error:", storedLead.error);
    console.error("Email delivery error:", emailResult.error);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Повторите попытку позже или позвоните нам." },
      { status: 502 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Не удалось обработать заявку. Проверьте поля и повторите попытку." },
      { status: 500 },
    );
  }
}
