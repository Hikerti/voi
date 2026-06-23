import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Digital-разработка и UI/UX",
  description: "Создание контента, UI/UX, разработка сайтов, CMS и e-commerce решений.",
  path: "/services/digital",
  keywords: ["разработка сайтов", "UI UX дизайн", "e-commerce", "CMS сайт"],
});

export default function DigitalPage() {
  return (
    <>
      <PageHeader backLabel={null} />
      <ServiceDetailSection
        desktopClass="services-parent-3-3d"
        leftIconClass="left-side-child-conent-3-3d"
        spacerClass="services-left-3-3d"
        rightClass="services-right-2-3-3d"
        contentClass="content-parent-ser1-3-3d"
        mobileClass="mobile-services-3-3d"
        mobileHeroClass="services-hero-3-3d"
        mobileContentClass="services-content-st-2-3-3d"
        icon="/images/winKKpered.png"
        nextHref="/services/marketing"
        nextLabel="Маркетинг"
        desktopContent={
          <>
            <h1>Digital-разработка и UI/UX</h1>
            <h2>Создание контента</h2>
            <p>Готовим тексты, изображения, анимацию и видео как часть единой системы сайта.</p>
            <h2>Дизайн и разработка сайтов</h2>
            <p>Проектируем лендинги, корпоративные сайты, CMS-проекты и интернет-магазины.</p>
            <h2>Информационная архитектура</h2>
            <p>Создаём логичную карту страниц, внутренние связи и последовательные пути к целевому действию.</p>
            <h2>UI/UX дизайн</h2>
            <p>Собираем прототипы и интерфейсы, проверяем адаптивность, читаемость и удобство взаимодействия.</p>
            <h2>E-commerce решения</h2>
            <p>Проектируем каталог, карточки товаров, корзину, оформление заказа и интеграции.</p>
            <h2>Техническая архитектура</h2>
            <p>Определяем стек, модель данных, API, безопасность и сценарий поддержки после запуска.</p>
          </>
        }
        mobileContent={null}
      />
    </>
  );
}
