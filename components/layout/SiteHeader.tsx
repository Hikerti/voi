"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useMenu } from "./MenuProvider";
import MenuToggle from "./MenuToggle";

export default function SiteHeader() {
  const pathname = usePathname();
  const { isOpen, toggle } = useMenu();

  return (
    <header className="vs-site-header">
      <Link href="/" className="vs-site-header__brand" aria-label={`${SITE.name} — главная`}>
        <img src="/logo.png" alt="Voitov Studio" width="150" height="42" />
      </Link>

      <nav className="vs-site-header__nav" aria-label="Основная навигация">
        {NAV_LINKS.filter((item) => item.href !== "/").slice(0, 5).map((item) => {
          const isCurrent = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return isCurrent ? (
            <span key={item.href} className="is-active" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="vs-site-header__actions">
        <form className="site-search site-search--header" action="/search" role="search">
          <label htmlFor="site-search-header">Поиск по сайту</label>
          <input id="site-search-header" name="q" type="search" placeholder="Поиск" minLength={2} required />
          <button type="submit">Найти</button>
        </form>
        <Link className="site-search-link" href="/search" aria-label="Открыть поиск по сайту">
          Поиск
        </Link>
        <a className="site-header-phone" href={SITE.phoneHref} aria-label={`Позвонить: ${SITE.phone}`}>
          {SITE.phone}
        </a>
        <MenuToggle isOpen={isOpen} onToggle={toggle} />
      </div>
    </header>
  );
}
