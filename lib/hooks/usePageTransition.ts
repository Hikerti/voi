"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

const TRANSITION_DURATION = 700;

export function usePageTransition() {
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      document.documentElement.classList.add("page-leaving");
      setTimeout(() => {
        router.push(href);
        setTimeout(() => {
          document.documentElement.classList.remove("page-leaving");
        }, 100);
      }, TRANSITION_DURATION);
    },
    [router]
  );

  return { navigate, duration: TRANSITION_DURATION };
}
