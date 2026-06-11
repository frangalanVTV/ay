import { Header } from "@/components/layout/Header";
import { CosmicCanvas } from "@/components/3d/CosmicCanvas";
import { HeroSection } from "@/components/sections/HeroSection";
import { TaglineSection } from "@/components/sections/TaglineSection";
import { DescriptionSection } from "@/components/sections/DescriptionSection";
import { Process } from "@/components/sections/Process";
import { Closing } from "@/components/sections/Closing";

export default function Home() {
  return (
    <>
      {/* 3D canvas — fixed, always behind everything */}
      <CosmicCanvas />

      {/* Floating header — z-40 */}
      <Header />

      {/* All page content at z-1 */}
      <main className="relative z-[1]">
        <HeroSection />
        <TaglineSection />
        <DescriptionSection />
        <Process />
        <Closing />
      </main>
    </>
  );
}
