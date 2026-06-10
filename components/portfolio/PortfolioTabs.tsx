"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedLink from "@/components/ui/AnimatedLink";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const PORTFOLIO_POINTS = [
  { label: "Фокус", value: "1 экран", text: "Сначала показываем главный результат проекта." },
  { label: "Навигация", value: "5 кейсов", text: "Быстрый выбор без длинного полотна карточек." },
  { label: "Формат", value: "desktop + mobile", text: "На широком экране — витрина, на телефоне — свайп." },
];

export interface Project {
  slug: string;
  title: string;
  image?: string;
  tabIndex: number;
}

interface Props {
  projects?: Project[];
}

export default function PortfolioTabs({ projects = [] }: Props) {
  const orderedProjects = [...projects].sort((a, b) => a.tabIndex - b.tabIndex);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const mobileGalleryRef = useRef<HTMLElement | null>(null);
  const activeProject = orderedProjects[active] ?? orderedProjects[0];

  useEffect(() => {
    if (isPaused || orderedProjects.length < 2) return;

    const id = window.setInterval(() => {
      const gallery = mobileGalleryRef.current;
      if (!gallery || window.matchMedia("(min-width: 761px)").matches) return;

      const nextLeft = gallery.scrollLeft + gallery.clientWidth;
      const isAtEnd = nextLeft >= gallery.scrollWidth - gallery.clientWidth - 8;

      gallery.scrollTo({ left: isAtEnd ? 0 : nextLeft, behavior: "smooth" });
    }, 4200);

    return () => window.clearInterval(id);
  }, [isPaused, orderedProjects.length]);

  return (
    <main className="work-v2">
      <section className="work-v2__hero">
        <div className="work-v2__hero-copy">
          <p className="vs-kicker">работы</p>
          <h1>Кейсы, которые удобно смотреть</h1>
          <p>
            Собрали портфолио как витрину: крупный экран проекта, понятный
            список работ и короткие пояснения, по которым быстро считывается
            задача, формат и результат.
          </p>
        </div>

        <div className="work-v2__infographic" aria-label="Как устроена витрина проектов">
          <div className="work-v2__orbit" aria-hidden="true">
            <span>формат</span>
            <span>задача</span>
            <span>результат</span>
            <i />
          </div>
          <div className="work-v2__metrics">
            {PORTFOLIO_POINTS.map((point) => (
              <article className="work-v2__metric" key={point.label}>
                <span>{point.label}</span>
                <strong>{point.value}</strong>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {orderedProjects.length > 0 && activeProject ? (
        <>
          <section className="work-v2__desktop" aria-label="Выбранный проект">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeProject.slug}
                className="work-v2__feature"
                initial={{ opacity: 0, y: 24, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.99 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <AnimatedLink href={`/portfolio/${activeProject.slug}`} className="work-v2__feature-link">
                  <span className="work-v2__number">{String(active + 1).padStart(2, "0")}</span>
                  <div
                    className="work-v2__image"
                    style={activeProject.image ? { backgroundImage: `url(${activeProject.image})` } : undefined}
                  />
                  <div className="work-v2__caption">
                    <h2>{activeProject.title}</h2>
                    <span className="work-v2__open">Открыть кейс</span>
                  </div>
                </AnimatedLink>
              </motion.article>
            </AnimatePresence>

            <div className="work-v2__buttons" role="tablist" aria-label="Выбор проекта">
              {orderedProjects.map((project, index) => (
                <button
                  key={project.slug}
                  type="button"
                  className={active === index ? "is-active" : ""}
                  onClick={() => setActive(index)}
                  role="tab"
                  aria-selected={active === index}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{project.title}</strong>
                </button>
              ))}
            </div>
          </section>

          <section
            className="work-v2__mobile-gallery"
            aria-label="Кейсы Voitov Studio"
            ref={mobileGalleryRef}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {orderedProjects.map((project, index) => (
              <motion.article
                className="work-v2__card"
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.06, ease: EASE }}
              >
                <AnimatedLink href={`/portfolio/${project.slug}`} className="work-v2__card-link">
                  <span className="work-v2__number">{String(index + 1).padStart(2, "0")}</span>
                  <div
                    className="work-v2__image"
                    style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}
                  />
                  <div className="work-v2__caption">
                    <h2>{project.title}</h2>
                  </div>
                </AnimatedLink>
              </motion.article>
            ))}
          </section>
        </>
      ) : (
        <section className="work-v2__empty">Проекты скоро появятся.</section>
      )}
    </main>
  );
}
