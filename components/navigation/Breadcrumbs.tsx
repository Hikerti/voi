"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/constants";
import { FAQ_ITEMS, NEWS_ITEMS, SERVICES } from "@/lib/site-data";

const SECTION_LABELS: Record<string, string> = {
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
  sites: "Сайты",
  strategy: "Стратегия",
  design: "Дизайн",
  digital: "Digital",
  marketing: "Маркетинг",
};

const CONTENT_LABELS: Record<string, string> = {
  "izumrudnaya-dolina": "ЖК «Изумрудная долина»",
  lesofaktura: "Лесофактура",
  "premium-olivko": "Premium Olivko",
  "magic-people": "Magic People",
  "all-dates-box": "All Dates Box",
  "effektivnost-klyuchevykh-slov": "Эффективность ключевых слов",
  "seo-prodvizhenie-3-shaga": "SEO-продвижение: 3 шага",
  "vybor-domena-dlya-sayta": "Выбор домена для сайта",
  "can-start-without-final-design": "Можно ли начать без готового дизайна?",
  "will-there-be-admin": "Будет ли простая админка?",
  "what-if-no-content": "Что делать, если нет готовых текстов?",
  "seo-ready": "Будет ли сайт готов к SEO?",
  "mobile-experience": "Мобильная версия будет такой же выразительной?",
  "what-is-in-launch": "Что входит в запуск сайта?",
};

const DATA_LABELS: Record<string, string> = Object.fromEntries([
  ...SERVICES.map((item) => [item.slug, item.title]),
  ...FAQ_ITEMS.map((item) => [item.slug, item.question]),
  ...NEWS_ITEMS.map((item) => [item.slug, item.title]),
]);

function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function humanize(segment: string) {
  const decoded = decodeSegment(segment);
  const knownLabel = SECTION_LABELS[decoded] || DATA_LABELS[decoded] || CONTENT_LABELS[decoded];

  if (knownLabel) return knownLabel;

  return decoded
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (letter) => letter.toUpperCase());
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
    </>
  );
}
