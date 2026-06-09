declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: Record<string, unknown>) => void;
    ym?: (counterId: number, method: "reachGoal", goal: string, params?: Record<string, unknown>) => void;
  }
}

export function trackGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", goal, params);

  const counterId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  if (counterId) {
    window.ym?.(counterId, "reachGoal", goal, params);
  }
}
