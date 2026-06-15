export const SITE = {
  name: "Voitov Studio",
  legalName: "Voitov Studio",
  tagline: "Нешаблонные сайты с вау-эффектом",
  description:
    "Креативная веб-студия: лендинги, сайты услуг, айдентика и цифровые воронки для бизнеса, который хочет выглядеть сильнее конкурентов.",
  baseUrl: "https://voitov.ru",
  phone: "+7 (995) 903-91-61",
  phoneHref: "tel:+79959039161",
  secondaryPhone: null,
  secondaryPhoneHref: null,
  email: "hello@voitov.studio",
  emailHref: "mailto:hello@voitov.studio",
  workHours: "Пн–Пт, 10:00–19:00",
  address: "Москва",
  inn: null,
  ogrn: null,
  instagram: null,
  facebook: null,
  vk: null,
  odnoklassniki: null,
  max: null,
  whatsapp: "https://api.whatsapp.com/send?phone=79959039161",
  telegram: null,
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
  { href: "/o-nas", label: "О студии" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Работы" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/faq", label: "Вопросы и ответы" },
  { href: "/news", label: "Новости" },
  { href: "/blog", label: "Статьи" },
  { href: "/contacts", label: "Контакты" },
  { href: "/privacy", label: "Политика конфиденциальности" },
] as const;
