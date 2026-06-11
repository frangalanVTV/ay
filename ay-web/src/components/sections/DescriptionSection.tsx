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
      style={{ background: "#e0b2e6" }}
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-[12%] bottom-[12%] w-[3px]"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(80,20,90,0.5), transparent)" }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="max-w-[1280px] mx-auto w-full">
        <div className="max-w-[820px]">

          {/* Section title */}
          <div className="overflow-hidden mb-10 sm:mb-12">
            <motion.h2
              className="font-black"
              style={{
                fontSize: "clamp(2.4rem, 6.5vw, 8rem)",
                lineHeight: 0.90,
                letterSpacing: "-0.025em",
                color: "#1a0520",
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
              color: "rgba(26,5,32,0.65)",
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
              className="inline-flex items-center justify-center px-8 text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300"
              style={{ border: "1px solid rgba(26,5,32,0.3)", height: "52px", color: "#1a0520" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(26,5,32,0.7)";
                (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(26,5,32,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(26,5,32,0.3)";
                (e.currentTarget as HTMLAnchorElement).style.background  = "transparent";
              }}
            >
              Ver servicios
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300"
              style={{ background: "#1a0520", color: "#e0b2e6", height: "52px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#2d0a3a"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#1a0520"; }}
            >
              Cotizar una activación
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
