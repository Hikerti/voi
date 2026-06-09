import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import GridLines from "@/components/layout/GridLines";

export const metadata: Metadata = {
  title: "Диджитал | Voitov Studio",
  description: "Создание контента, UI/UX дизайн, разработка сайтов и e-commerce решения",
  openGraph: {
    title: "Диджитал | Voitov Studio",
    description: "Создание контента, UI/UX дизайн, разработка сайтов и e-commerce решения",
  },
};

export default function DigitalPage() {
  return (
    <>
      <PageHeader backHref="/services" backLabel="back to complex" backLabelClass="backtoysl" />
      <GridLines />
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
            <h1 className="heading-38">Digital</h1>
            <h1 className="heading-58">Создание контента</h1>
            <p className="paragraph-328">
              Содержание — король! Мы любим проявлять креативность, мыслить с разных сторон и
              дарить истинный смысл каждой истории.<br /><br />
              — Анимация и видеография<br />
              — Фотография<br />
              — Копирайтинг и тональность<br />
              — Сделанный на заказ дизайн
            </p>
            <h1 className="heading-59">Дизайн и сборка сайтов</h1>
            <p className="paragraph-329">
              У нас есть проверенная методика, когда дело доходит до веб-сайтов. Мы оттачиваем наш
              набор навыков и применяем их на каждом этапе.<br /><br />
              — Электронная коммерция<br />
              — Сайты CMS<br />
              — Микросайты<br />
              — Презентации и предложения
            </p>
            <h1 className="heading-37">Информационная архитектура</h1>
            <p className="paragraph-312">
              <strong>
                Совершенство структуры сайта — в минимализме и функциональности: убираем лишнее,
                оставляем только то, что работает. Мы проектируем информационную архитектуру сайта,
                создавая логичную карту страниц и разделов, которая учитывает контент и цели бренда.
              </strong>
            </p>
            <h1 className="heading-39">UI/UX Design</h1>
            <p className="paragraph-313">
              <strong>
                Разработка интерфейса — ключевой этап создания UI/UX дизайна сайта, который
                определяет успех всего проекта. Мы создаём прототипы, макеты и готовые интерфейсы
                с полным вовлечением заказчика, чтобы результат идеально отвечал бизнес-задачам.
              </strong>
            </p>
            <h1 className="heading-40">E-Commerce решения</h1>
            <p className="paragraph-314">
              <strong>
                Открываем новые каналы продаж с помощью мощных e-commerce сайтов, заточенных под
                максимальную конверсию. Мы усиливаем привлекательность товаров через продуманный
                дизайн, удобную корзину и оптимизированный путь покупателя.
              </strong>
            </p>
            <h1 className="heading-d4">Техническая стратегия</h1>
            <p className="paragraph-d3">
              Ваш бизнес так же силен, как основы, которые вы заложили. Мы предлагаем первоклассные
              консультации, поддерживаем правильные платформы и инструменты для вашего бизнеса,
              укрепляя его корни, создавая основу для вашего бизнеса.
            </p>
          </>
        }
        mobileContent={
          <>
            <h1 className="heading-43">Digital</h1>
            <h1 className="heading-60">Создание контента</h1>
            <p className="paragraph-330">
              Содержание — король! Мы любим проявлять креативность, мыслить с разных сторон.<br /><br />
              — Анимация и видеография<br />
              — Фотография<br />
              — Копирайтинг и тональность<br />
              — Сделанный на заказ дизайн
            </p>
            <h1 className="heading-61">Дизайн и сборка сайтов</h1>
            <p className="paragraph-331">
              У нас есть проверенная методика.<br /><br />
              — Электронная коммерция<br />
              — Сайты CMS<br />
              — Микросайты<br />
              — Презентации и предложения
            </p>
            <h1 className="heading-44">Информационная архитектура</h1>
            <p className="paragraph-316">
              Совершенство достигается не тогда, когда нечего добавить, а когда нечего отнять. Мы
              работаем, чтобы создать фундаментальную структуру для макета вашего сайта.
            </p>
            <h1 className="heading-45">UI/UX Design</h1>
            <p className="paragraph-317">
              Создание и разработка интерфейса — наиболее важный подготовительный этап при
              разработке сайта. Мы имеем достаточно большой опыт в создании UI/UX интерфейсов.
            </p>
            <h1 className="heading-46">E-Commerce</h1>
            <p className="paragraph-318">
              Мы держим ключ, чтобы открыть новые источники дохода. Ориентируясь на высокую
              конверсию, мы помогаем увеличить желание продукта.
            </p>
            <h1 className="heading-md3-3">Техническая стратегия</h1>
            <p className="paragraph-md4">
              Ваш бизнес так же силен, как основы, которые вы заложили. Мы предлагаем первоклассные
              консультации, поддерживаем правильные платформы и инструменты для вашего бизнеса.
            </p>
          </>
        }
      />
    </>
  );
}
