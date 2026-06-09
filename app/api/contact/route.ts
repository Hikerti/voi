import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
}

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
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
        return NextResponse.json({ error: "Email send error" }, { status: 502 });
      }
    } else {
      console.log("Contact form submission (email not configured):", {
        name: body.name,
        phone: body.phone,
        email: body.email,
        message: body.message,
        source: body.source,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
