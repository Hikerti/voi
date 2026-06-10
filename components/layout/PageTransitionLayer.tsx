"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const TRANSITION_DURATION = 720;

function shouldSkipTransition(event: MouseEvent, anchor: HTMLAnchorElement) {
  if (event.defaultPrevented) return true;
  if (event.button !== 0) return true;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return true;
  if (anchor.target && anchor.target !== "_self") return true;
  if (anchor.hasAttribute("download")) return true;
  if (anchor.dataset.noTransition === "true") return true;

  const href = anchor.getAttribute("href") ?? "";
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return true;
  }

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return true;

  const currentPath = `${window.location.pathname}${window.location.search}`;
  const targetPath = `${url.pathname}${url.search}`;
  if (currentPath === targetPath && url.hash) return true;

  return false;
}

export default function PageTransitionLayer() {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add("page-entering");

    const id = window.setTimeout(() => {
      document.documentElement.classList.remove("page-entering", "page-leaving");
      isNavigating.current = false;
    }, 620);

    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (shouldSkipTransition(event, anchor)) return;

      const url = new URL(anchor.href, window.location.href);
      const targetHref = `${url.pathname}${url.search}${url.hash}`;
      const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (targetHref === currentHref || isNavigating.current) return;

      event.preventDefault();
      isNavigating.current = true;
      document.documentElement.classList.remove("page-entering");
      document.documentElement.classList.add("page-leaving");

      window.setTimeout(() => {
        router.push(targetHref);
      }, TRANSITION_DURATION);
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [router]);

  return (
    <div className="page-transition" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
