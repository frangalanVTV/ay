"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { label: "Qué hacemos", href: "#servicios" },
  { label: "Para quién es", href: "#para-quien" },
  { label: "Proceso", href: "#proceso" },
  { label: "Activaciones", href: "#activaciones" },
  { label: "Contacto", href: "#contacto" },
];

export function Menu({ open, onClose }: MenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-white flex flex-col"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Top bar */}
          <div className="max-w-[1280px] mx-auto w-full px-6 sm:px-10 lg:px-16">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <Logo />
              <button
                onClick={onClose}
                className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0a0a0a] hover:opacity-40 transition-opacity"
                aria-label="Cerrar menú"
              >
                Cerrar
              </button>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-[1280px] mx-auto w-full">
            <nav className="border-t border-[#e5e5e3]">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  className="border-b border-[#e5e5e3]"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.07,
                    duration: 0.45,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="block py-5 sm:py-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a0a0a] hover:opacity-25 transition-opacity"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="mt-12 flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <a
                href="mailto:hola@ay.digital"
                className="text-sm text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
              >
                hola@ay.digital
              </a>
              <span className="text-[#e5e5e3]">—</span>
              <span className="text-sm text-[#b0b0ae]">
                Recursos interactivos para eventos
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
