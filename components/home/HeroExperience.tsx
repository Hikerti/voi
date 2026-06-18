"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type TouchEvent,
  useRef,
  useState,
} from "react";

const HERO_ITEMS = [
  {
    label: "Наш подход",
    href: "/o-nas",
    visual: "runner",
    shape: "/images/winxpered.png",
    left: "/images/win1left.png",
    right: "/images/win1right.png",
  },
  {
    label: "Комплекс",
    href: "/services",
    visual: "wrench",
    shape: "/images/winKKpered.png",
    left: "/images/win2left.png",
    right: "/images/win2right.png",
  },
  {
    label: "Портфолио",
    href: "/portfolio",
    visual: "phone",
    shape: "/images/winOpered.png",
    left: "/images/win3left.png",
    right: "/images/win3right.png",
  },
  {
    label: "News",
    href: "/blog",
    visual: "paper",
    shape: "/images/winRRpered.png",
    left: "/images/win4left.png",
    right: "/images/win4right.png",
  },
] as const;

type HeroItem = (typeof HERO_ITEMS)[number];
type AssetStyle = CSSProperties & { "--asset-url": string };
type PointerVars = CSSProperties & { "--mx": string; "--my": string };

function assetStyle(src: string): AssetStyle {
  return { "--asset-url": `url("${src}")` };
}

function Scene({ item }: { item: HeroItem }) {
  return (
    <div className={`home-ref__scene home-ref__scene--${item.visual}`} aria-hidden="true">
      <span className="home-ref__code">590105</span>
      <span className="home-ref__orbit" />
      <span className="home-ref__shape" style={assetStyle(item.shape)} />
      <span
        className="home-ref__asset home-ref__asset--left"
        style={assetStyle(item.left)}
      />
      <span
        className="home-ref__asset home-ref__asset--right"
        style={assetStyle(item.right)}
      />
      <span className="home-ref__split" />
      <strong className="home-ref__logo">VOITOV STUDIO</strong>
      <span className="home-ref__subline">creative club</span>
    </div>
  );
}

export default function HeroExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerVars, setPointerVars] = useState<PointerVars>({
    "--mx": "0",
    "--my": "0",
  });
  const touchStartX = useRef<number | null>(null);

  function selectRelative(direction: 1 | -1) {
    setActiveIndex((current) => (current + direction + HERO_ITEMS.length) % HERO_ITEMS.length);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setPointerVars({
      "--mx": x.toFixed(3),
      "--my": y.toFixed(3),
    });
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;

    if (startX == null || endX == null) return;

    const delta = endX - startX;
    if (Math.abs(delta) < 44) return;

    selectRelative(delta < 0 ? 1 : -1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight") selectRelative(1);
    if (event.key === "ArrowLeft") selectRelative(-1);
  }

  return (
    <section
      className="home-ref"
      aria-label="Главный экран Voitov Studio"
      aria-roledescription="слайдер"
      data-active={activeIndex}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointerVars({ "--mx": "0", "--my": "0" })}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStartX.current = null;
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={pointerVars}
    >
      <div className="home-ref__grid" aria-hidden="true" />
      <div className="home-ref__glow" aria-hidden="true" />

      <div className="home-ref__hotspots" aria-label="Разделы первого экрана">
        {HERO_ITEMS.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            onPointerEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <div className="home-ref__scenes">
        {HERO_ITEMS.map((item) => (
          <Scene key={item.visual} item={item} />
        ))}
      </div>

      <nav className="home-ref__nav" aria-label="Разделы первого экрана">
        {HERO_ITEMS.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className={activeIndex === index ? "is-active" : undefined}
            onPointerEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="home-ref__hint" aria-hidden="true">
        Наведите на четверть экрана
      </div>
      <div className="home-ref__mobile-hint" aria-hidden="true">
        Листайте пальцем
      </div>
      <p className="home-ref__status" aria-live="polite">
        {activeIndex + 1} из {HERO_ITEMS.length}: {HERO_ITEMS[activeIndex].label}
      </p>
    </section>
  );
}
