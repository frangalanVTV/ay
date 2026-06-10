"use client";

import { motion } from "framer-motion";
import { LiveDemo } from "@/components/ui/LiveDemo";
import { LiquidShaderBackground } from "@/components/ui/LiquidShaderBackground";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      <LiquidShaderBackground opacity={1.00} intensity={1.10} hue={24} />

      {/* Desktop: horizontal white buffer — text left, shader right */}
      <div
        className="absolute inset-0 pointer-events-none hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.30) 44%, rgba(255,255,255,0.0) 66%)",
        }}
      />
      {/* Mobile: vertical white buffer — shader shows through more at bottom */}
      <div
        className="absolute inset-0 pointer-events-none block sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.42) 55%, rgba(255,255,255,0.10) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-center py-20 lg:py-28">

          {/* Left: copy */}
          <div>
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "#7C3AED" }}>
                Software interactivo para eventos
              </span>
            </motion.div>

            <motion.h1
              className="text-[2.8rem] sm:text-[3.8rem] lg:text-[4.8rem] font-bold tracking-tight leading-[1.04] text-[#0a0a0a] mb-8"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              Recursos interactivos para eventos{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6D28D9 0%, #2563EB 70%, #06B6D4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                en vivo.
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-[#6b6b6b] leading-relaxed mb-12 max-w-[520px]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
            >
              Diseñamos dinámicas digitales rápidas, personalizadas y medibles
              para captar datos, entretener audiencias y generar contenido en
              tiempo real.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.48 }}
            >
              <a
                href="#servicios"
                className="inline-flex items-center justify-center h-12 px-8 text-white text-[13px] font-semibold tracking-wide rounded-sm transition-shadow"
                style={{ background: "linear-gradient(135deg, #6D28D9 0%, #2563EB 100%)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 28px rgba(109,40,217,0.45)";
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
                Crear una activación
              </a>
            </motion.div>
          </div>

          {/* Right: animated demo widget */}
          <motion.div
            className="flex items-center justify-center lg:justify-end pb-16 lg:pb-0 pt-10 lg:pt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <LiveDemo />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, #7C3AED, transparent)" }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
