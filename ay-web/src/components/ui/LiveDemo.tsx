"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const options = [
  { label: "Excelente", value: 52 },
  { label: "Muy bueno", value: 31 },
  { label: "Bueno", value: 17 },
];

const barGradients = [
  "linear-gradient(to right, #0369A1, #0EA5E9)",
  "linear-gradient(to right, #0EA5E9, #38BDF8)",
  "linear-gradient(to right, #0284C7, #67E8F9)",
];

const qrPattern = [
  1,1,1,0,1,0,
  1,0,1,0,0,1,
  1,1,1,1,0,0,
  0,0,0,0,1,1,
  1,1,0,1,1,0,
  0,1,0,0,1,1,
];

export function LiveDemo() {
  const [count, setCount] = useState(847);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[320px] mx-auto pt-10 pb-12 px-8">

      {/* Floating counter chip — top left */}
      <motion.div
        className="absolute -top-6 -left-6 z-10 bg-white border border-[#e5e5e3] rounded-lg px-4 py-3 shadow-sm"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="text-[10px] font-mono tracking-widest uppercase text-[#b0b0ae] mb-1">
          Participando
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={Math.floor(count / 60)}
            className="text-[1.6rem] font-black leading-none"
            style={{
              background: "linear-gradient(135deg, #0369A1, #0EA5E9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
          >
            {Math.floor(count / 1.8).toLocaleString("es-AR")}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Main poll card */}
      <div className="bg-white border border-[#e5e5e3] rounded-xl p-6 shadow-sm">

        {/* Card header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            {/* Hot-pink live dot */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#0EA5E9" }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#6b6b6b]">
              En vivo
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              className="text-[10px] font-mono text-[#6b6b6b]"
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.2 }}
            >
              {count.toLocaleString("es-AR")} resp.
            </motion.span>
          </AnimatePresence>
        </div>

        <p className="text-sm font-semibold text-[#0a0a0a] mb-5 leading-snug">
          ¿Cómo calificás el evento?
        </p>

        {/* Gradient bars */}
        <div className="space-y-4">
          {options.map((opt, i) => (
            <div key={opt.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#6b6b6b]">{opt.label}</span>
                <span className="text-xs font-mono text-[#0a0a0a]">
                  {opt.value}%
                </span>
              </div>
              <div className="h-[3px] bg-[#f0f0ee] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: barGradients[i] }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${opt.value}%` }}
                  transition={{
                    delay: 0.5 + i * 0.18,
                    duration: 1.3,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating QR chip — bottom right */}
      <motion.div
        className="absolute -bottom-8 -right-6 z-10 bg-white border border-[#e5e5e3] rounded-lg p-3.5 shadow-sm"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="text-[9px] font-mono tracking-widest uppercase text-[#b0b0ae] mb-2">
          QR acceso
        </div>
        <div className="grid grid-cols-6 gap-[2.5px] w-[60px]">
          {qrPattern.map((cell, i) => (
            <div
              key={i}
              className={`aspect-square rounded-[1.5px] ${
                cell ? "" : "bg-[#f0f0ee]"
              }`}
              style={cell ? { background: "linear-gradient(135deg, #0369A1, #0EA5E9)" } : {}}
            />
          ))}
        </div>
      </motion.div>

    </div>
  );
}
