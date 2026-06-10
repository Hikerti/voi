import type { Metadata } from "next";
import SiteForm from "@/components/forms/SiteForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Оставить заявку | ${SITE.name}`,
  description: "Оставьте телефон, чтобы обсудить сайт, дизайн или развитие проекта с Voitov Studio.",
};

export default function LeadPage() {
  return (
    <main className="lead-page">
      <section className="lead-page__hero">
        <p className="vs-kicker">заявка</p>
        <h1>Расскажите, какой сайт нужен</h1>
        <p>
          Достаточно телефона. Если уже есть задача, сроки, референсы или старая
          версия сайта, добавьте это в сообщение — так первый разговор будет точнее.
        </p>
      </section>

      <section className="lead-page__layout">
        <div className="lead-page__signal" aria-hidden="true">
          <span>24</span>
          <strong>часа на первый ответ</strong>
          <i />
          <em>бриф, оценка, следующий шаг</em>
        </div>
        <SiteForm source="lead-page" title="Обсудить проект" />
      </section>
    </main>
  );
}
