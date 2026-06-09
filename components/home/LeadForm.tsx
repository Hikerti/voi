"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/constants";

interface LeadFormProps {
  variant: "compact" | "full";
}

export default function LeadForm({ variant }: LeadFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: get("name"), phone: get("phone") }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setTimeout(() => router.push(SITE.spasibo), 600);
    } catch {
      setStatus("err");
    }
  }

  if (variant === "compact") {
    return (
      <section style={{
        position: "relative",
        backgroundImage: "url('/images/karta-mira-kontinent-stena-seryi-fon-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#111",
        overflow: "hidden",
      }}>
        {/* dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 100%)",
          zIndex: 0,
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 40px",
          display: "flex",
          alignItems: "center",
          gap: 60,
          flexWrap: "wrap",
        }}>
          {/* left: copy */}
          <div style={{ flex: "1 1 360px", minWidth: 260 }}>
            <div style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 4,
              padding: "4px 12px",
              marginBottom: 20,
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#bbb",
              fontFamily: "Jura, sans-serif",
            }}>
              Начнём работу
            </div>
            <h2 style={{
              fontFamily: "Russo One, sans-serif",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              lineHeight: 1.2,
              color: "#fff",
              margin: "0 0 20px",
              fontWeight: 400,
            }}>
              Понравились примеры?<br />
              <span style={{ color: "#e0e0e0" }}>Давайте обсудим ваш&nbsp;проект!</span>
            </h2>
            <p style={{
              fontFamily: "Jura, sans-serif",
              fontSize: 15,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              maxWidth: 440,
            }}>
              Отправьте запрос на расчёт стоимости проекта, чтобы обсудить задачу
              и получить оптимальное предложение исходя из ваших потребностей.
            </p>

            <div style={{
              display: "flex", gap: 32, marginTop: 40,
              flexWrap: "wrap",
            }}>
              {[["24ч", "Ответим в течение суток"], ["100%", "Бесплатная консультация"]].map(([val, label]) => (
                <div key={val}>
                  <div style={{ fontFamily: "Russo One, sans-serif", fontSize: 22, color: "#fff" }}>{val}</div>
                  <div style={{ fontFamily: "Jura, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right: form card */}
          <div style={{ flex: "0 0 340px", minWidth: 280 }}>
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: "36px 32px",
              backdropFilter: "blur(16px)",
            }}>
              {status !== "ok" && status !== "err" ? (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Телефон *"
                    maxLength={256}
                    required
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: 8,
                      padding: "14px 16px",
                      color: "#fff",
                      fontSize: 15,
                      fontFamily: "Jura, sans-serif",
                      outline: "none",
                      transition: "border-color 0.2s",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  <input
                    name="name"
                    type="text"
                    placeholder="Имя"
                    maxLength={256}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: 8,
                      padding: "14px 16px",
                      color: "#fff",
                      fontSize: 15,
                      fontFamily: "Jura, sans-serif",
                      outline: "none",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  <p style={{
                    fontFamily: "Jura, sans-serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    margin: "2px 0",
                    lineHeight: 1.5,
                  }}>
                    Заполняя форму, вы соглашаетесь с политикой&nbsp;
                    <a href="/privacy" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>
                      конфиденциальности
                    </a>
                  </p>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      background: status === "loading"
                        ? "rgba(255,255,255,0.15)"
                        : "linear-gradient(135deg, #e8e8e8 0%, #c0c0c0 100%)",
                      color: status === "loading" ? "rgba(255,255,255,0.6)" : "#111",
                      border: "none",
                      borderRadius: 8,
                      padding: "15px 24px",
                      fontSize: 14,
                      fontFamily: "Russo One, sans-serif",
                      letterSpacing: "0.06em",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      textTransform: "uppercase",
                      marginTop: 6,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {status === "loading" ? "Отправляем..." : "Отправить заявку"}
                  </button>
                </form>
              ) : status === "ok" ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
                  <div style={{ fontFamily: "Russo One, sans-serif", fontSize: 18, color: "#fff", marginBottom: 8 }}>
                    Заявка отправлена!
                  </div>
                  <div style={{ fontFamily: "Jura, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
                    Мы свяжемся с вами в ближайшее время
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontFamily: "Jura, sans-serif", fontSize: 14, color: "rgba(255,100,100,0.9)" }}>
                    Что-то пошло не так. Попробуйте ещё раз.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="div-block-58">
      <div className="w-row">
        <div className="column-12 w-col w-col-7">
          <h1 className="heading-48">
            Мы работаем с проектами совершенно разного уровня — и с небольшими
            магазинами/интернет-стартапами, и с крупными брендами. В каждом случае мы
            выбираем набор инструментов и бюджет, которые позволяют решить конкретную
            задачу развития бизнеса с выгодой для клиента.
          </h1>
          <h1 className="heading-49">Давайте обсудим ваш проект?</h1>
          <p className="paragraph-321">
            Отправьте запрос на расчёт стоимости проекта, чтобы{" "}
            обсудить задачу и получить оптимальное предложение{" "}
            исходя из Ваших потребностей
          </p>
        </div>
        <div className="column-11 w-col w-col-5">
          <div className="form-block-25 w-form">
            {status !== "ok" && status !== "err" ? (
              <form className="form-3" onSubmit={handleSubmit}>
                <label className="field-label-3">Name</label>
                <input
                  className="text-field-5 w-input"
                  name="name"
                  placeholder="Имя"
                  type="text"
                  maxLength={256}
                />
                <label className="field-label-4">Email Address</label>
                <input
                  className="text-field-6 w-input"
                  name="phone"
                  placeholder="+7 ( ___ ) ___-__-__"
                  type="tel"
                  maxLength={256}
                  required
                />
                <input
                  type="submit"
                  className="submit-button-3 w-button"
                  value={status === "loading" ? "Отправляем..." : "Отправить"}
                  disabled={status === "loading"}
                />
              </form>
            ) : status === "ok" ? (
              <div className="w-form-done" style={{ display: "block" }}>
                <div>Спасибо!</div>
              </div>
            ) : (
              <div className="w-form-fail" style={{ display: "block" }}>
                <div>Ошибка. Попробуйте ещё раз.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
