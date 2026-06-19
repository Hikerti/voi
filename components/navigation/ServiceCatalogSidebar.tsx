"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SERVICE_CATALOG_NAV, type NavigationItem } from "@/lib/navigation";

function containsPath(item: NavigationItem, pathname: string): boolean {
  if (pathname === item.href) return true;
  return item.children?.some((child) => containsPath(child, pathname)) ?? false;
}

function CurrentAwareLink({ item, pathname }: { item: NavigationItem; pathname: string }) {
  if (pathname === item.href) {
    return (
      <span className="service-sidebar__current" aria-current="page">
        {item.label}
      </span>
    );
  }

  return <Link href={item.href}>{item.label}</Link>;
}

export default function ServiceCatalogSidebar() {
  const pathname = usePathname();
  const activeBranch = useMemo(
    () => SERVICE_CATALOG_NAV.find((item) => containsPath(item, pathname))?.href ?? null,
    [pathname],
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedBranch, setExpandedBranch] = useState<string | null>(activeBranch);

  useEffect(() => {
    setExpandedBranch(activeBranch);
    setDrawerOpen(false);
  }, [activeBranch, pathname]);

  return (
    <>
      <button
        type="button"
        className="service-sidebar-toggle"
        aria-expanded={drawerOpen}
        aria-controls="service-catalog-sidebar"
        onClick={() => setDrawerOpen((open) => !open)}
      >
        <span>Каталог услуг</span>
        <span aria-hidden="true">{drawerOpen ? "Закрыть" : "Открыть"}</span>
      </button>

      {drawerOpen && (
        <button
          type="button"
          className="service-sidebar-backdrop"
          aria-label="Закрыть каталог услуг"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <aside
        id="service-catalog-sidebar"
        className={`service-sidebar${drawerOpen ? " is-open" : ""}`}
        aria-label="Каталог услуг"
      >
        <div className="service-sidebar__inner">
          <div className="service-sidebar__head">
            <p>Каталог услуг</p>
            <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Закрыть меню">
              ×
            </button>
          </div>

          <nav aria-label="Разделы каталога услуг">
            <ul className="service-sidebar__list">
              <li className={pathname === "/services" ? "is-current" : ""}>
                <CurrentAwareLink
                  item={{ href: "/services", label: "Все услуги" }}
                  pathname={pathname}
                />
              </li>

              {SERVICE_CATALOG_NAV.map((item) => {
                const branchActive = containsPath(item, pathname);
                const branchExpanded = expandedBranch === item.href || branchActive;
                const hasChildren = Boolean(item.children?.length);

                return (
                  <li
                    key={item.href}
                    className={[
                      "service-sidebar__branch",
                      branchActive ? "is-active" : "",
                      branchExpanded ? "is-expanded" : "",
                      pathname === item.href ? "is-current" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="service-sidebar__row">
                      <CurrentAwareLink item={item} pathname={pathname} />
                      {hasChildren && (
                        <button
                          type="button"
                          aria-expanded={branchExpanded}
                          aria-label={`${branchExpanded ? "Свернуть" : "Развернуть"} ${item.label}`}
                          onClick={() =>
                            setExpandedBranch((current) =>
                              current === item.href ? null : item.href,
                            )
                          }
                        >
                          <span aria-hidden="true">›</span>
                        </button>
                      )}
                    </div>

                    {hasChildren && (
                      <ul className="service-sidebar__children">
                        {item.children!.map((child) => (
                          <li
                            key={child.href}
                            className={pathname === child.href ? "is-current" : ""}
                          >
                            <CurrentAwareLink item={child} pathname={pathname} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
