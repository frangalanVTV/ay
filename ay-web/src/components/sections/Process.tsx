"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Entendemos el objetivo",
    desc: "Primero entendemos si el evento necesita captar datos, entretener, comunicar, premiar, medir o generar contenido. Sin esto, no avanzamos.",
  },
  {
    num: "02",
    title: "Diseñamos la dinámica",
    desc: "Creamos una experiencia simple y efectiva, adaptada al público, al espacio, al tiempo disponible y a la identidad visual de la marca.",
  },
  {
    num: "03",
    title: "Entregamos lista para usar",
    desc: "Dejamos la solución preparada para el evento, con materiales digitales, instrucciones claras y soporte para implementación.",
  },
];

export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="proceso" className="py-24 lg:py-32 bg-[#f7f7f5]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">

        <motion.div
          ref={ref}
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#b0b0ae] mb-4 block">
            Proceso
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0a0a0a]">
            Cómo trabajamos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#e5e5e3]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="py-10 lg:py-0"
              style={{
                paddingLeft: i > 0 ? "3.5rem" : 0,
                paddingRight: i < 2 ? "3.5rem" : 0,
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.6 }}
            >
              <span className="text-[11px] font-mono text-[#b0b0ae] block mb-8">
                {step.num}
              </span>
              <h3 className="text-2xl font-semibold text-[#0a0a0a] mb-4 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
