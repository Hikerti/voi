export interface ServiceItem {
  slug: string;
  title: string;
  category: "strategy" | "design" | "digital" | "marketing";
  price: string;
  summary: string;
  description: string;
  image: string;
  related: string[];
  seoTitle: string;
  seoDescription: string;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "landing-page",
    title: "Лендинг под заявки",
    category: "digital",
    price: "от 90 000 ₽",
    summary: "Яркая посадочная страница с понятной структурой, вау-первым экраном и формами заявок.",
    description:
      "Проектируем оффер, структуру, визуальный стиль и сценарии заявки. Подходит для запуска услуги, продукта, эксперта или рекламной кампании.",
    image: "/images/design-desk-display-313690-2.jpg",
    related: ["corporate-site", "brand-identity", "seo-start"],
    seoTitle: "Лендинг под заявки | Voitov Studio",
    seoDescription: "Разработка нешаблонного лендинга с креативным дизайном и фокусом на заявки.",
  },
  {
    slug: "corporate-site",
    title: "Сайт компании",
    category: "digital",
    price: "от 160 000 ₽",
    summary: "Многостраничный сайт для доверия, SEO и презентации услуг компании.",
    description:
      "Собираем структуру разделов, каталог услуг, портфолио, контакты, формы и базовую SEO-архитектуру.",
    image: "/images/fon-box-2.jpg",
    related: ["landing-page", "content-seo", "support"],
    seoTitle: "Сайт компании | Voitov Studio",
    seoDescription: "Создание корпоративного сайта с каталогом услуг, SEO-структурой и формами заявок.",
  },
  {
    slug: "brand-identity",
    title: "Айдентика и визуальная система",
    category: "design",
    price: "от 70 000 ₽",
    summary: "Логотип, цвета, шрифты и графические приемы, которые сайт сможет развивать дальше.",
    description:
      "Формируем визуальный язык бренда: от базового знака до UI-настроения, которое будет смотреться дорого и узнаваемо.",
    image: "/images/cover-3000x3000-2026-05-21 14.52.29 (1).jpg",
    related: ["landing-page", "corporate-site", "media-design"],
    seoTitle: "Айдентика для сайта | Voitov Studio",
    seoDescription: "Разработка логотипа, цветов, шрифтов и визуальной системы бренда.",
  },
  {
    slug: "seo-start",
    title: "SEO-старт",
    category: "marketing",
    price: "от 35 000 ₽",
    summary: "Метатеги, структура посадочных страниц, sitemap, robots и базовые редиректы.",
    description:
      "Готовим сайт к индексации, закрываем технические ошибки, собираем базовую семантику и делаем понятную структуру страниц.",
    image: "/images/blog/seo-thumb.jpg",
    related: ["corporate-site", "content-seo", "landing-page"],
    seoTitle: "SEO-старт для сайта | Voitov Studio",
    seoDescription: "Базовая SEO-подготовка сайта: метатеги, редиректы, sitemap, robots и структура.",
  },
  {
    slug: "content-seo",
    title: "SEO-тексты и структура",
    category: "strategy",
    price: "от 45 000 ₽",
    summary: "Структура страниц и тексты, которые помогают пользователю понять услугу и поиску увидеть смысл.",
    description:
      "Пишем и раскладываем тексты по блокам: оффер, преимущества, FAQ, этапы, цена, призыв к заявке.",
    image: "/images/blog/key-words.png",
    related: ["seo-start", "corporate-site", "landing-page"],
    seoTitle: "SEO-тексты для сайта | Voitov Studio",
    seoDescription: "Подготовка SEO-текстов и структуры страниц для услуг, FAQ, блога и новостей.",
  },
  {
    slug: "support",
    title: "Поддержка и развитие",
    category: "digital",
    price: "от 25 000 ₽/мес",
    summary: "Правки, новые блоки, аналитика, публикации и развитие сайта после запуска.",
    description:
      "Помогаем сайту не застыть после релиза: улучшаем страницы, добавляем контент, отслеживаем цели и исправляем проблемы.",
    image: "/images/karta-mira-kontinent-stena-seryi-fon-2.jpg",
    related: ["seo-start", "content-seo", "corporate-site"],
    seoTitle: "Поддержка сайта | Voitov Studio",
    seoDescription: "Техническая и контентная поддержка сайта после запуска.",
  },
];

