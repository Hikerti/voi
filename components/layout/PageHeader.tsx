"use client";

import { motion } from "framer-motion";
import AnimatedLink from "@/components/ui/AnimatedLink";
import { SITE } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface PageHeaderProps {
  wrapperClass?: string;
  backHref?: string;
  backLabel?: string;
  backLabelClass?: string;
}

export default function PageHeader({
  wrapperClass = "kybikm w-clearfix",
  backHref = "/",
  backLabel = "back",
  backLabelClass = "nynaxyi",
}: PageHeaderProps) {
  return (
    <motion.div
      className={wrapperClass}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <AnimatedLink href={backHref} className="back-parent w-inline-block">
        <div className={backLabelClass}>{backLabel}</div>
      </AnimatedLink>
      <AnimatedLink href="/" className="link-home vs-page-logo w-inline-block" aria-label={SITE.name}>
        <span>Voitov</span>
        <span>Studio</span>
      </AnimatedLink>
    </motion.div>
  );
}
