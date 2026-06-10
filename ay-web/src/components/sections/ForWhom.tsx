"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const targets = [
  "Eventos corporativos",
  "Ferias y exposiciones",
  "Stands de marca",
  "Lanzamientos de producto",
  "Activaciones promocionales",
  "Conferencias",
  "Experiencias audiovisuales",
  "Acciones internas de empresa",
];

export function ForWhom() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="para-quien"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FDFCFF 0%, #F5F0FF 50%, #F0F5FF 100%)" }}
    >
      {/* Decorative color blob */}
      <div
        className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 85% 40%, rgba(139,92,246,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 block"
              style={{ color: "#7C3AED" }}
            >
              Para quién
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0a0a0a] mb-6 leading-tight">
              Hecho para marcas y equipos en acción.
            </h2>
            <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed max-w-md">
              Ay! está pensado para marcas, agencias, productoras, empresas y
              equipos de comunicación que necesitan sumar interacción, datos y
              contenido a sus eventos.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2.5 content-start">
            {targets.map((target, i) => (
              <motion.span
                key={target}
                className="px-4 py-2 text-sm rounded-full cursor-default"
                style={{
                  border: "1px solid rgba(124, 58, 237, 0.28)",
                  color: "#4C1D95",
                  background: "rgba(139, 92, 246, 0.07)",
                  transition: "background 0.22s, color 0.22s, box-shadow 0.22s, border-color 0.22s",
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.4 }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "linear-gradient(135deg, #6D28D9 0%, #2563EB 100%)";
                  el.style.color = "white";
                  el.style.borderColor = "transparent";
                  el.style.boxShadow = "0 4px 20px rgba(109, 40, 217, 0.30)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(139, 92, 246, 0.07)";
                  el.style.color = "#4C1D95";
                  el.style.borderColor = "rgba(124, 58, 237, 0.28)";
                  el.style.boxShadow = "none";
                }}
              >
                {target}
              </motion.span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
