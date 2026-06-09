"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useMenu } from "./MenuProvider";

export default function SiteHeader() {
  const pathname = usePathname();
  const { open } = useMenu();

  return (
    <header className="vs-site-header">
      <Link href="/" className="vs-site-header__brand" aria-label={`${SITE.name} — главная`}>
        <span>Voitov</span>
        <span>Studio</span>
      </Link>
      <nav className="vs-site-header__nav" aria-label="Основная навигация">
        {NAV_LINKS.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? "is-active" : ""}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="vs-site-header__actions">
        <button className="vs-site-header__cta" type="button" onClick={open}>
          Консультация
        </button>
        <button className="vs-site-header__menu" type="button" onClick={open}>
          Меню
        </button>
      </div>
    </header>
  );
}
