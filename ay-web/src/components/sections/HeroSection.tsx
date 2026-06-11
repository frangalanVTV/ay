"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-end pb-12"
      style={{ background: "transparent" }}
    >
      {/* Scroll indicator — appears after initial load delay */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
      >
        <span
          className="text-[9px] font-semibold tracking-[0.28em] uppercase"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }}
          animate={{ scaleY: [1, 0.35, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
