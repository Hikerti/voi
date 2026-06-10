import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
  pageUrl?: string;
  startedAt?: string;
}

interface StoredLeadResult {
  ok: boolean;
  id?: number;
  error?: string;
}

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
  return trimmed ? trimmed : undefined;
}

async function storeLead(body: ContactPayload): Promise<StoredLeadResult> {
  const baseUrl =
    process.env.CMS_API_URL ||
    process.env.NEXT_PUBLIC_CMS_API_URL ||
    "http://127.0.0.1:4000/api";

  try {
    const res = await fetch(`${baseUrl}${backendLeadPath(body.source)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cleanOptional(body.name),
        phone: body.phone,
        email: cleanOptional(body.email),
        message: cleanOptional(body.message),
        source: cleanOptional(body.source),
        pageUrl: cleanOptional(body.pageUrl),
        startedAt: body.startedAt,
      }),
    });

    if (!res.ok) {
      return { ok: false, error: await res.text() };
    }

    const data = (await res.json()) as { id?: number };
    return { ok: true, id: data.id };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Backend unavailable",
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    if (countDigits(body.phone ?? "") < 10) {
      return NextResponse.json({ error: "Укажите телефон, минимум 10 цифр" }, { status: 400 });
    }

    if (body.email && !body.email.includes("@")) {
      return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
    }

    const storedLead = await storeLead(body);

    if (!storedLead.ok) {
      console.error("Lead store error:", storedLead.error);
      return NextResponse.json(
        { error: "Не получилось сохранить заявку" },
        { status: 502 },
      );
    }

    const to = process.env.CONTACT_EMAIL_TO;
    const from = process.env.CONTACT_EMAIL_FROM ?? "site@voitov.studio";
    const resendApiKey = process.env.RESEND_API_KEY;
    const subject = `Новая заявка с сайта${body.source ? `: ${body.source}` : ""}`;
    const text = [
      "Новая заявка с сайта Voitov Studio",
      "",
      body.name ? `Имя: ${body.name}` : null,
      `Телефон: ${body.phone}`,
      body.email ? `Email: ${body.email}` : null,
      body.message ? `Сообщение: ${body.message}` : null,
      body.source ? `Источник: ${body.source}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    if (resendApiKey && to) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, subject, text }),
      });

      if (!emailRes.ok) {
        console.error("Email send error:", await emailRes.text());
      }
    } else {
      console.log("Contact form submission (email not configured):", {
        name: body.name,
        phone: body.phone,
        email: body.email,
        message: body.message,
        source: body.source,
        leadId: storedLead.id,
      });
    }

    return NextResponse.json({ ok: true, leadId: storedLead.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
