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
    <section id="para-quien" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#b0b0ae] mb-4 block">
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
                className="px-4 py-2 border border-[#e5e5e3] text-sm text-[#0a0a0a] rounded-full hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a] transition-all duration-200 cursor-default"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.4 }}
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
