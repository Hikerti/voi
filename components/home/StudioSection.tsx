"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedLink, { ShuffleText } from "@/components/ui/AnimatedLink";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface Project {
  slug: string;
  title: string;
  image?: string;
}

interface StudioSectionProps {
  projects?: Project[];
}

export default function StudioSection({ projects = [] }: StudioSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];

  function selectNext(direction: 1 | -1) {
    if (!projects.length) return;
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  }

  return (
    <section className="studio2">
      <div className="studio2__inner">
        <div className="studio2__head">
          <h2 className="studio2__title">
            Работы<br />в полный экран
          </h2>
          <AnimatedLink href="/portfolio" className="studio2__all">
            <ShuffleText tag="span">Посмотреть все проекты</ShuffleText>
          </AnimatedLink>
        </div>

        {projects.length > 0 ? (
          <>
            <div className="studio2__slider" aria-label="Избранные работы">
              <div className="studio2__slider-copy">
                <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                <h3>{activeProject.title}</h3>
                <p>
                  Крупный просмотр кейса без мелких карточек: больше воздуха, медиа и
                  понятный переход к деталям проекта.
                </p>
                <div className="studio2__slider-actions">
                  <button type="button" onClick={() => selectNext(-1)} aria-label="Предыдущая работа">
                    ←
                  </button>
                  <button type="button" onClick={() => selectNext(1)} aria-label="Следующая работа">
                    →
                  </button>
                </div>
              </div>

              <motion.div
                key={activeProject.slug}
                className="studio2__slider-media"
                initial={{ opacity: 0, x: 80, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <AnimatedLink href={`/portfolio/${activeProject.slug}`} className="studio2__card">
                  {activeProject.image ? (
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      sizes="(max-width: 991px) 100vw, 72vw"
                      className="studio2__card-img"
                      priority={activeIndex === 0}
                    />
                  ) : (
                    <div className="studio2__card-placeholder" />
                  )}
                  <div className="studio2__card-overlay">
                    <span className="studio2__card-title">{activeProject.title}</span>
                  </div>
                </AnimatedLink>
              </motion.div>
            </div>

            <div className="studio2__thumbs" role="tablist" aria-label="Выбор работы">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  className={i === activeIndex ? "is-active" : ""}
                  onClick={() => setActiveIndex(i)}
                  role="tab"
                  aria-selected={i === activeIndex}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {p.title}
                </button>
              ))}
            </div>

            <div className="studio2__grid" aria-label="Работы списком">
              {projects.map((p, i) => (
                <motion.div key={p.slug} transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.1 }}>
                  <AnimatedLink href={`/portfolio/${p.slug}`} className="studio2__card">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 991px) 50vw, 700px"
                        className="studio2__card-img"
                      />
                    ) : (
                      <div className="studio2__card-placeholder" />
                    )}
                    <div className="studio2__card-overlay">
                      <span className="studio2__card-title">{p.title}</span>
                    </div>
                  </AnimatedLink>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="studio2__empty">Проектов пока нет</div>
        )}
      </div>
    </section>
  );
}
