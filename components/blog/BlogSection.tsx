"use client";

import { motion } from "framer-motion";
import AnimatedLink from "@/components/ui/AnimatedLink";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export interface NewsItem {
  slug: string;
  title: string;
  date?: string;
  image?: string;
  subtitle?: string;
}

interface Props {
  items?: NewsItem[];
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  return (
    <motion.article
      className="blog-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay: Math.min(index, 3) * 0.06, ease: EASE }}
    >
      <AnimatedLink href={`/blog/${item.slug}`} className="blog-card__link">
        <div
          className="blog-card__image"
          style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
        />
        <div className="blog-card__body">
          {item.date && <span>{item.date}</span>}
          <h2>{item.title}</h2>
          {item.subtitle && <p>{item.subtitle}</p>}
          <i aria-hidden="true">→</i>
        </div>
      </AnimatedLink>
    </motion.article>
  );
}

export default function BlogSection({ items = [] }: Props) {
  return (
    <main className="blog-page">
      <section className="blog-page__hero">
        <p className="vs-kicker">статьи</p>
        <h1>Практичные материалы о сайтах, дизайне и запуске</h1>
        <p>
          Собираем заметки, которые помогают принимать решения по структуре,
          SEO, контенту, домену и развитию сайта после публикации.
        </p>
      </section>

      {items.length > 0 ? (
        <section className="blog-page__grid" aria-label="Список статей">
          {items.map((item, i) => (
            <NewsCard key={item.slug} item={item} index={i} />
          ))}
        </section>
      ) : (
        <section className="blog-page__empty">Статьи скоро появятся.</section>
      )}
    </main>
  );
}
