"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { trackGoal } from "@/lib/analytics";
import { SITE } from "@/lib/constants";

type FormVariant = "general" | "contact" | "callback" | "review" | "question";
type FieldName = "name" | "phone" | "email" | "message" | "consent";
type FieldErrors = Partial<Record<FieldName, string>>;

interface SiteFormProps {
  title?: string;
  submitLabel?: string;
  source: string;
  compact?: boolean;
  variant?: FormVariant;
}

type LeadPayload = {
  name: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  message: FormDataEntryValue | null;
  company: FormDataEntryValue | null;
  consent: boolean;
  source: string;
  pageUrl: string;
  startedAt: string;
};

const SUCCESS_MESSAGES: Record<FormVariant, string> = {
  general: "Спасибо, заявка отправлена. Мы свяжемся с вами в течение 24 часов.",
  contact: "Сообщение отправлено. Ответим по указанным контактам.",
  callback: "Заявка на обратный звонок отправлена. Мы свяжемся с вами в рабочее время.",
  review: "Ваш отзыв отправлен и появится после проверки.",
  question: "Ваш вопрос отправлен. Ответ мы пришлём по почте.",
};

const SUCCESS_TITLES: Record<FormVariant, string> = {
  general: "Заявка принята",
  contact: "Сообщение отправлено",
  callback: "Звонок запланирован",
  review: "Спасибо за отзыв",
  question: "Вопрос отправлен",
};

const FALLBACK_ERROR = "Не удалось отправить форму. Повторите попытку позже или позвоните нам.";

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

function directLeadEndpoint(variant: FormVariant) {
  if (variant === "review") return "/api/leads/review";
  if (variant === "question") return "/api/leads/question";
  if (variant === "callback") return "/api/leads/callback";
  return "/api/leads/contact";
}

function formEndpoints(variant: FormVariant) {
  return ["/submit-lead/", "/api/contact/", directLeadEndpoint(variant)];
}

async function responseError(response: Response) {
  const data = (await response.json().catch(() => null)) as
    | { error?: string; message?: string | string[] }
    | null;
  const message = Array.isArray(data?.message) ? data.message.join(" ") : data?.message;
  return data?.error?.trim() || message?.trim() || FALLBACK_ERROR;
}

async function submitLead(payload: LeadPayload, variant: FormVariant) {
  const endpoints = formEndpoints(variant);
  let lastError = FALLBACK_ERROR;

  for (const [index, endpoint] of endpoints.entries()) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) return;

      lastError = await responseError(response);
      const isValidationError = response.status >= 400 && response.status < 500 && response.status !== 404;
      if (isValidationError || index === endpoints.length - 1) throw new Error(lastError);
    } catch (error) {
      lastError = error instanceof Error && error.message && error.message !== "Failed to fetch"
        ? error.message
        : FALLBACK_ERROR;

      if (index === endpoints.length - 1) throw new Error(lastError);
    }
  }

  throw new Error(lastError);
}

