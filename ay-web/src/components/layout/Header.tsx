"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/Logo";
import { Menu } from "./Menu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid #e5e5e3" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="#" aria-label="Ay! inicio">
              <Logo />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0a0a0a] hover:opacity-40 transition-opacity"
              aria-label="Abrir menú"
            >
              Menú
            </button>
          </div>
        </div>
      </header>
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
