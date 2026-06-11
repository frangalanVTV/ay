"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Hero() {
  const subRef = useRef<HTMLDivElement>(null);
  const subInView = useInView(subRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* ── Pantalla 1: Solo la frase ─────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
        style={{ paddingTop: "5rem" }}
      >
        <motion.h1
          className="text-center px-8 lg:px-20 font-black tracking-[-0.025em] leading-[1.08]"
          style={{
            fontSize: "clamp(2rem, 2.8vw, 3.6rem)",
            color: "#C1440E",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          Software interactivo para eventos. Del brief al cielo.
        </motion.h1>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <motion.div
            className="w-px h-10 mx-auto"
            style={{ background: "linear-gradient(to bottom, #C1440E, transparent)" }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── Pantalla 2: Descripción + CTAs ───────────────────────────────── */}
      <section
        ref={subRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "#ffffff" }}
      >
        <div className="max-w-[700px] mx-auto px-8 lg:px-16 text-center">
          <motion.p
            className="text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem] text-[#0a0a0a] leading-[1.55] font-light mb-14"
            initial={{ opacity: 0, y: 24 }}
            animate={subInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Diseñamos dinámicas digitales rápidas, personalizadas y medibles para
            captar datos, entretener audiencias y generar contenido en tiempo real.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 18 }}
            animate={subInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
          >
            <a
              href="#servicios"
              className="inline-flex items-center justify-center h-12 px-8 text-white text-[13px] font-semibold tracking-wide rounded-sm transition-shadow"
              style={{ background: "linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 28px rgba(14,165,233,0.45)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              Ver servicios
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center h-12 px-8 border border-[#d0d0ce] text-[#0a0a0a] text-[13px] font-semibold tracking-wide hover:border-[#0a0a0a] transition-colors rounded-sm"
            >
              Cotizar una activación
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
