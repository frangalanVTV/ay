"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function DescriptionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center px-8 lg:px-20 py-20 sm:min-h-screen"
      style={{ background: "rgba(1, 11, 31, 0.75)" }}
    >
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="max-w-[800px]">
          <motion.p
            className="font-light leading-[1.65] mb-12 sm:mb-16"
            style={{
              fontSize: "clamp(1.15rem, 2.2vw, 2rem)",
              color: "rgba(255,255,255,0.65)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Diseñamos dinámicas digitales rápidas, personalizadas y medibles
            para captar datos, entretener audiencias y generar contenido en
            tiempo real.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#proceso"
              className="inline-flex items-center justify-center px-8 text-white text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.25)", height: "52px" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.7)";
                (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
                (e.currentTarget as HTMLAnchorElement).style.background  = "transparent";
              }}
            >
              Ver servicios
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 text-[#010b1f] text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.88)", height: "52px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,1)"; }}
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
