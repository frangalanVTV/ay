"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const phases = [
  {
    num: "01",
    label: "Antes del evento",
    items: [
      "Concepto creativo",
      "Diseño de dinámica",
      "Landing o formulario",
      "Diseño visual personalizado",
    ],
  },
  {
    num: "02",
    label: "Durante el evento",
    items: [
      "QR de acceso",
      "Juego, trivia, encuesta o sorteo",
      "Generación de contenido con AI",
      "Integración con pantallas del evento",
      "Ranking en vivo",
    ],
  },
  {
    num: "03",
    label: "Después del evento",
    items: [
      "Base de datos de participantes",
      "Pantalla de resultados",
      "Reporte posterior",
    ],
  },
];

export function WhatIncludes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="activaciones"
      className="py-24 lg:py-32"
      style={{ background: "#F0F9FF" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">

        <motion.div
          ref={ref}
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 block"
            style={{ color: "#0EA5E9" }}
          >
            Activaciones
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0a0a0a] leading-tight mb-5">
            Qué puede incluir una activación.
          </h2>
          <p className="text-base text-[#6b6b6b] leading-relaxed max-w-lg">
            Cada proyecto es diferente. Combinamos estos componentes según el evento, el objetivo y el tiempo disponible.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: "1px solid rgba(14,165,233,0.15)" }}
        >
          {phases.map((phase, pi) => (
            <motion.div
              key={phase.num}
              style={{
                paddingLeft: pi > 0 ? "2.5rem" : 0,
                paddingRight: pi < 2 ? "2.5rem" : 0,
                borderLeft: pi > 0 ? "1px solid rgba(14,165,233,0.15)" : "none",
              }}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + pi * 0.12, duration: 0.55 }}
            >
              <div className="pt-10 pb-2">
                <span
                  className="text-[11px] font-mono block mb-3"
                  style={{
                    background: "linear-gradient(135deg, #1E40AF, #0EA5E9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {phase.num}
                </span>
                <h3
                  className="text-xl font-semibold mb-7 leading-snug"
                  style={{ color: "#0369A1" }}
                >
                  {phase.label}
                </h3>
              </div>
              <ul>
                {phase.items.map((item, ii) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 py-3"
                    style={{ borderBottom: "1px solid rgba(14,165,233,0.10)" }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + pi * 0.1 + ii * 0.06, duration: 0.4 }}
                  >
                    <span className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#38BDF8" }} />
                    <span className="text-sm text-[#0a0a0a] leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
