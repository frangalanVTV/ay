import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ForWhom } from "@/components/sections/ForWhom";
import { Process } from "@/components/sections/Process";
import { WhatIncludes } from "@/components/sections/WhatIncludes";
import { Closing } from "@/components/sections/Closing";
import { LiquidShaderBackground } from "@/components/ui/LiquidShaderBackground";

export default function Home() {
  return (
    <>
      {/* Shader fixed to the viewport — stays put while sections scroll over it.
          Sections with opaque backgrounds (Services, ForWhom, etc.) cover it
          naturally. Hero is transparent so the shader shows through. */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <LiquidShaderBackground opacity={1.00} intensity={1.10} hue={24} />
      </div>

      {/* All page content at z-1 — creates a stacking context above the shader */}
      <div className="relative z-[1]">
        <Header />
        <main>
          <Hero />
          <Services />
          <ForWhom />
          <Process />
          <WhatIncludes />
          <Closing />
        </main>
        <Footer />
      </div>
    </>
  );
}
