export const SITE = {
  name: "Voitov Studio",
  legalName: "Voitov Studio — реквизиты уточняются",
  tagline: "Нешаблонные сайты с вау-эффектом",
  description:
    "Креативная веб-студия: лендинги, сайты услуг, айдентика и цифровые воронки для бизнеса, который хочет выглядеть сильнее конкурентов.",
  baseUrl: "https://voitov.ru",
  phone: "+7 (995) 903-91-61",
  phoneHref: "tel:+79959039161",
  secondaryPhone: "+7 (495) 000-00-00 — временно",
  secondaryPhoneHref: "tel:+74950000000",
  email: "hello@voitov.studio",
  emailHref: "mailto:hello@voitov.studio",
  workHours: "Пн–Пт, 10:00–19:00",
  address: "Москва, точный адрес уточняется",
  inn: "ИНН уточняется",
  ogrn: "ОГРН/ОГРНИП уточняется",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  vk: "https://vk.com/",
  odnoklassniki: "https://ok.ru/",
  max: "https://max.ru/",
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
