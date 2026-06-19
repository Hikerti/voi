"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import ServiceCatalogSidebar from "@/components/navigation/ServiceCatalogSidebar";
import AnimatedLink from "@/components/ui/AnimatedLink";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface Props {
  desktopClass: string;
  leftIconClass: string;
  spacerClass: string;
  rightClass: string;
  contentClass: string;
  mobileClass: string;
  mobileHeroClass: string;
  mobileContentClass: string;
  icon: string;
  desktopContent: ReactNode;
  mobileContent: ReactNode;
  nextHref: string;
  nextLabel: string;
}

export default function ServiceDetailSection({
  icon,
  desktopContent,
  nextHref,
  nextLabel,
}: Props) {
  const cleanNextLabel = nextLabel.replace(/^Next\s+/i, "").trim();

  return (
    <main className="service-detail-page service-detail-page--category">
      <div className="service-page-intro service-page-intro--category">
        <ServiceCatalogSidebar />

        <section className="service-detail-page__layout service-page-intro__content">
          <motion.div
            className="service-detail-page__visual"
            initial={{ x: -28, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: EASE }}
            aria-hidden="true"
          >
            <img src={icon} alt="" />
          </motion.div>

          <div className="service-detail-page__content">
            <motion.div
              className="service-detail-page__copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
            >
              {desktopContent}
            </motion.div>

            <AnimatedLink href={nextHref} className="service-detail-page__next">
              <span>Следующий раздел</span>
              <strong>{cleanNextLabel}</strong>
              <span aria-hidden="true">→</span>
            </AnimatedLink>
          </div>
        </section>
      </div>
    </main>
  );
}
