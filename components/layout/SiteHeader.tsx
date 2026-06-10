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
        <span>Voitov</span>
        <span>Studio</span>
      </Link>
      <nav className="vs-site-header__nav" aria-label="Основная навигация">
        {NAV_LINKS.filter((item) => item.href !== "/").slice(0, 5).map((item) => (
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
        <MenuToggle isOpen={isOpen} onToggle={toggle} />
      </div>
    </header>
  );
}
