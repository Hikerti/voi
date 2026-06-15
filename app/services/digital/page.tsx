import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import GridLines from "@/components/layout/GridLines";
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
      <PageHeader backHref="/services" backLabel="back to complex" backLabelClass="backtoysl" />
      <GridLines />
      <h1 className="sr-only">Digital-разработка и UI/UX</h1>
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
        nextLabel="Next Marketing"
        desktopContent={
          <>
            <h2 className="heading-38">Digital</h2>
            <h2 className="heading-58">Создание контента</h2>
            <p className="paragraph-328">Готовим тексты, изображения, анимацию и видео как часть единой системы сайта.</p>
            <h2 className="heading-59">Дизайн и разработка сайтов</h2>
            <p className="paragraph-329">Проектируем лендинги, корпоративные сайты, CMS-проекты и интернет-магазины.</p>
            <h2 className="heading-37">Информационная архитектура</h2>
            <p className="paragraph-312"><strong>Создаём логичную карту страниц, внутренние связи и последовательные пути к целевому действию.</strong></p>
            <h2 className="heading-39">UI/UX дизайн</h2>
            <p className="paragraph-313"><strong>Собираем прототипы и интерфейсы, проверяем адаптивность, читаемость и удобство взаимодействия.</strong></p>
            <h2 className="heading-40">E-commerce решения</h2>
            <p className="paragraph-314"><strong>Проектируем каталог, карточки товаров, корзину, оформление заказа и интеграции.</strong></p>
            <h2 className="heading-d4">Техническая архитектура</h2>
            <p className="paragraph-d3">Определяем стек, модель данных, API, безопасность и сценарий поддержки после запуска.</p>
          </>
        }
        mobileContent={
          <>
            <h2 className="heading-43">Digital</h2>
            <h2 className="heading-60">Создание контента</h2>
            <p className="paragraph-330">Тексты, изображения, анимация и видео для страниц сайта.</p>
            <h2 className="heading-61">Дизайн и разработка сайтов</h2>
            <p className="paragraph-331">Лендинги, корпоративные сайты, CMS и магазины.</p>
            <h2 className="heading-44">Информационная архитектура</h2>
            <p className="paragraph-316">Карта страниц, навигация и пользовательские сценарии.</p>
            <h2 className="heading-45">UI/UX дизайн</h2>
            <p className="paragraph-317">Прототипы, интерфейсы и адаптивная система компонентов.</p>
            <h2 className="heading-46">E-commerce</h2>
            <p className="paragraph-318">Каталог, карточки, корзина и интеграции.</p>
            <h2 className="heading-md3-3">Техническая архитектура</h2>
            <p className="paragraph-md4">Стек, API, данные и поддержка.</p>
          </>
        }
      />
    </>
  );
}
