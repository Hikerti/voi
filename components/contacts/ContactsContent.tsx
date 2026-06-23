import SiteForm from "@/components/forms/SiteForm";
import SocialLinks from "@/components/social/SocialLinks";
import { SITE } from "@/lib/constants";

const YANDEX_MAP_EMBED =
  "https://yandex.ru/map-widget/v1/?ll=37.5554%2C55.6559&z=16&pt=37.5554%2C55.6559%2Cpm2rdm";

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
          <p className="contacts-page__legal-name">
            <span>Полное наименование</span>
            <strong>{SITE.name}</strong>
          </p>
        </div>
      </section>

      <section className="contacts-page__layout" aria-labelledby="contacts-details-title">
        <div className="contacts-page__panel">
          <p className="section-kicker">прямой контакт</p>
          <h2 id="contacts-details-title">Как связаться</h2>
          <dl className="contact-details">
            <div><dt>Компания</dt><dd>{SITE.name}</dd></div>
            <div><dt>Юридическое наименование</dt><dd>{SITE.legalName}</dd></div>
            <div><dt>Телефон</dt><dd><a href={SITE.phoneHref}>{SITE.phone}</a></dd></div>
            <div><dt>Email</dt><dd><a href={SITE.emailHref}>{SITE.email}</a></dd></div>
            <div><dt>График</dt><dd>{SITE.workHours}</dd></div>
            <div>
              <dt>Адрес</dt>
              <dd>
                <a
                  className="contact-address-link"
                  href={SITE.addressHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

        <section className="contacts-page__map-card" aria-labelledby="contacts-map-title">
          <div className="contacts-page__map-frame">
            <iframe
              src={YANDEX_MAP_EMBED}
              title="Карта проезда к Voitov Studio"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="contacts-page__map-overlay">
            <div>
              <span className="contacts-page__map-label">Карта</span>
              <h2 id="contacts-map-title">{SITE.address}</h2>
              <p>{SITE.visitNote}</p>
            </div>

            <a
              className="contacts-page__route-button"
              href={SITE.addressHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SITE.address} — проложить маршрут в Яндекс Картах`}
            >
              Проложить маршрут ↗
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