export default function SiteForm({
  title = "Оставить заявку",
  submitLabel = "Отправить",
  source,
  compact = false,
  variant = "general",
}: SiteFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const startedAtRef = useRef(new Date().toISOString());
  const consentRef = useRef<HTMLInputElement>(null);

  const showName = !compact || variant !== "general";
  const showPhone = variant === "general" || variant === "callback" || variant === "contact";
  const showEmail = variant === "contact" || variant === "review" || variant === "question" || (!compact && variant === "general");
  const showMessage = !compact && variant !== "callback";
  const nameRequired = variant !== "general";
  const phoneRequired = variant === "general" || variant === "callback";
  const emailRequired = variant === "contact" || variant === "question";
  const messageRequired = variant === "contact" || variant === "review" || variant === "question";
  const messageLabel = variant === "review" ? "Отзыв" : variant === "question" ? "Вопрос" : "Сообщение";
  const validationMessages = Array.from(new Set(Object.values(errors).filter(Boolean)));
  const successTitle = SUCCESS_TITLES[variant];
  const successMessage = SUCCESS_MESSAGES[variant];
  const consentId = `${source}-${variant}-consent`;

  function validate(formData: FormData) {
    const nextErrors: FieldErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const consent = formData.get("consent") === "on";

    if (nameRequired && name.length < 2) nextErrors.name = "Укажите имя.";
    if (phoneRequired && countDigits(phone) < 10) nextErrors.phone = "Укажите телефон, минимум 10 цифр.";
    if (phone && countDigits(phone) < 10) nextErrors.phone = "Проверьте номер телефона.";
    if (emailRequired && !email.includes("@")) nextErrors.email = "Укажите корректный email.";
    if (email && !email.includes("@")) nextErrors.email = "Проверьте email: нужен символ @.";
    if (messageRequired && message.length < 5) nextErrors.message = `Заполните поле «${messageLabel}».`;
    if (!consent) nextErrors.consent = "Подтвердите согласие на обработку данных.";

    return nextErrors;
  }

  function handleConsentChange(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    setConsentChecked(checked);
    setServerError("");

    if (status === "error") setStatus("idle");

    if (checked) {
      setErrors((current) => {
        if (!current.consent) return current;
        const { consent: _consent, ...rest } = current;
        return rest;
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setServerError("");
      setStatus("idle");

      if (nextErrors.consent) {
        window.requestAnimationFrame(() => consentRef.current?.focus());
      }
      return;
    }

    setErrors({});
    setServerError("");
    setStatus("loading");

    const payload: LeadPayload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      company: formData.get("company"),
      consent: formData.get("consent") === "on",
      source: `${variant}-${source}`,
      pageUrl: window.location.href,
      startedAt: startedAtRef.current,
    };

    try {
      await submitLead(payload, variant);
      form.reset();
      setConsentChecked(false);
      startedAtRef.current = new Date().toISOString();
      setStatus("success");
      trackGoal("lead_form_submit", { source, variant });
    } catch (error) {
      setStatus("error");
      setServerError(error instanceof Error && error.message ? error.message : FALLBACK_ERROR);
    }
  }

  return (
    <>
      <form
        className={`vs-form vs-form--${variant} ${compact ? "vs-form--compact" : ""}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset disabled={status === "loading"}>
          <legend>{title}</legend>

          {validationMessages.length > 0 && (
            <div className="vs-form__error-summary" role="alert">
              <strong>Проверьте форму</strong>
              <ul>
                {validationMessages.map((message) => <li key={message}>{message}</li>)}
              </ul>
            </div>
          )}

          <div className="vs-form__honeypot" aria-hidden="true">
            <label htmlFor={`${source}-company`}>Компания</label>
            <input id={`${source}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {showName && (
            <label className="vs-form__field">
              <span>Имя{nameRequired ? " *" : ""}</span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${source}-name-error` : undefined}
                required={nameRequired}
              />
              {errors.name && <small id={`${source}-name-error`}>{errors.name}</small>}
            </label>
          )}

          {showPhone && (
            <label className="vs-form__field">
              <span>Телефон{phoneRequired ? " *" : ""}</span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? `${source}-phone-error` : undefined}
                required={phoneRequired}
              />
              {errors.phone && <small id={`${source}-phone-error`}>{errors.phone}</small>}
            </label>
          )}

          {showEmail && (
            <label className="vs-form__field">
              <span>Email{emailRequired ? " *" : ""}</span>
              <input
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${source}-email-error` : undefined}
                required={emailRequired}
              />
              {errors.email && <small id={`${source}-email-error`}>{errors.email}</small>}
            </label>
          )}

          {showMessage && (
            <label className="vs-form__field">
              <span>{messageLabel}{messageRequired ? " *" : ""}</span>
              <textarea
                name="message"
                rows={5}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${source}-message-error` : undefined}
                required={messageRequired}
              />
              {errors.message && <small id={`${source}-message-error`}>{errors.message}</small>}
            </label>
          )}

          <label className="vs-form__consent" htmlFor={consentId}>
            <input
              ref={consentRef}
              id={consentId}
              name="consent"
              type="checkbox"
              checked={consentChecked}
              onChange={handleConsentChange}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? `${consentId}-error` : undefined}
              required
            />
            <span>
              Нажимая кнопку «{submitLabel}», я даю согласие на обработку персональных данных и принимаю{" "}
              <Link href={SITE.privacy}>политику конфиденциальности</Link>.
            </span>
          </label>
          {errors.consent && <small id={`${consentId}-error`} className="vs-form__field-error">{errors.consent}</small>}

          <div className="vs-form__status" aria-live="polite">
            {status === "success" && <p className="vs-form__success">{successMessage}</p>}
            {status === "error" && <p className="vs-form__error" role="alert">{serverError}</p>}
          </div>

          <button type="submit">
            {status === "loading" ? "Отправляем..." : submitLabel}
          </button>
        </fieldset>
      </form>

      {status === "success" && (
        <div className="vs-form__success-dialog" role="dialog" aria-modal="true" aria-labelledby={`${source}-success-title`}>
          <div className="vs-form__success-card">
            <h2 id={`${source}-success-title`}>{successTitle}</h2>
            <p>{successMessage}</p>
            <div className="vs-form__success-actions">
              <button type="button" onClick={() => setStatus("idle")}>Закрыть</button>
              <Link className="button button--accent" href="/">На главную</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
