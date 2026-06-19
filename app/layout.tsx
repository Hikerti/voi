import type { Metadata } from "next";
import Script from "next/script";
import "../libs/styles/normalize.css";
import "../libs/styles/legacy/webflow.css";
import "../libs/styles/legacy/creativenest.webflow.css";
import "./globals.css";
import "./ui-fixes.css";
import "./page-hotfixes.css";
import "./lead-page-fixes.css";
import "./site-polish.css";
import "./home-reference.css";
import "./client-revision.css";
import "./client-revision-patch.css";
import "./visual-polish.css";
import "./route-polish.css";
import "./light-blocks-hero-fix.css";
import "./styles/home-page.css";
import "./styles/home-hero-orbit.css";
import "./styles/seo-content.css";
import "./styles/layout.css";
import "./styles/forms.css";
import "./styles/content-pages.css";
import "./styles/header.css";
import "./styles/navigation-menus.css";
import "./styles/accessibility.css";
import "./styles/faq-width-final.css";
import "./styles/content-detail-final.css";
import "./styles/final-delivery-polish.css";
import "./styles/social-contact-polish.css";
import "./styles/russian-typography.css";
import "./styles/lead-page-layout-polish.css";
import "./styles/yandex-map-links.css";
import "./styles/portfolio-title-wrap-fix.css";
import "./styles/form-consent-fix.css";
import "./styles/mobile-content-alignment.css";
import "./styles/navigation-menus-final.css";
import "./styles/service-catalog-position-hotfix.css";
import "./styles/service-intro-layout-final.css";
import "./styles/service-page-final-fixes.css";
import MenuProvider from "@/components/layout/MenuProvider";
import Footer from "@/components/layout/Footer";
import SiteHeader from "@/components/layout/SiteHeader";
import InternalPageFrame from "@/components/layout/InternalPageFrame";
import ScrollRevealLayer from "@/components/layout/ScrollRevealLayer";
import AnalyticsEvents from "@/components/analytics/AnalyticsEvents";
import ProjectHeroSizer from "@/components/portfolio/ProjectHeroSizer";
import DecisionCta from "@/components/layout/DecisionCta";
import StructuredData from "@/components/seo/StructuredData";
import { SITE } from "@/lib/constants";
import { DEFAULT_KEYWORDS, ORGANIZATION_JSON_LD, WEBSITE_JSON_LD } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: `Разработка сайтов и веб-дизайн | ${SITE.name}`,
    template: "%s",
  },
  description: SITE.description,
  keywords: DEFAULT_KEYWORDS,
  metadataBase: new URL(SITE.baseUrl),
  alternates: { canonical: SITE.baseUrl },
  applicationName: SITE.name,
  creator: SITE.name,
  publisher: SITE.name,
  category: "web development",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE.baseUrl,
    siteName: SITE.name,
    title: `Разработка сайтов и веб-дизайн | ${SITE.name}`,
    description: SITE.description,
    images: [
      {
        url: "/images/og-cover.svg",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — разработка сайтов и веб-дизайн`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Разработка сайтов и веб-дизайн | ${SITE.name}`,
    description: SITE.description,
    images: ["/images/og-cover.svg"],
  },
  icons: {
    icon: "/logo_2.png",
    shortcut: "/logo_2.png",
    apple: "/logo_2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="w-mod-js">
      <head>
        <link rel="icon" href="/logo_2.png" type="image/png" />
        <link rel="shortcut icon" href="/logo_2.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo_2.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900&family=Great+Vibes&family=Varela&family=Forum&family=Iceland&family=Jura:wght@300..700&family=Russo+One&display=swap"
          rel="stylesheet"
        />
        <StructuredData data={[ORGANIZATION_JSON_LD, WEBSITE_JSON_LD]} />
      </head>
      <body className="body">
        <MenuProvider>
          <AnalyticsEvents />
          <ProjectHeroSizer />
          <SiteHeader />
          <InternalPageFrame>{children}</InternalPageFrame>
          <DecisionCta />
          <Footer />
          <ScrollRevealLayer />
        </MenuProvider>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        {process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID && (
          <Script id="ym" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
