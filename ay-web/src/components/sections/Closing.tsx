"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Closing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="contacto"
      className="relative py-24 sm:py-36 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Very subtle vignette for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(1,11,31,0.6) 0%, transparent 80%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-8 lg:px-20 text-center">

        <motion.span
          ref={ref}
          className="block text-[10px] font-semibold tracking-[0.28em] uppercase mb-8 sm:mb-10"
          style={{ color: "rgba(125, 211, 252, 0.55)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Empezá ahora
        </motion.span>

        {/* Same headline style as section titles */}
        <div className="overflow-hidden mb-12 sm:mb-16">
          <motion.h2
            className="font-black text-white mx-auto"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 6.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              maxWidth: "960px",
            }}
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            AY! CONVIERTE LA ATENCIÓN EN PARTICIPACIÓN, DATOS Y EXPERIENCIA.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <a
            href="mailto:hola@ay.digital"
            className="inline-flex items-center justify-center text-[12px] font-semibold tracking-[0.14em] uppercase text-[#010b1f] transition-all duration-300"
            style={{ height: "52px", paddingLeft: "2.5rem", paddingRight: "2.5rem", background: "rgba(255,255,255,0.88)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(125,211,252,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.88)";
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