export const WORK_STAGES = [
  "Бриф и цель",
  "Структура",
  "Прототип в коде",
  "Визуальная система",
  "Разработка",
  "Тестирование",
  "Запуск",
  "Развитие",
];

export const FAQ_ITEMS = [
  {
    slug: "sroki",
    question: "Сколько времени занимает сайт?",
    answer: "Первый рабочий прототип обычно появляется за 1-2 недели. Полный срок зависит от объема страниц, контента и согласований.",
  },
  {
    slug: "dizayn",
    question: "Можно ли сделать нешаблонный дизайн без Figma?",
    answer: "Да. Мы можем прототипировать сразу в коде, если есть понятное направление, референсы и быстрая обратная связь.",
  },
  {
    slug: "seo",
    question: "Будет ли сайт готов к SEO?",
    answer: "В базовую версию входят метатеги, sitemap, robots, редиректы и нормальная структура страниц.",
  },
  {
    slug: "cms",
    question: "Можно ли будет редактировать сайт самому?",
    answer: "Да, после UI v1 планируется простая админка на Payload CMS, чтобы редактировать услуги, новости, отзывы и страницы.",
  },
];

export const REVIEWS = [
  {
    name: "Анна",
    date: "2026",
    text: "Получился сайт, который не похож на типовые лендинги. Клиенты сразу понимают, что проект делали не по шаблону.",
  },
  {
    name: "Илья",
    date: "2026",
    text: "Понравилось, что сначала собрали структуру и только потом усиливали визуал. Сайт стал понятнее и дороже на вид.",
  },
  {
    name: "Мария",
    date: "2026",
    text: "Форма, портфолио и мобильная версия стали работать как единая история, без ощущения конструктора.",
  },
  {
    name: "Дмитрий",
    date: "2026",
    text: "Команда быстро нашла сильный визуальный ход и аккуратно довела его до адаптива. На телефоне сайт выглядит так же уверенно, как на десктопе.",
  },
];

export const NEWS_ITEMS = [
  {
    slug: "voitov-studio-rebrand",
    title: "Voitov Studio переходит в Voitov Studio",
    date: "8 июня 2026",
    excerpt: "Проект обновляет бренд, структуру и визуальную систему, сохраняя необычный характер сайта.",
    content:
      "Voitov Studio продолжает идею нешаблонных сайтов, но переходит к более зрелой визуальной системе, темным акцентам и понятной структуре услуг.",
  },
  {
    slug: "ui-v1-roadmap",
    title: "UI v1: сначала прототип в коде",
    date: "8 июня 2026",
    excerpt: "Новый этап разработки начинается с живого прототипа, чтобы быстрее проверять дизайн и мобильную версию.",
    content:
      "Для проекта выбран путь прототипирования сразу в Next.js: это ускоряет проверку анимаций, адаптива и реального поведения форм.",
  },
  {
    slug: "payload-after-ui",
    title: "Админка появится после стабилизации интерфейса",
    date: "8 июня 2026",
    excerpt: "Payload CMS подключается после UI v1, чтобы структура данных не тормозила визуальную разработку.",
    content:
      "Сначала сайт получает понятный интерфейс, страницы и формы. После этого данные постепенно переносятся в Payload CMS.",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

export function getFaqBySlug(slug: string) {
  return FAQ_ITEMS.find((item) => item.slug === slug);
}

export function getNewsBySlug(slug: string) {
  return NEWS_ITEMS.find((item) => item.slug === slug);
}
