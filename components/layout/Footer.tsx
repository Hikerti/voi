import Link from "next/link";
import SocialLinks from "@/components/social/SocialLinks";
import { FOOTER_NAV, SITE } from "@/lib/constants";

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
            <strong>{SITE.legalName}</strong>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={SITE.emailHref}>{SITE.email}</a>
            <span>{SITE.workHours}</span>
            <span>{SITE.address}</span>
            <span className="site-footer__visit-note">{SITE.visitNote}</span>
          </address>
          <SocialLinks className="site-footer__socials" />
        </div>
      </div>

      <div className="site-footer__divider" aria-hidden="true" />

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} {SITE.name}. Все права защищены.</p>
        <p>{SITE.legalName}</p>
        {hasRequisites && <p>ИНН {SITE.inn} · ОГРН {SITE.ogrn}</p>}
        <p>Информация на сайте не является публичной офертой.</p>
      </div>
    </footer>
  );
}
