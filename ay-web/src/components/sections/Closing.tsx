"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Closing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contacto"
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Subtle vignette so text stays readable over the starfield */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(1,11,31,0.55) 0%, transparent 75%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-8 lg:px-20 text-center">
        <motion.span
          ref={ref}
          className="block text-[10px] font-semibold tracking-[0.28em] uppercase mb-8 sm:mb-10"
          style={{ color: "rgba(125, 211, 252, 0.6)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55 }}
        >
          Empezá ahora
        </motion.span>

        <motion.h2
          className="font-black tracking-tight text-white leading-[0.95] mb-12 sm:mb-16 mx-auto"
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 7rem)",
            letterSpacing: "-0.025em",
            maxWidth: "900px",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        >
          Ay! convierte la atención del público en participación, datos y experiencia.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="mailto:hola@ay.digital"
            className="inline-flex items-center justify-center text-[12px] font-semibold tracking-[0.14em] uppercase text-[#010b1f] transition-all duration-300"
            style={{ height: "56px", paddingLeft: "2.5rem", paddingRight: "2.5rem", background: "rgba(255,255,255,0.90)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,1)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 48px rgba(125,211,252,0.30)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.90)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Hablemos de tu evento
          </a>
        </motion.div>
      </div>
    </section>
  );
}
