"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/Logo";
import { Menu } from "./Menu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(1, 11, 31, 0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo text: opacity starts at 0, CosmicCanvas drives it via scroll */}
            <a
              id="header-logo"
              href="#"
              aria-label="Ay! inicio"
              style={{
                opacity: 0,
                transition: "opacity 0.5s ease",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <Logo />
            </a>

            <button
              onClick={() => setMenuOpen(true)}
              className="text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
              style={{ color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.95)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)"; }}
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
