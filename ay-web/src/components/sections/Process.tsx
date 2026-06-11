"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "ENTENDEMOS\nEL OBJETIVO",
    desc: "Primero entendemos si el evento necesita captar datos, entretener, comunicar, premiar, medir o generar contenido. Sin esto, no avanzamos.",
  },
  {
    num: "02",
    title: "DISEÑAMOS\nLA DINÁMICA",
    desc: "Creamos una experiencia simple y efectiva, adaptada al público, al espacio, al tiempo disponible y a la identidad visual de la marca.",
  },
  {
    num: "03",
    title: "ENTREGAMOS\nLISTA PARA USAR",
    desc: "Dejamos la solución preparada para el evento, con materiales digitales, instrucciones claras y soporte para implementación.",
  },
];

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id={index === 0 ? "proceso" : undefined}
      className="relative overflow-hidden px-8 lg:px-20 py-20 sm:py-28 lg:min-h-screen lg:flex lg:items-center"
      style={{ background: `rgba(1, 11, 31, ${0.90 + index * 0.03})` }}
    >
      {/* Ghost step number */}
      <div
        className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-black leading-none"
          style={{
            fontSize: "clamp(10rem, 28vw, 36rem)",
            color: "rgba(255,255,255,0.028)",
            transform: "translateX(8%)",
            letterSpacing: "-0.05em",
          }}
        >
          {step.num}
        </span>
      </div>

      <motion.div
        className="absolute top-0 left-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.07)" }}
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : {}}
        transition={{ duration: 1.2, delay: 0.05, ease: "easeOut" }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto w-full">
        <motion.span
          className="block font-mono text-[11px] tracking-[0.3em] mb-8 sm:mb-10"
          style={{ color: "rgba(255,255,255,0.22)" }}
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          — {step.num}
        </motion.span>

        <div className="mb-8 sm:mb-10">
          {step.title.split("\n").map((line, li) => (
            <div key={li} className="overflow-hidden">
              <motion.h3
                className="font-black text-white"
                style={{
                  fontSize: "clamp(2.4rem, 6.5vw, 8rem)",
                  lineHeight: 0.90,
                  letterSpacing: "-0.025em",
                }}
                initial={{ y: "105%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{
                  duration: 0.85,
                  delay: 0.3 + li * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.h3>
            </div>
          ))}
        </div>

        <motion.p
          className="font-light leading-relaxed max-w-[560px]"
          style={{
            fontSize: "clamp(0.95rem, 1.4vw, 1.3rem)",
            color: "rgba(255,255,255,0.45)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          {step.desc}
        </motion.p>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <>
      {steps.map((step, i) => (
        <Step key={step.num} step={step} index={i} />
      ))}
    </>
  );
}
