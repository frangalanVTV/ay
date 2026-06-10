"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const items = [
  "Concepto creativo",
  "Diseño de dinámica",
  "Landing o formulario",
  "QR de acceso",
  "Juego, trivia, encuesta o sorteo",
  "Diseño visual personalizado",
  "Base de datos de participantes",
  "Pantalla de resultados",
  "Ranking en vivo",
  "Integración con pantallas del evento",
  "Generación de contenido con AI",
  "Reporte posterior",
];

export function WhatIncludes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="activaciones" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#b0b0ae] mb-4 block">
              Activaciones
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0a0a0a] leading-tight mb-6">
              Qué puede incluir una activación.
            </h2>
            <p className="text-base text-[#6b6b6b] leading-relaxed max-w-sm">
              Cada proyecto es diferente. Estos son los componentes que podemos
              combinar y personalizar según el evento y el objetivo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {items.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-start gap-4 py-4 border-b border-[#f0f0ee]"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.04, duration: 0.45 }}
              >
                <span className="text-[10px] font-mono text-[#c0c0be] pt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-[#0a0a0a] leading-snug">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
