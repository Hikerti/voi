import SiteForm from "@/components/forms/SiteForm";
import { SITE } from "@/lib/constants";

export default function ContactsContent() {
  return (
    <main className="contacts-page contacts-page--clean">
      <section className="contacts-page__hero">
        <div className="contacts-page__hero-copy">
          <p className="section-kicker">контакты</p>
          <h1>Обсудить сайт, дизайн или развитие проекта</h1>
          <p>
            Напишите, позвоните или оставьте заявку. Отвечаем в рабочее время и начинаем
            с короткого уточнения задачи, сроков и готовых материалов.
          </p>
        </div>
      </section>

      <section className="contacts-page__layout" aria-labelledby="contacts-details-title">
        <div className="contacts-page__panel">
          <p className="section-kicker">прямой контакт</p>
          <h2 id="contacts-details-title">Как связаться</h2>
          <dl className="contact-details">
            <div><dt>Компания</dt><dd>{SITE.legalName}</dd></div>
            <div><dt>Телефон</dt><dd><a href={SITE.phoneHref}>{SITE.phone}</a></dd></div>
            {SITE.secondaryPhone && SITE.secondaryPhoneHref ? (
              <div><dt>Дополнительный телефон</dt><dd><a href={SITE.secondaryPhoneHref}>{SITE.secondaryPhone}</a></dd></div>
            ) : null}
            <div><dt>Email</dt><dd><a href={SITE.emailHref}>{SITE.email}</a></dd></div>
            <div><dt>График</dt><dd>{SITE.workHours}</dd></div>
            <div><dt>Город</dt><dd>{SITE.address}</dd></div>
            {SITE.inn ? <div><dt>ИНН</dt><dd>{SITE.inn}</dd></div> : null}
            {SITE.ogrn ? <div><dt>ОГРН</dt><dd>{SITE.ogrn}</dd></div> : null}
          </dl>
          <div className="contact-socials" aria-label="Мессенджеры">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>

        <SiteForm source="contacts" title="Напишите нам" variant="contact" />

        <div className="contacts-page__map-placeholder" role="img" aria-label="Voitov Studio работает в Москве и онлайн">
          <span>{SITE.address}</span>
          <p>Работаем с проектами удалённо и проводим созвоны по предварительной договорённости.</p>
        </div>
      </section>
    </main>
  );
}
