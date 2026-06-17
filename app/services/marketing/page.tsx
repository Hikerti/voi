import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ServiceDetailSection from "@/components/services/ServiceDetailSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Digital-маркетинг и SEO",
  description: "Контентная стратегия, SMM, email-маркетинг, SEO, PPC и digital PR.",
  path: "/services/marketing",
  keywords: ["digital маркетинг", "SEO продвижение", "SMM", "контентная стратегия"],
});

export default function MarketingPage() {
  return (
    <>
      <PageHeader backLabel={null} />
      <ServiceDetailSection
        desktopClass="services-parent-4-4m"
        leftIconClass="left-side-child-conent-4-4m"
        spacerClass="services-left-4-4m"
        rightClass="services-right-2-4-4m"
        contentClass="content-parent-ser1-4-4m"
        mobileClass="mobile-services-4-4m"
        mobileHeroClass="services-hero-4-4m"
        mobileContentClass="services-content-st-2-4-4m"
        icon="/images/winRRpered.png"
        nextHref="/services/strategy"
        nextLabel="Стратегия"
        desktopContent={
          <>
            <h2>Маркетинг</h2>
            <h2>Стратегия контента</h2>
            <p>Формируем темы, форматы и план публикаций, которые поддерживают продажи и поисковый спрос.</p>
            <h2>SMM-продвижение</h2>
            <p>Планируем присутствие в социальных сетях, контент, аналитику и взаимодействие с аудиторией.</p>
            <h2>Email-маркетинг</h2>
            <p>Настраиваем сценарии писем, адаптивные шаблоны, сегментацию и измерение результатов.</p>
            <h2>SEO и PPC</h2>
            <p>Собираем семантику, структуру посадочных страниц, рекламные кампании и аналитику конверсий.</p>
            <h2>Прямой маркетинг</h2>
            <p>Сегментируем аудиторию, тестируем предложения и оцениваем эффективность каналов.</p>
            <h2>Digital PR</h2>
            <p>Готовим инфоповоды, публикации и внешние упоминания бренда.</p>
          </>
        }
        mobileContent={null}
      />
    </>
  );
}
