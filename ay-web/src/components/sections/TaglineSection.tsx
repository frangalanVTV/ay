"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LINES = ["AY! EL", "UNIVERSO", "ES EL LÍMITE."];

export function TaglineSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center overflow-hidden px-8 lg:px-20 py-24 sm:min-h-screen"
      style={{ background: "transparent" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }}
      />

      <div className="max-w-[1280px] mx-auto w-full">
        <motion.span
          className="block text-[10px] font-semibold tracking-[0.28em] uppercase mb-8 sm:mb-10"
          style={{ color: "rgba(255,255,255,0.22)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Ay! — Interactive Software
        </motion.span>

        {/* Three lines — each in its own overflow-hidden so spacing is identical */}
        <div className="mb-10 sm:mb-14">
          {LINES.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h2
                className="font-black text-white"
                style={{
                  fontSize: "clamp(2.4rem, 7.8vw, 10rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.03em",
                }}
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{
                  duration: 0.85,
                  delay: 0.2 + i * 0.13,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        <motion.p
          className="font-light tracking-wide"
          style={{
            fontSize: "clamp(1rem, 2.2vw, 2rem)",
            color: "rgba(255,255,255,0.40)",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.62 }}
        >
          Software interactivo para eventos.
        </motion.p>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)" }}
      />
    </section>
  );
}
