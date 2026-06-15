declare global {
  interface Window {
    gtag?: unknown;
    ym?: unknown;
  }
}

export function trackGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", goal, params);
  }

  const counterId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  if (counterId && typeof window.ym === "function") {
    window.ym(counterId, "reachGoal", goal, params);
  }
}
