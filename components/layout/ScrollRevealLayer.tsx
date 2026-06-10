"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = [
  ".vs-services-band > *",
  ".vs-service-card",
  ".vs-prices > *",
  ".vs-price-card",
  ".studio2__head",
  ".studio2__slider-copy",
  ".studio2__slider-media",
  ".studio2__thumbs button",
  ".vs-stages__hero",
  ".vs-stage",
  ".vs-reviews-preview .vs-section-head",
  ".vs-review",
  ".vs-faq-preview > div:first-child",
  ".vs-faq-row",
  ".news-preview__head",
  ".news-card",
  ".work-v2__hero-copy",
  ".work-v2__infographic",
  ".work-v2__feature",
  ".work-v2__buttons button",
  ".work-v2__card",
  ".reviews-page__hero",
  ".faq-page__hero",
  ".contacts-page__hero",
  ".blog-page__hero",
  ".blog-card",
  ".faq-accordion__item",
  ".article-page__header",
  ".article-page__media",
  ".article-page__body",
  ".lead-page__copy",
  ".lead-page__brief",
  ".lead-page__signal",
  ".lead-page .vs-form",
  ".lead-page__brief span",
].join(",");

export default function ScrollRevealLayer() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    elements.forEach((element, index) => {
      element.classList.add("reveal-block");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
