"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Closing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacto" className="py-28 lg:py-44 bg-[#0a0a0a] relative overflow-hidden">

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 text-center">

        <motion.p
          ref={ref}
          className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#4a4a4a] mb-8"
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
            className="inline-flex items-center justify-center h-14 px-10 bg-white text-[#0a0a0a] text-[13px] font-semibold tracking-wide hover:bg-[#f0f0ee] transition-colors rounded-sm"
          >
            Hablemos de tu evento
          </a>
        </motion.div>

      </div>
    </section>
  );
}
