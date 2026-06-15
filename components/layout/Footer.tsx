import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/constants";

const SOCIAL_LINKS = [
  { label: "Telegram", href: SITE.telegram },
  { label: "WhatsApp", href: SITE.whatsapp },
  { label: "VK", href: SITE.vk },
  { label: "MAX", href: SITE.max },
].filter((item): item is { label: string; href: string } => Boolean(item.href));

export default function Footer() {
  const hasRequisites = Boolean(SITE.inn || SITE.ogrn);

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
            {SITE.secondaryPhone && SITE.secondaryPhoneHref && (
              <a href={SITE.secondaryPhoneHref}>{SITE.secondaryPhone}</a>
            )}
            <a href={SITE.emailHref}>{SITE.email}</a>
            <span>{SITE.workHours}</span>
            <span>{SITE.address}</span>
          </address>
          {SOCIAL_LINKS.length > 0 && (
            <div className="site-footer__socials" aria-label="Социальные сети и мессенджеры">
              {SOCIAL_LINKS.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} {SITE.name}. Все права защищены.</p>
        {hasRequisites && <p>{[SITE.inn, SITE.ogrn].filter(Boolean).join(" · ")}</p>}
        <p>Информация на сайте не является публичной офертой.</p>
      </div>
    </footer>
  );
}
