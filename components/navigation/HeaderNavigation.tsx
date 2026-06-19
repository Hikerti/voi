"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HEADER_NAVIGATION,
  isNavigationItemActive,
  type NavigationItem,
} from "@/lib/navigation";

function normalizePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

interface HeaderMenuItemProps {
  item: NavigationItem;
  pathname: string;
  onNavigate: () => void;
  depth?: number;
}

function HeaderMenuItem({
  item,
  pathname,
  onNavigate,
  depth = 0,
}: HeaderMenuItemProps) {
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
        onClick={(event) => {
          event.currentTarget.blur();
          onNavigate();
        }}
      >
        <span>{item.label}</span>
        {hasChildren && <i className="header-nav__chevron" aria-hidden="true" />}
      </Link>

      {hasChildren && (
        <ul
          className={
            depth === 0
              ? "header-nav__dropdown"
              : "header-nav__dropdown header-nav__dropdown--nested"
          }
          role="menu"
        >
          {item.children!.map((child) => (
            <HeaderMenuItem
              key={child.href}
              item={child}
              pathname={pathname}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function HeaderNavigation() {
  const pathname = normalizePath(usePathname());
  const [menusSuppressed, setMenusSuppressed] = useState(false);

  useEffect(() => {
    setMenusSuppressed(true);
  }, [pathname]);

  return (
    <nav
      className={`vs-site-header__nav header-nav${menusSuppressed ? " is-suppressed" : ""}`}
      aria-label="Основная навигация"
      onPointerEnter={() => setMenusSuppressed(false)}
      onPointerLeave={() => setMenusSuppressed(false)}
      onFocusCapture={() => setMenusSuppressed(false)}
    >
      <ul className="header-nav__list">
        {HEADER_NAVIGATION.map((item) => (
          <HeaderMenuItem
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={() => setMenusSuppressed(true)}
          />
        ))}
      </ul>
    </nav>
  );
}
