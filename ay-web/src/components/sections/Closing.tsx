"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Closing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contacto"
      className="py-28 lg:py-44 relative overflow-hidden"
      style={{ backgroundColor: "#060310" }}
    >
      {/* Color light sources — more vivid than before */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 65% 75% at 12% 60%, rgba(109, 40, 217, 0.55) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 70% at 88% 40%, rgba(37, 99, 235, 0.45) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 50% at 50% 0%,   rgba(236, 72, 153, 0.20) 0%, transparent 55%)",
            "radial-gradient(ellipse 35% 40% at 65% 90%,  rgba(6, 182, 212, 0.18) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 text-center">

        <motion.p
          ref={ref}
          className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-8"
          style={{ color: "rgba(167, 139, 250, 0.8)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55 }}
        >
          Empezá ahora
        </motion.p>

        <motion.h2
          className="text-4xl sm:text-5xl lg:text-[3.8rem] font-bold tracking-tight text-white leading-tight mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12 }}
        >
          Ay! convierte la atención del público en participación, datos y experiencia.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.28 }}
        >
          <a
            href="mailto:hola@ay.digital"
            className="inline-flex items-center justify-center h-14 px-10 text-[#060310] text-[13px] font-semibold tracking-wide rounded-sm"
            style={{
              background: "linear-gradient(135deg, #A78BFA 0%, #60A5FA 60%, #34D399 100%)",
              transition: "box-shadow 0.25s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(167,139,250,0.45), 0 0 80px rgba(96,165,250,0.25)";
            }}
            onMouseLeave={e => {
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
