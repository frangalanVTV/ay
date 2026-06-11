"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const steps = [
  {
    num: "01",
    title: ["ENTENDEMOS", "EL OBJETIVO"],
    desc: "Primero entendemos si el evento necesita captar datos, entretener, comunicar, premiar, medir o generar contenido. Sin esto, no avanzamos.",
    accent: "#3b82f6",
    bg: "rgba(1, 10, 28, 0.97)",
    glow: "radial-gradient(ellipse 55% 60% at -8% 55%, rgba(59,130,246,0.14) 0%, transparent 65%)",
  },
  {
    num: "02",
    title: ["DISEÑAMOS", "LA DINÁMICA"],
    desc: "Creamos una experiencia simple y efectiva, adaptada al público, al espacio, al tiempo disponible y a la identidad visual de la marca.",
    accent: "#06b6d4",
    bg: "rgba(1, 9, 24, 0.97)",
    glow: "radial-gradient(ellipse 55% 60% at 108% 45%, rgba(6,182,212,0.14) 0%, transparent 65%)",
  },
  {
    num: "03",
    title: ["ENTREGAMOS", "LISTA PARA USAR"],
    desc: "Dejamos la solución preparada para el evento, con materiales digitales, instrucciones claras y soporte para implementación.",
    accent: "#a78bfa",
    bg: "rgba(2, 7, 22, 0.97)",
    glow: "radial-gradient(ellipse 55% 60% at 50% 110%, rgba(167,139,250,0.14) 0%, transparent 65%)",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = v < 0.33 ? 0 : v < 0.66 ? 1 : 2;
    setActive(idx);
  });

  const step = steps[active];

  return (
    <div id="proceso" ref={containerRef} style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background layer — cross-fades between steps */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${active}`}
            className="absolute inset-0"
            style={{ background: step.bg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
        </AnimatePresence>

        {/* Glow overlay */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`glow-${active}`}
            className="absolute inset-0 pointer-events-none"
            style={{ background: step.glow }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>

        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-[14%] bottom-[14%] w-[3px]"
          animate={{ background: step.accent }}
          transition={{ duration: 0.5 }}
        />

        {/* Ghost step number */}
        <div
          className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={step.num}
              className="font-black leading-none"
              style={{
                fontSize: "clamp(10rem, 26vw, 34rem)",
                color: "rgba(255,255,255,0.03)",
                transform: "translateX(8%)",
                letterSpacing: "-0.05em",
              }}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
            >
              {step.num}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Step progress — top bar */}
        <div className="absolute top-6 sm:top-8 left-8 lg:left-20 right-8 lg:right-20 z-20">
          <div className="flex items-center gap-4 sm:gap-8">
            {steps.map((s, i) => (
              <motion.span
                key={s.num}
                className="text-[10px] font-semibold tracking-[0.22em] uppercase"
                animate={{
                  color: i === active ? step.accent : "rgba(255,255,255,0.2)",
                  opacity: i === active ? 1 : 0.5,
                }}
                transition={{ duration: 0.4 }}
              >
                ETAPA {s.num}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Main content — cross-fades between steps */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-20">
          <div className="max-w-[1280px] mx-auto w-full">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -48 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              >
                {/* Title */}
                <div className="mb-8 sm:mb-10">
                  {step.title.map((line) => (
                    <div key={line} className="overflow-hidden">
                      <h3
                        className="font-black text-white block"
                        style={{
                          fontSize: "clamp(2.4rem, 6.5vw, 8rem)",
                          lineHeight: 0.90,
                          letterSpacing: "-0.025em",
                        }}
                      >
                        {line}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p
                  className="font-light leading-relaxed max-w-[560px]"
                  style={{
                    fontSize: "clamp(0.95rem, 1.4vw, 1.3rem)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-6 sm:bottom-8 left-8 lg:left-20 right-8 lg:right-20 z-20">
          <div className="h-px mb-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <motion.div
            className="h-px"
            animate={{
              background: step.accent,
              width: `${((active + 1) / steps.length) * 100}%`,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

      </div>
    </div>
  );
}
