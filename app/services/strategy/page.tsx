import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import GridLines from "@/components/layout/GridLines";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Стратегия сайта и бренда",
  description: "Исследование аудитории, позиционирование, контентная и техническая стратегия.",
  path: "/services/strategy",
  keywords: ["стратегия сайта", "стратегия бренда", "исследование аудитории"],
});

export default function StrategyPage() {
  return (
    <>
      <PageHeader backHref="/services" backLabel="back to complex" backLabelClass="backtoysl" />
      <GridLines />
      <h1 className="sr-only">Стратегия сайта и бренда</h1>
      <ServiceDetailSection
        desktopClass="services-parent-x-x"
        leftIconClass="left-side-child-conent-x-x"
        spacerClass="services-left-x-x"
        rightClass="services-right-2-x-x"
        contentClass="content-parent-ser1-x-x"
        mobileClass="mobile-services-x-x"
        mobileHeroClass="services-hero-x-x"
        mobileContentClass="services-content-st-2-x-x"
        icon="/images/winxpered.png"
        nextHref="/services/design"
        nextLabel="Next Design"
        desktopContent={
          <>
            <h2 className="heading-38">Стратегия</h2>
            <h2 className="heading-37">Бизнес-консультация</h2>
            <p className="paragraph-312"><strong>Фиксируем цели, ограничения, аудиторию и критерии результата. На этой основе формируем понятный план проекта.</strong></p>
            <h2 className="heading-39">Исследование аудитории</h2>
            <p className="paragraph-313"><strong>Изучаем мотивацию пользователей, конкурентов и поисковые сценарии, чтобы структура сайта отвечала реальным задачам.</strong></p>
            <h2 className="heading-52">Позиционирование бренда</h2>
            <p className="paragraph-322">Определяем сильные стороны, тон коммуникации и визуальное направление.</p>
            <h2 className="heading-40">Контентная стратегия</h2>
            <p className="paragraph-314"><strong>Планируем страницы, смысловые блоки, FAQ, кейсы и материалы для органического трафика.</strong></p>
            <h2 className="heading-53">Коммуникационная стратегия</h2>
            <p className="paragraph-323">Согласуем ключевые сообщения и последовательность контакта с пользователем.</p>
            <h2 className="heading-40">Техническая стратегия</h2>
            <p className="paragraph-314"><strong>Выбираем стек, CMS, интеграции, аналитику и план развития после запуска.</strong></p>
          </>
        }
        mobileContent={
          <>
            <h2 className="heading-43">Стратегия</h2>
            <h2 className="heading-44">Бизнес-консультация</h2>
            <p className="paragraph-316">Определяем задачу, аудиторию, ограничения и критерии результата.</p>
            <h2 className="heading-45">Исследование аудитории</h2>
            <p className="paragraph-317">Проверяем мотивацию пользователей и конкурентную среду.</p>
            <h2 className="heading-56">Позиционирование</h2>
            <p className="paragraph-326">Формулируем сильные стороны и направление бренда.</p>
            <h2 className="heading-46">Контентная стратегия</h2>
            <p className="paragraph-318">Собираем карту страниц и контентный план.</p>
            <h2 className="heading-57">Коммуникации</h2>
            <p className="paragraph-327">Определяем ключевые сообщения и тон общения.</p>
            <h2 className="heading-46">Техническая стратегия</h2>
            <p className="paragraph-318">Выбираем технологии, CMS, аналитику и интеграции.</p>
          </>
        }
      />
    </>
  );
}
