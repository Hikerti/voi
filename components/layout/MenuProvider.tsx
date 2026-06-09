"use client";

import { createContext, useContext, useState, useCallback } from "react";
import MobileMenu from "./MobileMenu";

interface MenuContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
}

export default function MenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setShowForm(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  return (
    <MenuContext.Provider value={{ isOpen, open, close, toggle }}>
      <MobileMenu
        isOpen={isOpen}
        onClose={close}
        showForm={showForm}
        onToggleForm={() => setShowForm((v) => !v)}
      />
      {children}
    </MenuContext.Provider>
  );
}
