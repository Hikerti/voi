"use client";

import { useEffect, useRef } from "react";

interface GlitchOptions {
  glitch1Min?: number;
  glitch1Max?: number;
  glitch2Min?: number;
  glitch2Max?: number;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useGlitch(options: GlitchOptions = {}) {
  const {
    glitch1Min = 400,
    glitch1Max = 600,
    glitch2Min = 10,
    glitch2Max = 300,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const frontRef = useRef<HTMLElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = ref.current;
    const front = frontRef.current;
    if (!el) return;

    const runBack = () => {
      const top = rand(10, 1900);
      const bottom = rand(10, 1300);
      el.style.clip = `rect(${top}px, 9999px, ${bottom}px, 0)`;
      el.style.left = `${rand(0, 16)}px`;
      el.style.right = `${rand(0, 16)}px`;
      const t = setTimeout(runBack, rand(glitch1Min, glitch1Max));
      timers.current.push(t);
    };

    const runFront = () => {
      if (!front) return;
      const top = rand(10, 1900);
      const bottom = rand(10, 1300);
      const scale = (Math.random() * 0.2 + 0.9).toFixed(2);
      front.style.clip = `rect(${top}px, 9999px, ${bottom}px, 0)`;
      front.style.left = `${rand(0, 40)}px`;
      front.style.right = `${rand(0, 40)}px`;
      front.style.transform = `scale(${scale})`;
      const t = setTimeout(runFront, rand(glitch2Min, glitch2Max));
      timers.current.push(t);
    };

    runBack();
    runFront();

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [glitch1Min, glitch1Max, glitch2Min, glitch2Max]);

  return { ref, frontRef };
}
