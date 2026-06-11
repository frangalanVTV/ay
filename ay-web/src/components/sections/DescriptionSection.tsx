"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function DescriptionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center px-8 lg:px-20 py-24 sm:min-h-screen overflow-hidden"
      style={{ background: "rgba(2, 8, 26, 0.94)" }}
    >
      {/* Cyan glow — right side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 55% 65% at 105% 50%, rgba(14,165,233,0.11) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 30% at  -5% 20%, rgba(99,102,241,0.08) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-[12%] bottom-[12%] w-[3px]"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(14,165,233,0.6), transparent)" }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="max-w-[1280px] mx-auto w-full">
        <div className="max-w-[820px]">

          {/* Section title */}
          <div className="overflow-hidden mb-10 sm:mb-12">
            <motion.h2
              className="font-black text-white"
              style={{
                fontSize: "clamp(2.4rem, 6.5vw, 8rem)",
                lineHeight: 0.90,
                letterSpacing: "-0.025em",
              }}
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              QUÉ<br className="sm:hidden" />{" "}HACEMOS?
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            className="font-light leading-[1.7] mb-12 sm:mb-14"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.6rem)",
              color: "rgba(255,255,255,0.55)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            Diseñamos dinámicas digitales rápidas, personalizadas y medibles
            para captar datos, entretener audiencias y generar contenido en
            tiempo real.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#proceso"
              className="inline-flex items-center justify-center px-8 text-white text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.22)", height: "52px" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.65)";
                (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.22)";
                (e.currentTarget as HTMLAnchorElement).style.background  = "transparent";
              }}
            >
              Ver servicios
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 text-[#010b1f] text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.88)", height: "52px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.88)"; }}
            >
              Cotizar una activación
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
