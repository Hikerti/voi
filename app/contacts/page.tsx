import type { Metadata } from "next";
import SiteForm from "@/components/forms/SiteForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Контакты | ${SITE.name}`,
  description: "Контакты Voitov Studio: телефон, email и форма заявки на сайт.",
};

export default function ContactsPage() {
  return (
      <main className="contacts-page">
        <section className="contacts-page__hero">
          <p className="vs-kicker">контакты</p>
          <h1>Обсудить сайт, дизайн или развитие проекта</h1>
          <p>
            Напишите или оставьте заявку. Достаточно телефона, а детали проекта,
            референсы и сроки можно добавить в сообщение.
          </p>
        </section>

        <section className="contacts-page__layout">
          <div className="contacts-page__panel">
            <span>01</span>
            <h2>Прямой контакт</h2>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={SITE.emailHref}>{SITE.email}</a>
            <p>Ответим, уточним задачу и предложим ближайший понятный шаг.</p>
          </div>
          <div className="contacts-page__signal" aria-hidden="true">
            <span>site</span>
            <span>seo</span>
            <span>brand</span>
            <span>support</span>
          </div>
          <SiteForm source="contacts" title="Оставить заявку" />
        </section>
      </main>
  );
}
