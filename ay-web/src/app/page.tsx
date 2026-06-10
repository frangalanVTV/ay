import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ForWhom } from "@/components/sections/ForWhom";
import { Process } from "@/components/sections/Process";
import { WhatIncludes } from "@/components/sections/WhatIncludes";
import { Closing } from "@/components/sections/Closing";

export default function Home() {
  return (
    <>
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
    </>
  );
}
