import { PrismaClient, PublishStatus } from '@prisma/client';

process.env.DATABASE_URL ??= 'file:./dev.db';

const prisma = new PrismaClient();

async function main() {
  await prisma.serviceRelation.deleteMany();
  await prisma.pricePackage.deleteMany();
  await prisma.service.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.advantage.deleteMany();
  await prisma.workStage.deleteMany();
  await prisma.fAQItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.newsPost.deleteMany();
  await prisma.article.deleteMany();
  await prisma.project.deleteMany();

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      brandName: 'Voitov Studio',
      tagline: 'Креативные сайты и цифровые продукты',
      email: 'hello@voitov.studio',
      phone: '+7 999 000-00-00',
      policyUrl: '/privacy',
      seoTitle: 'Voitov Studio - креативная веб-студия',
      seoDescription:
        'Voitov Studio делает нешаблонные сайты, лендинги и digital-продукты с сильной визуальной подачей.',
    },
    create: {
      id: 1,
      brandName: 'Voitov Studio',
      tagline: 'Креативные сайты и цифровые продукты',
      email: 'hello@voitov.studio',
      phone: '+7 999 000-00-00',
      policyUrl: '/privacy',
      seoTitle: 'Voitov Studio - креативная веб-студия',
      seoDescription:
        'Voitov Studio делает нешаблонные сайты, лендинги и digital-продукты с сильной визуальной подачей.',
    },
  });

  const sites = await prisma.serviceCategory.create({
    data: {
      title: 'Сайты',
      slug: 'sites',
      summary: 'Лендинги, корпоративные сайты и промо-страницы.',
      sortOrder: 10,
    },
  });

  const design = await prisma.serviceCategory.create({
    data: {
      title: 'Дизайн',
      slug: 'design',
      summary: 'Редизайн, прототипы и визуальные системы.',
      sortOrder: 20,
    },
  });

  const landing = await prisma.service.create({
    data: {
      categoryId: sites.id,
      title: 'Лендинг',
      slug: 'landing-page',
      summary:
        'Одностраничный сайт с креативной подачей, продуманной структурой и заявочной формой.',
      description:
        'Подходит для запуска услуги, продукта, события или личного бренда. Включает прототип, дизайн, адаптивную верстку и базовую SEO-подготовку.',
      pricePrefix: 'от',
      price: '120 000 ₽',
      sortOrder: 10,
      seoTitle: 'Лендинг под ключ - Voitov Studio',
      seoDescription:
        'Разработка креативного лендинга под ключ: структура, дизайн, верстка, формы и SEO-база.',
    },
  });

  const corporate = await prisma.service.create({
    data: {
      categoryId: sites.id,
      title: 'Корпоративный сайт',
      slug: 'corporate-website',
      summary:
        'Многостраничный сайт для студии, сервиса или компании с каталогом услуг и контентными разделами.',
      description:
        'Проектируем структуру, страницы услуг, портфолио, новости, FAQ, контакты и CMS для самостоятельного обновления.',
      pricePrefix: 'от',
      price: '220 000 ₽',
      sortOrder: 20,
      seoTitle: 'Корпоративный сайт - Voitov Studio',
      seoDescription:
        'Разработка корпоративного сайта с услугами, портфолио, SEO-структурой и CMS.',
    },
  });

  const redesign = await prisma.service.create({
    data: {
      categoryId: design.id,
      title: 'Редизайн сайта',
      slug: 'website-redesign',
      summary:
        'Обновление визуального языка, UX и ключевых блоков без потери характера бренда.',
      description:
        'Анализируем текущий сайт, находим слабые места, усиливаем типографику, контраст, анимации и мобильный опыт.',
      pricePrefix: 'от',
      price: '90 000 ₽',
      sortOrder: 30,
      seoTitle: 'Редизайн сайта - Voitov Studio',
      seoDescription:
        'Редизайн сайта с фокусом на UX, визуальную выразительность и адаптивность.',
    },
  });

  await prisma.serviceRelation.createMany({
    data: [
      { serviceId: landing.id, relatedId: redesign.id },
      { serviceId: corporate.id, relatedId: landing.id },
      { serviceId: redesign.id, relatedId: landing.id },
    ],
  });

  await prisma.pricePackage.createMany({
    data: [
      {
        serviceId: landing.id,
        title: 'Landing Start',
        slug: 'landing-start',
        price: 'от 120 000 ₽',
        summary: 'Прототип, дизайн, адаптивная разработка, форма заявки.',
        features: 'Прототип;UI дизайн;Next.js;Базовое SEO;Форма заявки',
        sortOrder: 10,
      },
      {
        serviceId: corporate.id,
        title: 'Studio Website',
        slug: 'studio-website',
        price: 'от 220 000 ₽',
        summary: 'Многостраничный сайт с услугами, кейсами и CMS-основой.',
        features: 'Структура страниц;Каталог услуг;Портфолио;Новости;FAQ;CMS',
        sortOrder: 20,
      },
      {
        serviceId: redesign.id,
        title: 'Visual Upgrade',
        slug: 'visual-upgrade',
        price: 'от 90 000 ₽',
        summary: 'UX/UI обновление ключевых экранов и адаптивов.',
        features: 'UX-аудит;Дизайн-токены;Главная страница;Мобильная версия',
        sortOrder: 30,
      },
    ],
  });

  await prisma.advantage.createMany({
    data: [
      {
        title: 'Нешаблонная подача',
        slug: 'distinctive-design',
        summary:
          'Делаем сайт, который выглядит как авторская работа, а не очередной шаблон.',
        sortOrder: 10,
      },
      {
        title: 'Понятная структура',
        slug: 'clear-structure',
        summary:
          'Креативность не мешает навигации, заявкам и SEO-структуре страниц.',
        sortOrder: 20,
      },
      {
        title: 'Адаптивные анимации',
        slug: 'adaptive-motion',
        summary:
          'Сохраняем эффектный motion-стиль на десктопе и мобильных экранах.',
        sortOrder: 30,
      },
    ],
  });

  await prisma.workStage.createMany({
    data: [
      {
        title: 'Бриф и структура',
        slug: 'brief-and-structure',
        summary: 'Фиксируем цели, аудиторию, страницы и контентные блоки.',
        stepNumber: 1,
        sortOrder: 10,
      },
      {
        title: 'Прототип в коде',
        slug: 'code-prototype',
        summary: 'Собираем первый интерактивный вариант сразу в приложении.',
        stepNumber: 2,
        sortOrder: 20,
      },
      {
        title: 'UI и анимации',
        slug: 'ui-and-motion',
        summary: 'Усиливаем визуальный стиль, читаемость и переходы между блоками.',
        stepNumber: 3,
        sortOrder: 30,
      },
      {
        title: 'CMS и запуск',
        slug: 'cms-and-release',
        summary: 'Готовим домен, SSL, редиректы, аналитику, sitemap и production env для демонстрации.',
        stepNumber: 4,
        sortOrder: 40,
      },
      {
        title: 'Разработка страниц',
        slug: 'page-development',
        summary: 'Доводим главную, услуги, портфолио, новости, FAQ, отзывы и контакты до единой системы.',
        stepNumber: 5,
        sortOrder: 50,
      },
      {
        title: 'Тестирование',
        slug: 'qa-testing',
        summary: 'Проверяем desktop, laptop, tablet, mobile, формы, меню, изображения, SEO и сборку.',
        stepNumber: 6,
        sortOrder: 60,
      },
      {
        title: 'Запуск',
        slug: 'release',
        summary: 'Публикуем первую версию, проверяем редиректы, аналитику, заявки и sitemap.',
        stepNumber: 7,
        sortOrder: 70,
      },
      {
        title: 'Развитие',
        slug: 'growth',
        summary: 'Добавляем новые разделы, обновляем контент и даем удобный способ поддерживать сайт после запуска.',
        stepNumber: 8,
        sortOrder: 80,
      },
    ],
  });

  await prisma.fAQItem.createMany({
    data: [
      {
        question: 'Можно ли начать без готового дизайна?',
        slug: 'can-start-without-final-design',
        answer:
          'Да. Первый прототип можно собирать сразу в коде, а визуальный стиль развивать итерационно.',
        sortOrder: 10,
      },
      {
        question: 'Будет ли простая админка?',
        slug: 'will-there-be-admin',
        answer:
          'Да. Для услуг, новостей, отзывов и FAQ можно подключить простое управление контентом, чтобы не обращаться к разработчику за каждой правкой.',
        sortOrder: 20,
      },
      {
        question: 'Что делать, если нет готовых текстов?',
        slug: 'what-if-no-content',
        answer:
          'Можно начать с короткого брифа: мы соберем структуру, уточним смыслы и подготовим тексты под страницы, формы, FAQ и SEO.',
        sortOrder: 30,
      },
      {
        question: 'Будет ли сайт готов к SEO?',
        slug: 'seo-ready',
        answer:
          'Да. В базовую подготовку входят понятная структура страниц, метатеги, sitemap, robots, редиректы и аккуратная работа с заголовками.',
        sortOrder: 40,
      },
      {
        question: 'Мобильная версия будет такой же выразительной?',
        slug: 'mobile-experience',
        answer:
          'Да. Адаптив проектируется как отдельный сценарий: сохраняем характер сайта, но убираем перегруз, мелкие клики и неудобные карточки.',
        sortOrder: 50,
      },
      {
        question: 'Что входит в запуск сайта?',
        slug: 'what-is-in-launch',
        answer:
          'Проверяем сборку, формы, редиректы, sitemap, robots, базовые метатеги, SSL и корректную работу основных страниц на популярных устройствах.',
        sortOrder: 60,
      },
    ],
  });

  await prisma.review.createMany({
    data: [
      {
        authorName: 'Анна',
        company: 'Запуск услуги',
        text: 'Получился сайт, который не похож на типовые лендинги. Клиенты сразу понимают, что проект делали не по шаблону.',
        rating: 5,
        sortOrder: 10,
      },
      {
        authorName: 'Илья',
        company: 'B2B-сервис',
        text: 'Понравилось, что сначала собрали структуру и только потом усиливали визуал. Сайт стал понятнее и дороже на вид.',
        rating: 5,
        sortOrder: 20,
      },
      {
        authorName: 'Мария',
        company: 'Личный бренд',
        text: 'Форма, портфолио и мобильная версия стали работать как единая история, без ощущения конструктора.',
        rating: 5,
        sortOrder: 30,
      },
      {
        authorName: 'Дмитрий',
        company: 'Редизайн',
        text: 'Команда быстро нашла сильный визуальный ход и аккуратно довела его до адаптива. На телефоне сайт выглядит так же уверенно, как на десктопе.',
        rating: 5,
        sortOrder: 40,
      },
    ],
  });

  await prisma.newsPost.create({
    data: {
      title: 'Voitov Studio обновляет структуру сайта',
      slug: 'voitov-studio-site-structure',
      excerpt:
        'На сайте появляются понятные услуги, новости, FAQ, отзывы и формы для заявок.',
      content:
        'Обновленная структура помогает посетителю быстрее понять формат работы, посмотреть услуги, прочитать ответы на частые вопросы и оставить заявку.',
      publishedAt: new Date('2026-06-09T09:00:00.000Z'),
      status: PublishStatus.PUBLISHED,
      sortOrder: 10,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Как креативному сайту не потерять читаемость',
      slug: 'creative-website-readable-ux',
      excerpt:
        'Креативный сайт может быть эффектным и при этом понятным для пользователя и поисковых систем.',
      content:
        'Главный принцип - не прятать смысл за эффектами. Типографика, контраст и структура должны работать вместе с анимациями.',
      publishedAt: new Date('2026-06-09T10:00:00.000Z'),
      sortOrder: 10,
    },
  });

  await prisma.project.create({
    data: {
      title: 'Voitov Studio Website',
      slug: 'voitov-studio-website',
      client: 'Voitov Studio',
      industry: 'Web studio',
      summary: 'Редизайн и развитие сайта студии в полноценное приложение.',
      description:
        'Проект включает контентные страницы, заявки, SEO-подготовку и удобное развитие сайта после запуска.',
      sortOrder: 10,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
