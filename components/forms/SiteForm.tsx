"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/constants";

interface SiteFormProps {
  title?: string;
  submitLabel?: string;
  source: string;
  compact?: boolean;
}

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

export default function SiteForm({
  title = "Оставить заявку",
  submitLabel = "Отправить",
  source,
  compact = false,
}: SiteFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get("phone") ?? "");
    const email = String(formData.get("email") ?? "");

    if (countDigits(phone) < 10) {
      setError("Укажите телефон, минимум 10 цифр.");
      return;
    }

    if (email && !email.includes("@")) {
      setError("Проверьте email: нужен символ @.");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone,
          email,
          message: formData.get("message"),
          source,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={`vs-form ${compact ? "vs-form--compact" : ""}`} onSubmit={handleSubmit}>
      <h3>{title}</h3>
      <input name="phone" type="tel" placeholder="Телефон *" required />
      <input name="name" type="text" placeholder="Имя" />
      <input name="email" type="email" placeholder="Email" />
      {!compact && <textarea name="message" placeholder="Сообщение" rows={4} />}
      <p className="vs-form__policy">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <Link href={SITE.privacy}>политикой конфиденциальности</Link>.
      </p>
      {error && <p className="vs-form__error">{error}</p>}
      {status === "success" && (
        <p className="vs-form__success">Спасибо, заявка отправлена. Мы свяжемся с вами в течение 24 часов.</p>
      )}
      {status === "error" && <p className="vs-form__error">Не получилось отправить заявку. Попробуйте ещё раз.</p>}
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Отправляем..." : submitLabel}
      </button>
    </form>
  );
}
