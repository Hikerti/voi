"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/constants";

const LABELS: Record<string, string> = {
  services: "Услуги",
  portfolio: "Работы",
  reviews: "Отзывы",
  faq: "Вопросы и ответы",
  blog: "Статьи",
  news: "Новости",
  contacts: "Контакты",
  "o-nas": "О студии",
  privacy: "Политика конфиденциальности",
  zayavka: "Оставить заявку",
  search: "Поиск",
};

function humanize(segment: string) {
  return LABELS[segment] || decodeURIComponent(segment).replace(/-/g, " ");
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0 || pathname === "/spasibo") return null;

  const items = [
    { label: "Главная", href: "/" },
    ...segments.map((segment, index) => ({
      label: humanize(segment),
      href: `/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE.baseUrl}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <ol>
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;
            return (
              <li key={item.href}>
                {isCurrent ? (
                  <span aria-current="page">{item.label}</span>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
