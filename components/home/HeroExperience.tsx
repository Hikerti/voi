const HERO_ITEMS = [
  { label: "Наш подход", href: "/o-nas", cta: "Подробнее о подходе", visual: "wrench" },
  { label: "Комплекс", href: "/services", cta: "Смотреть услуги", visual: "runner" },
  { label: "Портфолио", href: "/portfolio", cta: "Смотреть работу полностью", visual: "phone" },
  { label: "News", href: "/blog", cta: "Читать статьи", visual: "paper" },
] as const;

function Scene({ visual }: { visual: string }) {
  return (
    <div className={`home-ref__scene home-ref__scene--${visual}`} aria-hidden="true">
      <span className="home-ref__code">590105</span>
      <span className="home-ref__shape" />

      {visual === "wrench" && <img className="home-ref__tool" src="/images/winKKpered.png" alt="" />}

      {visual === "runner" && (
        <span className="home-ref__runner">
          <i />
          <b />
          <em />
          <small />
        </span>
      )}

      {visual === "phone" && (
        <span className="home-ref__phone">
          <i />
          <b />
        </span>
      )}

      {visual === "paper" && (
        <span className="home-ref__paper">
          <i />
          <b />
        </span>
      )}

      <strong className="home-ref__logo">VOITOV STUDIO</strong>
      <span className="home-ref__subline">creative club</span>
    </div>
  );
}

export default function HeroExperience() {
  return (
    <section className="home-ref" aria-label="Главный экран Voitov Studio">
      <div className="home-ref__grid" aria-hidden="true" />

      <div className="home-ref__hotspots" aria-label="Разделы первого экрана">
        {HERO_ITEMS.map((item) => (
          <a key={item.label} href={item.href} aria-label={item.label} />
        ))}
      </div>

      <div className="home-ref__doodles" aria-hidden="true">
        <span className="home-ref__doodle home-ref__doodle--circle" />
        <span className="home-ref__doodle home-ref__doodle--arrow">↗</span>
        <span className="home-ref__doodle home-ref__doodle--star">✦</span>
        <span className="home-ref__doodle home-ref__doodle--line" />
      </div>

      <div className="home-ref__scenes">
        {HERO_ITEMS.map((item) => (
          <Scene key={item.visual} visual={item.visual} />
        ))}
      </div>

      <div className="home-ref__ctas">
        {HERO_ITEMS.map((item) => (
          <a key={item.cta} href={item.href} className={`home-ref__cta home-ref__cta--${item.visual}`}>
            {item.cta}
            <span>→</span>
          </a>
        ))}
      </div>

      <nav className="home-ref__nav" aria-label="Разделы первого экрана">
        {HERO_ITEMS.map((item, index) => (
          <a key={item.label} href={item.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="home-ref__hint" aria-hidden="true">Наведите на четверть экрана</div>
    </section>
  );
}
