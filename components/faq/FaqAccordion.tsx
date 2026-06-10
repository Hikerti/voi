"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export interface FaqAccordionItem {
  slug: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqAccordionItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openSlug, setOpenSlug] = useState(items[0]?.slug ?? "");

  return (
    <section className="faq-accordion" aria-label="Частые вопросы">
      {items.map((item, index) => {
        const isOpen = openSlug === item.slug;

        return (
          <article className={isOpen ? "faq-accordion__item is-open" : "faq-accordion__item"} key={item.slug}>
            <button
              type="button"
              onClick={() => setOpenSlug(isOpen ? "" : item.slug)}
              aria-expanded={isOpen}
              aria-controls={`faq-${item.slug}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.question}</strong>
              <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${item.slug}`}
                  className="faq-accordion__answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.36, ease: EASE }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </section>
  );
}
