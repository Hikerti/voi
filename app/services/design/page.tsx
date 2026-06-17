import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
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
      <PageHeader backLabel={null} />
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
        nextLabel="Digital"
        desktopContent={
          <>
            <h2>Дизайн</h2>
            <h2>Подход к дизайну</h2>
            <p>Мы создаём визуальные решения, которые поддерживают бизнес-задачи. Дизайн становится системой коммуникации, а не отдельной картинкой.</p>
            <h2>Создание логотипа</h2>
            <p>Разрабатываем знак, типографику и цветовую систему, которые передают характер бренда и сохраняют узнаваемость в разных форматах.</p>
            <h2>Руководство по бренду</h2>
            <p>Фиксируем правила использования логотипа, цветов, шрифтов и графических элементов, чтобы коммуникация оставалась последовательной.</p>
            <h2>Полиграфический дизайн</h2>
            <p>Готовим печатные материалы как часть единой визуальной системы бренда и проверяем их пригодность для производства.</p>
          </>
        }
        mobileContent={null}
      />
    </>
  );
}
