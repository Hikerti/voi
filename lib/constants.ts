export const SITE = {
  name: "Voitov Studio",
  tagline: "Нешаблонные сайты с вау-эффектом",
  description:
    "Креативная веб-студия: лендинги, сайты услуг, айдентика и цифровые воронки для бизнеса, который хочет выглядеть сильнее конкурентов.",
  baseUrl: "https://voitov.studio",
  phone: "+7 (995) 903-91-61",
  phoneHref: "tel:+79959039161",
  email: "hello@voitov.studio",
  emailHref: "mailto:hello@voitov.studio",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  whatsapp: "https://api.whatsapp.com/send?phone=79959039161",
  telegram: "https://t.me/",
  spasibo: "/spasibo",
  privacy: "/privacy",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Работы" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Статьи" },
  { href: "/contacts", label: "Контакты" },
] as const;

export const FOOTER_NAV = [
  { href: "/o-nas", label: "О нас" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Работы" },
  { href: "/news", label: "Новости" },
  { href: "/blog", label: "Статьи" },
  { href: "/privacy", label: "Политика конфиденциальности" },
] as const;
