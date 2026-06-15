"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function extractBackgroundUrl(value: string) {
  const match = value.match(/^url\(["']?(.*?)["']?\)$/);
  return match?.[1] ?? null;
}

export default function ProjectHeroSizer() {
  const pathname = usePathname();

  useEffect(() => {
    const heroes = document.querySelectorAll<HTMLElement>(".case-hero-raboti");

    heroes.forEach((hero) => {
      const imageUrl = extractBackgroundUrl(getComputedStyle(hero).backgroundImage);
      if (!imageUrl) return;

      const image = new window.Image();
      image.decoding = "async";
      image.onload = () => {
        if (!image.naturalWidth || !image.naturalHeight) return;
        hero.style.setProperty("--case-ratio", `${image.naturalWidth} / ${image.naturalHeight}`);
        hero.dataset.naturalSize = "ready";
      };
      image.src = imageUrl;
    });
  }, [pathname]);

  return null;
}
