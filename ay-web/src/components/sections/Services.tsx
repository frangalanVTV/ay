"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Activaciones interactivas",
    desc: "Juegos, trivias, ruletas, sorteos, quizzes y dinámicas participativas. El público interactúa desde su celular o desde pantallas instaladas en el evento.",
  },
  {
    num: "02",
    title: "Captación de leads",
    desc: "Sistemas simples de registro mediante QR, formularios o landing pages. Los asistentes dejan sus datos a cambio de participar en una dinámica o acceder a un beneficio.",
  },
  {
    num: "03",
    title: "Votaciones y encuestas en vivo",
    desc: "El público vota, responde preguntas o participa en decisiones durante el evento. Los resultados se muestran en tiempo real en pantallas, rankings o visualizaciones personalizadas.",
  },
  {
    num: "04",
    title: "Sorteos y rankings en pantalla",
    desc: "Experiencias visuales para sorteos en vivo, selección de ganadores, cuentas regresivas y rankings de juegos proyectados en pantallas grandes.",
  },
  {
    num: "05",
    title: "Experiencias con inteligencia artificial",
    desc: "Recursos personalizados con AI para generar contenido, adaptar preguntas, crear respuestas o producir piezas únicas para cada asistente.",
  },
];

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="group grid grid-cols-[2.5rem_1fr] lg:grid-cols-[5rem_1fr_minmax(0,480px)] items-start gap-x-8 lg:gap-x-16 py-7 sm:py-8 cursor-default"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <span
        className="text-[11px] font-mono pt-1"
        style={{ color: "#38BDF8" }}
      >
        {service.num}
      </span>
      <h3
        className="text-lg sm:text-xl font-semibold leading-snug transition-colors duration-200"
        style={{ color: "rgba(255,255,255,0.92)" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#38BDF8"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.92)"; }}
      >
        {service.title}
      </h3>
      <p className="hidden lg:block text-sm leading-relaxed col-start-3" style={{ color: "rgba(255,255,255,0.45)" }}>
        {service.desc}
      </p>
      <p className="lg:hidden text-sm leading-relaxed mt-2 col-start-2" style={{ color: "rgba(255,255,255,0.45)" }}>
        {service.desc}
      </p>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicios" className="py-24 lg:py-32" style={{ background: "#060F1A" }}>
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          ref={ref}
          className="mb-14 lg:mb-18"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 block"
            style={{ color: "#0EA5E9" }}
          >
            Servicios
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Qué hacemos
          </h2>
        </motion.div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {services.map((s, i) => (
            <ServiceRow key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
