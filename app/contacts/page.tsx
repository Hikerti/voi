import type { Metadata } from "next";
import SiteForm from "@/components/forms/SiteForm";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Контакты веб-студии",
  description: "Телефоны, email, график работы и форма связи с Voitov Studio.",
  path: "/contacts",
  keywords: ["контакты веб-студии", "заказать сайт Москва"],
});

export default function ContactsPage() {
  return (
    <main className="contacts-page">
      <section className="contacts-page__hero">
        <p className="section-kicker">контакты</p>
        <h1>Обсудить сайт, дизайн или развитие проекта</h1>
        <p>
          Напишите или оставьте заявку. Контактные и юридические данные ниже временные —
          заменим их после подтверждения заказчиком.
        </p>
      </section>

      <section className="contacts-page__layout" aria-labelledby="contacts-details-title">
        <div className="contacts-page__panel">
          <p className="section-kicker">прямой контакт</p>
          <h2 id="contacts-details-title">Как связаться</h2>
          <dl className="contact-details">
            <div><dt>Компания</dt><dd>{SITE.legalName}</dd></div>
            <div><dt>Телефон</dt><dd><a href={SITE.phoneHref}>{SITE.phone}</a></dd></div>
            <div><dt>Дополнительный телефон</dt><dd><a href={SITE.secondaryPhoneHref}>{SITE.secondaryPhone}</a></dd></div>
            <div><dt>Email</dt><dd><a href={SITE.emailHref}>{SITE.email}</a></dd></div>
            <div><dt>График</dt><dd>{SITE.workHours}</dd></div>
            <div><dt>Адрес</dt><dd>{SITE.address}</dd></div>
            <div><dt>Реквизиты</dt><dd>{SITE.inn}<br />{SITE.ogrn}</dd></div>
          </dl>
          <div className="contact-socials">
            <a href={SITE.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={SITE.vk} target="_blank" rel="noopener noreferrer">VK</a>
            <a href={SITE.max} target="_blank" rel="noopener noreferrer">MAX</a>
          </div>
        </div>

        <div className="contacts-page__map-placeholder" role="img" aria-label="Место для карты Яндекс">
          <span>Яндекс Карта</span>
          <p>Подключим после подтверждения точного адреса и карточки организации.</p>
        </div>

        <SiteForm source="contacts" title="Напишите нам" variant="contact" />
      </section>
    </main>
  );
}
