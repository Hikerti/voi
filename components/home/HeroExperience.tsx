"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedLink from "@/components/ui/AnimatedLink";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const HERO_SLIDES = [
  {
    label: "Наш подход",
    title: "Делаем сайт, который хочется рассматривать",
    text: "Не собираем шаблон ради галочки: сначала ищем сильную подачу, затем собираем структуру, анимации и понятный путь к заявке.",
    href: "/services",
    cta: "Посмотреть подход",
  },
  {
    label: "Комплекс",
    title: "Берём дизайн, код и запуск в одной системе",
    text: "Прототип, визуальный стиль, адаптив, SEO-база и форма заявки работают вместе, чтобы сайт выглядел цельно с первого экрана.",
    href: "/services",
    cta: "Смотреть услуги",
  },
  {
    label: "Портфолио",
    title: "Показываем работы крупно, без мелкой суеты",
    text: "Кейсы раскрываются как витрина: большой экран, сильное изображение, понятный переход к полной работе и следующий шаг для клиента.",
    href: "/portfolio",
    cta: "Смотреть работы полностью",
  },
  {
    label: "News",
    title: "Пишем о запуске, структуре и росте сайта",
    text: "Короткие материалы помогают разобраться с SEO, контентом, доменом, дизайном и развитием после публикации.",
    href: "/blog",
    cta: "Читать статьи",
  },
];

export default function HeroExperience() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const wheelLock = useRef(false);

  function goTo(index: number) {
    setActive((index + HERO_SLIDES.length) % HERO_SLIDES.length);
  }

  function shift(direction: 1 | -1) {
    goTo(active + direction);
  }

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") shift(1);
      if (event.key === "ArrowLeft") shift(-1);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active]);

  function handleWheel(event: React.WheelEvent<HTMLElement>) {
    const intent = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(intent) < 28 || wheelLock.current) return;

    wheelLock.current = true;
    shift(intent > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 780);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLElement>) {
    if (touchStart.current === null) return;

    const diff = touchStart.current - event.changedTouches[0].clientX;
    touchStart.current = null;

    if (Math.abs(diff) < 44) return;
    shift(diff > 0 ? 1 : -1);
  }

  const current = HERO_SLIDES[active];

  return (
    <section
      className="home-hx"
      aria-label="Главный экран Voitov Studio"
      onWheel={handleWheel}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div className="home-hx__grid" aria-hidden="true" />

      <motion.div
        className="home-hx__brand-scene"
        initial={{ opacity: 0, scale: 0.92, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="home-hx__code">590105</span>
        <div className="home-hx__square" />
        <img className="home-hx__tool" src="/images/winKKpered.png" alt="" draggable="false" />
        <strong className="home-hx__wordmark">
          <span>VOITOV</span>
          <span>STUDIO</span>
        </strong>
        <span className="home-hx__caption">voitov studio</span>
      </motion.div>

      <div className="home-hx__decor" aria-hidden="true">
        <span className="home-hx__doodle home-hx__doodle--star">✦</span>
        <span className="home-hx__doodle home-hx__doodle--arrow">↗</span>
        <span className="home-hx__doodle home-hx__doodle--bracket">⌁</span>
        <span className="home-hx__doodle home-hx__doodle--line" />
      </div>

      <div className="home-hx__track" style={{ transform: `translateX(${-active * 100}vw)` }}>
        {HERO_SLIDES.map((slide, index) => (
          <article className="home-hx__panel" key={slide.label} aria-hidden={active !== index}>
            <div className="home-hx__panel-inner">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.label}
          className="home-hx__cta-wrap"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <AnimatedLink href={current.href} className="home-hx__cta">
            {current.cta}
            <span>→</span>
          </AnimatedLink>
        </motion.div>
      </AnimatePresence>

      <nav className="home-hx__nav" aria-label="Разделы первого экрана">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            className={active === index ? "is-active" : ""}
            onClick={() => goTo(index)}
            aria-current={active === index ? "true" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {slide.label}
          </button>
        ))}
      </nav>

      <div className="home-hx__hint" aria-hidden="true">Смахните вбок</div>
    </section>
  );
}
