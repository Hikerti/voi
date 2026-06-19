"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SERVICE_CATALOG_NAV, type NavigationItem } from "@/lib/navigation";

function containsPath(item: NavigationItem, pathname: string): boolean {
  if (pathname === item.href) return true;
  return item.children?.some((child) => containsPath(child, pathname)) ?? false;
}

function CurrentAwareLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavigationItem;
  pathname: string;
  onNavigate: () => void;
}) {
  if (pathname === item.href) {
    return (
      <span className="catalog-menu__current" aria-current="page">
        {item.label}
      </span>
    );
  }

  return (
    <Link className="catalog-menu__link" href={item.href} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export default function ServiceCatalogSidebar() {
  const pathname = usePathname();
  const activeBranch =
    SERVICE_CATALOG_NAV.find((item) => containsPath(item, pathname))?.href ?? null;
  const [catalogOpen, setCatalogOpen] = useState(true);
  const [expandedBranch, setExpandedBranch] = useState<string | null>(activeBranch);

  useEffect(() => {
    if (activeBranch) setExpandedBranch(activeBranch);
  }, [activeBranch]);

  const closeAfterNavigate = () => {
    if (window.matchMedia("(max-width: 980px)").matches) setCatalogOpen(false);
  };

  return (
    <div className={`service-catalog-fixed${catalogOpen ? " is-open" : ""}`}>
      <button
        type="button"
        className="service-catalog-fixed__toggle"
        aria-expanded={catalogOpen}
        aria-controls="service-catalog-fixed-panel"
        onClick={() => setCatalogOpen((open) => !open)}
      >
        <span>Каталог услуг</span>
        <span className="service-catalog-fixed__chevron" aria-hidden="true" />
      </button>

      <aside
        id="service-catalog-fixed-panel"
        className="service-catalog-fixed__panel"
        aria-label="Каталог услуг"
        aria-hidden={!catalogOpen}
      >
        <nav aria-label="Разделы каталога услуг">
          <ul className="catalog-menu__list">
            <li className={pathname === "/services" ? "is-current" : ""}>
              <CurrentAwareLink
                item={{ href: "/services", label: "Все услуги" }}
                pathname={pathname}
                onNavigate={closeAfterNavigate}
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
                    "catalog-menu__branch",
                    branchActive ? "is-active" : "",
                    branchExpanded ? "is-expanded" : "",
                    pathname === item.href ? "is-current" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="catalog-menu__row">
                    <CurrentAwareLink
                      item={item}
                      pathname={pathname}
                      onNavigate={closeAfterNavigate}
                    />
                    {hasChildren && (
                      <button
                        type="button"
                        aria-expanded={branchExpanded}
                        aria-label={`${branchExpanded ? "Свернуть" : "Развернуть"} ${item.label}`}
                        onClick={() =>
                          setExpandedBranch((current) =>
                            current === item.href && !branchActive ? null : item.href,
                          )
                        }
                      >
                        <span aria-hidden="true">›</span>
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <ul className="catalog-menu__children">
                      {item.children!.map((child) => (
                        <li
                          key={child.href}
                          className={pathname === child.href ? "is-current" : ""}
                        >
                          <CurrentAwareLink
                            item={child}
                            pathname={pathname}
                            onNavigate={closeAfterNavigate}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
