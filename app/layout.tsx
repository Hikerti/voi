import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./ui-fixes.css";
import "./page-hotfixes.css";
import MenuProvider from "@/components/layout/MenuProvider";
import Footer from "@/components/layout/Footer";
import SiteHeader from "@/components/layout/SiteHeader";
import PageTransitionLayer from "@/components/layout/PageTransitionLayer";
import AnalyticsEvents from "@/components/analytics/AnalyticsEvents";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: "%s",
  },
  description: SITE.description,
  metadataBase: new URL(SITE.baseUrl),
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/webclip.png",
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
        {/* Webflow CSS — served as static files so url('../images/...') resolves correctly */}
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/webflow.css" />
        <link rel="stylesheet" href="/css/creativenest.webflow.css" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900&family=Great+Vibes&family=Varela&family=Forum&family=Iceland&family=Jura:wght@300..700&family=Russo+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="body">
        <MenuProvider>
          <AnalyticsEvents />
          <SiteHeader />
          {children}
          <Footer />
          <PageTransitionLayer />
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
