import Link from "next/link";
import { SITE, FOOTER_NAV } from "@/lib/constants";

export default function Footer() {
  return (
    <>
      <link rel="stylesheet" href="/css/final-corrections.css" />
      <div className="shapkavniz">
        <div className="shapka-para">
          <div className="w-row">
            <div className="column-14 w-clearfix w-col w-col-4">
              <div className="footer-logo-wrap">
                <Link href="/" className="footer-logo-link" aria-label={`${SITE.name} — главная`}>
                  <img src="/logo.png" alt="Voitov Studio" width="180" height="50" />
                </Link>
                <p className="footer-logo-tag">{SITE.tagline}</p>
              </div>
              <div className="div-block-26 w-clearfix">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-block-8 w-inline-block"
                />
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-block-9 w-inline-block"
                />
              </div>
            </div>

            <div className="column-13 w-col w-col-8">
              <ul role="list" className="list-4">
                {FOOTER_NAV.map((item) => (
                  <li key={item.href} className="list-item-3">
                    <Link href={item.href} className="link-4">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="div-block-60 w-clearfix">
                <a href={SITE.phoneHref} className="link-7">
                  {SITE.phone}
                </a>
                <a href={SITE.emailHref} className="link-8">
                  {SITE.email}
                </a>
              </div>

              <div className="div-block-74 w-clearfix">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-block-23 w-inline-block"
                  aria-label="WhatsApp"
                />
                <a
                  href={SITE.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-block-24 w-inline-block"
                  aria-label="Telegram"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
