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
  // Sort categories alphabetically by label
  const entries = Object.entries(groups).sort((a, b) => a[1].label.localeCompare(b[1].label));

  const currentService = services.find((item) => item.slug === currentSlug);
  const initialCategory = currentService?.category ?? null;
  const [openCategory, setOpenCategory] = useState<string | null>(initialCategory);

  return (
    <nav className={styles.sidebar}>
      {entries.map(([cat, { label, items }]) => {
        const isOpen = openCategory === cat;
        return (
          <div key={cat}>
            <button
              type="button"
              className={`${styles.category} ${isOpen ? styles.categoryOpen : ""}`.trim()}
              onClick={() => setOpenCategory(isOpen ? null : cat)}
            >
              {label}
              <span aria-hidden="true">{isOpen ? "▾" : "▸"}</span>
            </button>
            <ul className={`${styles.list} ${isOpen ? styles.listOpen : ""}`.trim()}>
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
