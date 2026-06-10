import type { Metadata } from "next";
import SiteForm from "@/components/forms/SiteForm";
import { SITE } from "@/lib/constants";

const BRIEF_POINTS = [
  "формат сайта",
  "сроки и бюджет",
  "референсы",
  "что уже есть",
];

export const metadata: Metadata = {
  title: `Оставить заявку | ${SITE.name}`,
  description: "Оставьте телефон, чтобы обсудить сайт, дизайн или развитие проекта с Voitov Studio.",
};

export default function LeadPage() {
  return (
    <main className="lead-page">
      <section className="lead-page__hero">
        <div className="lead-page__copy">
          <p className="vs-kicker">заявка</p>
          <h1>Расскажите, какой сайт нужен</h1>
          <p>
            Достаточно телефона и пары фраз о задаче. Мы уточним формат,
            оценим следующий шаг и соберём понятный план запуска.
          </p>
        </div>

        <div className="lead-page__brief" aria-label="Что можно указать в заявке">
          {BRIEF_POINTS.map((point, index) => (
            <span key={point}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              {point}
            </span>
          ))}
        </div>
      </section>

      <section className="lead-page__layout">
        <div className="lead-page__signal">
          <span>24ч</span>
          <strong>на первый ответ</strong>
          <i />
          <em>бриф, оценка, следующий шаг</em>
          <p>
            Если уже есть сроки, референсы или старая версия сайта — добавьте
            это в сообщение. Так первый разговор будет точнее.
          </p>
        </div>
        <SiteForm source="lead-page" title="Обсудить проект" />
      </section>
    </main>
  );
}
