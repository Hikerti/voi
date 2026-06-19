"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

export default function InternalPageFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <div className="route-frame">
        <Breadcrumbs />
        {children}
      </div>
    );
  }

  return (
    <div className="route-frame route-frame--internal">
      <Breadcrumbs />
      {children}
    </div>
  );
}
