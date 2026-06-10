"use client";

import { motion } from "framer-motion";
import AnimatedLink from "@/components/ui/AnimatedLink";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface PageHeaderProps {
  wrapperClass?: string;
  backHref?: string;
  backLabel?: string | null;
  backLabelClass?: string;
}

export default function PageHeader({
  wrapperClass,
  backHref = "/",
  backLabel = "back",
  backLabelClass,
}: PageHeaderProps) {
  if (!backLabel || backLabel.toLowerCase() === "home") {
    return null;
  }

  return (
    <motion.div
      className={`vs-page-back ${wrapperClass ?? ""}`.trim()}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <AnimatedLink href={backHref} className="back-parent w-inline-block">
        <div className={backLabelClass ?? "vs-page-back__label"}>{backLabel}</div>
      </AnimatedLink>
    </motion.div>
  );
}
