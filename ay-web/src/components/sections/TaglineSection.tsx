"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LINES = ["AY! EL", "UNIVERSO", "ES EL LÍMITE."];

export function TaglineSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 flex flex-col justify-center overflow-hidden px-8 lg:px-20"
      style={{ background: "transparent" }}
    >
      {/* Faint atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 60% at 100% 40%, rgba(99,102,241,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 40% at 0% 80%,  rgba(14,165,233,0.06) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      <div className="max-w-[1280px] mx-auto w-full">
        {/* Headline — each line is its own overflow-hidden clip so spacing is pixel-identical */}
        <div className="mb-10 sm:mb-14">
          {LINES.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h2
                className="font-black text-white block"
                style={{
                  fontSize: "clamp(2.6rem, 9.5vw, 13rem)",
                  lineHeight: 0.90,
                  letterSpacing: "-0.035em",
                }}
                initial={{ y: "108%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{
                  duration: 1.0,
                  delay: 0.1 + i * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        <motion.p
          className="font-light"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.8rem)",
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.04em",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          Software interactivo para eventos.
        </motion.p>
      </div>
    </section>
  );
}
