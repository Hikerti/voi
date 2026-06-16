'use client';

import { useState } from "react";
import Link from "next/link";
import type { ServiceItem } from "@/lib/site-data";
import styles from "./ServiceSidebar.module.css";

interface ServiceSidebarProps {
  services: ServiceItem[];
  currentSlug: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  strategy: "Стратегия",
  design: "Дизайн",
  digital: "Digital",
  marketing: "Маркетинг",
  sites: "Сайты",
};

const CATEGORY_ORDER = ["strategy", "design", "digital", "marketing", "sites"];

export default function ServiceSidebar({ services, currentSlug }: ServiceSidebarProps) {
  // Group services by category
  const groups: { [key: string]: { label: string; items: ServiceItem[] } } = {};
  services.forEach((service) => {
    const { category } = service;
    const label = service.categoryLabel || CATEGORY_LABELS[category] || category;
    if (!groups[category]) {
      groups[category] = { label, items: [] };
    }
    groups[category].items.push(service);
  });
  const entries = Object.entries(groups).sort((a, b) => {
    const orderA = CATEGORY_ORDER.indexOf(a[0]);
    const orderB = CATEGORY_ORDER.indexOf(b[0]);

    if (orderA !== -1 || orderB !== -1) {
      return (orderA === -1 ? CATEGORY_ORDER.length : orderA) - (orderB === -1 ? CATEGORY_ORDER.length : orderB);
    }

    return a[1].label.localeCompare(b[1].label);
  });

  const currentService = services.find((item) => item.slug === currentSlug);
  const initialCategory = currentService?.category ?? null;
  const [openCategory, setOpenCategory] = useState<string | null>(initialCategory);

  return (
    <nav className={styles.sidebar}>
      {entries.map(([cat, { label, items }]) => {
        const isOpen = openCategory === cat;
        const listId = `service-sidebar-${cat}`;

        return (
          <div key={cat}>
            <button
              type="button"
              className={`${styles.category} ${isOpen ? styles.categoryOpen : ""}`.trim()}
              aria-controls={listId}
              aria-expanded={isOpen}
              onClick={() => setOpenCategory(isOpen ? null : cat)}
            >
              {label}
              <span className={styles.indicator} aria-hidden="true">{isOpen ? "-" : "+"}</span>
            </button>
            <ul id={listId} className={`${styles.list} ${isOpen ? styles.listOpen : ""}`.trim()}>
              {items.map((item) => {
                const isActive = item.slug === currentSlug;
                return (
                  <li key={item.slug} className={styles.listItem}>
                    {isActive ? (
                      <span className={`${styles.link} ${styles.linkActive}`.trim()} aria-current="page">
                        {item.title}
                      </span>
                    ) : (
                      <Link href={`/services/${item.slug}`} className={styles.link}>
                        {item.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
