import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
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
      <PageHeader backLabel={null} />
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
        nextLabel="Дизайн"
        desktopContent={
          <>
            <h1>Стратегия сайта и бренда</h1>
            <h2>Бизнес-консультация</h2>
            <p>Фиксируем цели, ограничения, аудиторию и критерии результата. На этой основе формируем понятный план проекта.</p>
            <h2>Исследование аудитории</h2>
            <p>Изучаем мотивацию пользователей, конкурентов и поисковые сценарии, чтобы структура сайта отвечала реальным задачам.</p>
            <h2>Позиционирование бренда</h2>
            <p>Определяем сильные стороны, тон коммуникации и визуальное направление.</p>
            <h2>Контентная стратегия</h2>
            <p>Планируем страницы, смысловые блоки, FAQ, кейсы и материалы для органического трафика.</p>
            <h2>Коммуникационная стратегия</h2>
            <p>Согласуем ключевые сообщения и последовательность контакта с пользователем.</p>
            <h2>Техническая стратегия</h2>
            <p>Выбираем стек, CMS, интеграции, аналитику и план развития после запуска.</p>
          </>
        }
        mobileContent={null}
      />
    </>
  );
}
