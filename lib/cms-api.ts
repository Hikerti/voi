import {
  FAQ_ITEMS,
  NEWS_ITEMS,
  REVIEWS,
  SERVICES,
  WORK_STAGES,
  type ServiceItem,
  type WorkStageItem,
} from "@/lib/site-data";

type ApiService = {
  slug: string;
  title: string;
  summary: string;
  description?: string | null;
  price?: string | null;
  pricePrefix?: string | null;
  image?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  category?: { title?: string | null; slug?: string | null } | null;
  relatedServices?: ApiService[];
};

type ApiWorkStage = {
  title: string;
  summary: string;
  stepNumber: number;
};

type ApiReview = {
  authorName: string;
  text: string;
  createdAt?: string;
};

type ApiFaq = {
  slug: string;
  question: string;
  answer: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

type ApiNews = {
  slug: string;
  title: string;
  excerpt: string;
  content?: string | null;
  publishedAt?: string | null;
};

export type ReviewItem = (typeof REVIEWS)[number];
export type FaqItem = (typeof FAQ_ITEMS)[number];
export type NewsItem = (typeof NEWS_ITEMS)[number];

const CMS_BASE_URL =
  process.env.CMS_API_URL ||
  process.env.NEXT_PUBLIC_CMS_API_URL ||
  "http://127.0.0.1:4000/api";

const FALLBACK_IMAGES = [
  "/images/design-desk-display-313690-2.jpg",
  "/images/fon-box-2.jpg",
  "/images/cover-3000x3000-2026-05-21 14.52.29 (1).jpg",
  "/images/blog/seo-thumb.jpg",
];

async function fetchCms<T>(path: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 900);
    const res = await fetch(`${CMS_BASE_URL}${path}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function serviceImage(service: ApiService, index = 0) {
  const local = SERVICES.find((item) => item.slug === service.slug)?.image;
  return service.image || local || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function mapService(service: ApiService, index = 0): ServiceItem {
  const related = service.relatedServices?.map((item) => item.slug) ?? [];

  return {
    slug: service.slug,
    title: service.title,
    category: service.category?.slug || "digital",
    categoryLabel: service.category?.title || undefined,
    price: [service.pricePrefix, service.price].filter(Boolean).join(" ") || "по запросу",
    pricePrefix: service.pricePrefix || undefined,
    summary: service.summary,
    description: service.description || service.summary,
    image: serviceImage(service, index),
    related,
    seoTitle: service.seoTitle || `${service.title} | Voitov Studio`,
    seoDescription: service.seoDescription || service.summary,
  };
}

function mapReview(review: ApiReview): ReviewItem {
  return {
    name: review.authorName,
    date: review.createdAt ? new Date(review.createdAt).getFullYear().toString() : "2026",
    text: review.text,
  };
}

function mapNews(item: ApiNews): NewsItem {
  return {
    slug: item.slug,
    title: item.title,
    date: item.publishedAt
      ? new Date(item.publishedAt).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "2026",
    excerpt: item.excerpt,
    content: item.content || item.excerpt,
  };
}

export async function getCmsServices() {
  const data = await fetchCms<ApiService[]>("/services");
  return data?.length ? data.map(mapService) : SERVICES;
}

export async function getCmsServiceBySlug(slug: string) {
  const data = await fetchCms<ApiService>(`/services/${slug}`);
  if (data) return mapService(data);
  return SERVICES.find((service) => service.slug === slug);
}

export async function getCmsWorkStages(): Promise<WorkStageItem[]> {
  const data = await fetchCms<ApiWorkStage[]>("/work-stages");
  return data?.length ? data : WORK_STAGES;
}

export async function getCmsReviews() {
  const data = await fetchCms<ApiReview[]>("/reviews");
  return data?.length ? data.map(mapReview) : REVIEWS;
}

export async function getCmsFaq() {
  const data = await fetchCms<ApiFaq[]>("/faq");
  return data?.length ? data : FAQ_ITEMS;
}

export async function getCmsFaqBySlug(slug: string) {
  const data = await fetchCms<ApiFaq>(`/faq/${slug}`);
  if (data) return data;
  return FAQ_ITEMS.find((item) => item.slug === slug);
}

export async function getCmsNews() {
  const data = await fetchCms<ApiNews[]>("/news");
  return data?.length ? data.map(mapNews) : NEWS_ITEMS;
}

export async function getCmsNewsBySlug(slug: string) {
  const data = await fetchCms<ApiNews>(`/news/${slug}`);
  if (data) return mapNews(data);
  return NEWS_ITEMS.find((item) => item.slug === slug);
}
