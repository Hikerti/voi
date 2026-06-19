"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HEADER_NAVIGATION,
  isNavigationItemActive,
  type NavigationItem,
} from "@/lib/navigation";

function normalizePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function HeaderMenuItem({ item, depth = 0 }: { item: NavigationItem; depth?: number }) {
  const pathname = normalizePath(usePathname());
  const hasChildren = Boolean(item.children?.length);
  const isExact = pathname === normalizePath(item.href);
  const isActive = isNavigationItemActive(item, pathname);

  return (
    <li
      className={[
        "header-nav__item",
        hasChildren ? "has-children" : "",
        isActive ? "is-active" : "",
        depth > 0 ? "header-nav__item--nested" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Link
        href={item.href}
        aria-current={isExact ? "page" : undefined}
        aria-haspopup={hasChildren ? "menu" : undefined}
      >
        <span>{item.label}</span>
        {hasChildren && <i className="header-nav__chevron" aria-hidden="true" />}
      </Link>

      {hasChildren && (
        <ul
          className={depth === 0 ? "header-nav__dropdown" : "header-nav__dropdown header-nav__dropdown--nested"}
          role="menu"
        >
          {item.children!.map((child) => (
            <HeaderMenuItem key={child.href} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function HeaderNavigation() {
  return (
    <nav className="vs-site-header__nav header-nav" aria-label="Основная навигация">
      <ul className="header-nav__list">
        {HEADER_NAVIGATION.map((item) => (
          <HeaderMenuItem key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  );
}
