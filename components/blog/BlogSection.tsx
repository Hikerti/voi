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
    <motion.div
      role="listitem"
      className="collection-item w-dyn-item"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: EASE }}
    >
      <AnimatedLink href={`/blog/${item.slug}`} className="news-link w-inline-block">
        <div className="div-block-45">
          {item.date && <div className="text-block-44">{item.date}</div>}
          <div
            className="imagenews"
            style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
          />
          <div className="div-block-46">
            <h2 className="heading-26">{item.title}</h2>
          </div>
        </div>
      </AnimatedLink>
    </motion.div>
  );
}

export default function BlogSection({ items = [] }: Props) {
  return (
    <div className="news-section-full" data-ix="section-3-animation">
      <div className="grid-line-1" />
      <div className="grid-line-2" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <h1 className="heading-25">
          Наши<br />Статьи
        </h1>
      </motion.div>

      <div className="collection-list-wrapper w-dyn-list">
        {items.length > 0 ? (
          <div role="list" className="w-clearfix w-dyn-items">
            {items.map((item, i) => (
              <NewsCard key={item.slug} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="w-dyn-empty">
            <div>Статьи скоро появятся.</div>
          </div>
        )}
      </div>
    </div>
  );
}
