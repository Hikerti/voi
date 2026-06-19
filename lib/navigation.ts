export interface NavigationItem {
  href: string;
  label: string;
  children?: readonly NavigationItem[];
}

export const SERVICE_CATALOG_NAV: readonly NavigationItem[] = [
  {
    href: "/services/sites",
    label: "Сайты",
    children: [
      { href: "/services/landing-page", label: "Лендинг под заявки" },
      { href: "/services/corporate-site", label: "Сайт компании" },
      { href: "/services/support", label: "Поддержка и развитие" },
    ],
  },
  {
    href: "/services/design",
    label: "Дизайн",
    children: [
      { href: "/services/brand-identity", label: "Айдентика и визуальная система" },
    ],
  },
  {
    href: "/services/strategy",
    label: "Стратегия",
    children: [
      { href: "/services/content-seo", label: "SEO-тексты и структура" },
    ],
  },
  {
    href: "/services/marketing",
    label: "Маркетинг",
    children: [
      { href: "/services/seo-start", label: "SEO-старт" },
    ],
  },
  {
    href: "/services/digital",
    label: "Digital",
  },
] as const;

const PORTFOLIO_NAV: readonly NavigationItem[] = [
  { href: "/portfolio", label: "Все работы" },
  { href: "/portfolio/premium-olivko", label: "Premium Olivko" },
  { href: "/portfolio/izumrudnaya-dolina", label: "ЖК «Изумрудная долина»" },
  { href: "/portfolio/all-dates-box", label: "All Dates Box" },
  { href: "/portfolio/lesofaktura", label: "Лесофактура" },
  { href: "/portfolio/magic-people", label: "Magic People" },
] as const;

export const HEADER_NAVIGATION: readonly NavigationItem[] = [
  {
    href: "/services",
    label: "Услуги",
    children: SERVICE_CATALOG_NAV,
  },
  {
    href: "/portfolio",
    label: "Работы",
    children: PORTFOLIO_NAV,
  },
  { href: "/reviews", label: "Отзывы" },
  { href: "/faq", label: "FAQ" },
  {
    href: "/blog",
    label: "Статьи",
    children: [
      { href: "/blog", label: "Все статьи" },
      { href: "/news", label: "Новости" },
    ],
  },
] as const;

export function isNavigationItemActive(item: NavigationItem, pathname: string): boolean {
  if (pathname === item.href) return true;
  if (item.href !== "/" && pathname.startsWith(`${item.href}/`)) return true;
  return item.children?.some((child) => isNavigationItemActive(child, pathname)) ?? false;
}
