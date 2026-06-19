"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

export default function InternalPageFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={isHome ? "route-frame" : "route-frame route-frame--internal"}>
      <Breadcrumbs />
      {children}
    </div>
  );
}
