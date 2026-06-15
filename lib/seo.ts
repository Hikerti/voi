import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const DEFAULT_KEYWORDS = [
  "разработка сайтов",
  "веб-студия",
  "создание сайтов в Москве",
  "дизайн сайта",
  "корпоративный сайт",
  "лендинг",
  "SEO-продвижение",
  "поддержка сайта",
];

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

function hasFileExtension(path: string) {
  const lastSegment = path.split("/").pop() || "";
  return lastSegment.includes(".");
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withTrailingSlash = normalized === "/" || hasFileExtension(normalized)
    ? normalized
    : `${normalized.replace(/\/$/, "")}/`;

  return `${SITE.baseUrl}${withTrailingSlash === "/" ? "" : withTrailingSlash}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = "/images/blog/seo-thumb.jpg",
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  const mergedKeywords = Array.from(new Set([...keywords, ...DEFAULT_KEYWORDS]));

  return {
    title: fullTitle,
    description,
    keywords: mergedKeywords,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
      type,
      locale: "ru_RU",
      url: canonical,
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

const socialLinks = [
  SITE.telegram,
  SITE.whatsapp,
  SITE.instagram,
  SITE.facebook,
  SITE.vk,
].filter((value): value is string => Boolean(value));

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.baseUrl}/#organization`,
  name: SITE.name,
  url: SITE.baseUrl,
  logo: absoluteUrl("/logo.png"),
  image: absoluteUrl("/images/blog/seo-thumb.jpg"),
  description: SITE.description,
  telephone: SITE.phone,
  email: SITE.email,
  areaServed: {
    "@type": "City",
    name: "Москва",
  },
  sameAs: socialLinks,
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.baseUrl}/#website`,
  name: SITE.name,
  url: SITE.baseUrl,
  inLanguage: "ru-RU",
  publisher: { "@id": `${SITE.baseUrl}/#organization` },
};
