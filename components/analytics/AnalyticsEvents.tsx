"use client";

import { useEffect } from "react";
import { trackGoal } from "@/lib/analytics";
import { SITE } from "@/lib/constants";

function goalFromHref(href: string) {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";

  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    if (url.pathname.startsWith("/portfolio/")) return "portfolio_open";
    if (url.pathname.startsWith("/services/")) return "service_open";
  } catch {
    return null;
  }

  return null;
}

export default function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest("a[href]");
      const href = link?.getAttribute("href");
      if (!href) return;

      const goal = goalFromHref(href);
      if (!goal) return;

      trackGoal(goal, { href });
    }

    function redirectAfterSuccessfulForm() {
      const successDialog = document.querySelector<HTMLElement>(".vs-form__success-dialog");
      if (!successDialog) return;

      successDialog.hidden = true;
      window.location.assign(SITE.spasibo);
    }

    const observer = new MutationObserver(redirectAfterSuccessfulForm);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("click", handleClick);
    redirectAfterSuccessfulForm();

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
