import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <Link href="/" aria-label={`${SITE.name} — главная`}>
            <img src="/logo.png" alt="Voitov Studio" width="180" height="50" />
          </Link>
          <p>{SITE.tagline}</p>
          <div className="site-footer__actions">
            <Link className="button button--accent" href="/zayavka">Напишите нам</Link>
            <Link className="button button--ghost" href="/zayavka?type=callback">Обратный звонок</Link>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label="Навигация в подвале">
          <h2>Разделы</h2>
          <ul>
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__contacts">
          <h2>Контакты</h2>
          <address>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={SITE.secondaryPhoneHref}>{SITE.secondaryPhone}</a>
            <a href={SITE.emailHref}>{SITE.email}</a>
            <span>{SITE.workHours}</span>
            <span>{SITE.address}</span>
          </address>
          <div className="site-footer__socials" aria-label="Социальные сети и мессенджеры">
            <a href={SITE.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={SITE.vk} target="_blank" rel="noopener noreferrer">VK</a>
            <a href={SITE.max} target="_blank" rel="noopener noreferrer">MAX</a>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} {SITE.name}. Все права защищены.</p>
        <p>{SITE.inn} · {SITE.ogrn}</p>
        <p>Информация на сайте не является публичной офертой.</p>
      </div>
    </footer>
  );
}
