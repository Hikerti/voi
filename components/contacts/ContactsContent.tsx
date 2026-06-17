import SiteForm from "@/components/forms/SiteForm";
import SocialLinks from "@/components/social/SocialLinks";
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
            <div><dt>Email</dt><dd><a href={SITE.emailHref}>{SITE.email}</a></dd></div>
            <div><dt>График</dt><dd>{SITE.workHours}</dd></div>
            <div>
              <dt>Адрес</dt>
              <dd>
                <a href={SITE.addressHref} target="_blank" rel="noopener noreferrer">
                  {SITE.address}
                </a>
              </dd>
            </div>
            <div><dt>Перед визитом</dt><dd>{SITE.visitNote}</dd></div>
            <div><dt>MAX</dt><dd>{SITE.maxPhone}</dd></div>
            <div><dt>ИНН</dt><dd>{SITE.inn}</dd></div>
            <div><dt>ОГРН</dt><dd>{SITE.ogrn}</dd></div>
          </dl>
          <SocialLinks className="contact-socials" showLabels />
        </div>

        <SiteForm source="contacts" title="Напишите нам" variant="contact" />

        <a
          className="contacts-page__map-placeholder contacts-page__map-link"
          href={SITE.addressHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${SITE.address} — открыть в Яндекс Картах`}
        >
          <span>{SITE.address}</span>
          <p>{SITE.visitNote} Открыть адрес в Яндекс Картах.</p>
        </a>
      </section>
    </main>
  );
}
