import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import GridLines from "@/components/layout/GridLines";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Дизайн и айдентика",
  description: "Логотипы, брендинг, UI/UX и полиграфический дизайн от Voitov Studio.",
  path: "/services/design",
  keywords: ["дизайн сайта", "создание логотипа", "брендинг", "UI UX дизайн"],
});

export default function DesignPage() {
  return (
    <>
      <PageHeader backHref="/services" backLabel="back to complex" backLabelClass="backtoysl" />
      <GridLines />
      <h1 className="sr-only">Дизайн и айдентика</h1>
      <ServiceDetailSection
        desktopClass="services-parent1-1"
        leftIconClass="left-side-child-conent1-1"
        spacerClass="services-left1-1"
        rightClass="services-right-2-1-1"
        contentClass="content-parent-ser1-1-1112"
        mobileClass="mobile-services"
        mobileHeroClass="services-hero"
        mobileContentClass="services-content-st"
        icon="/images/winOpered.png"
        nextHref="/services/digital"
        nextLabel="Next Digital"
        desktopContent={
          <>
            <h2 className="heading-38">Дизайн</h2>
            <h2 className="heading-37">Подход к дизайну</h2>
            <p className="paragraph-312"><strong>Мы создаём визуальные решения, которые поддерживают бизнес-задачи. Дизайн становится системой коммуникации, а не отдельной картинкой.</strong></p>
            <h2 className="heading-39">Создание логотипа</h2>
            <p className="paragraph-313"><strong>Разрабатываем знак, типографику и цветовую систему, которые передают характер бренда и сохраняют узнаваемость в разных форматах.</strong></p>
            <h2 className="heading-40">Руководство по бренду</h2>
            <p className="paragraph-314"><strong>Фиксируем правила использования логотипа, цветов, шрифтов и графических элементов, чтобы коммуникация оставалась последовательной.</strong></p>
            <h2 className="heading-54">Полиграфический дизайн</h2>
            <p className="paragraph-324">Готовим печатные материалы как часть единой визуальной системы бренда и проверяем их пригодность для производства.</p>
          </>
        }
        mobileContent={
          <>
            <h2 className="heading-43">Дизайн</h2>
            <h2 className="heading-44">Подход к дизайну</h2>
            <p className="paragraph-316">Соединяем визуальный характер бренда, структуру интерфейса и задачи пользователя.</p>
            <h2 className="heading-45">Создание логотипа</h2>
            <p className="paragraph-317">Создаём запоминающийся знак и систему его применения.</p>
            <h2 className="heading-46">Руководство по бренду</h2>
            <p className="paragraph-318">Описываем правила для цвета, шрифтов, логотипа и графики.</p>
            <h2 className="heading-55">Полиграфический дизайн</h2>
            <p className="paragraph-325">Подготавливаем макеты печатных материалов в рамках общего фирменного стиля.</p>
          </>
        }
      />
    </>
  );
}
