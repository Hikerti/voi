"use client";

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
          <div className="studio2__grid">
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
        ) : (
          <div className="studio2__empty">Проектов пока нет</div>
        )}
      </div>
    </section>
  );
}
