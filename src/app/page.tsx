import AmbientLight from "@/components/AmbientLight";
import GlassNav from "@/components/GlassNav";
import VariantSwitch from "@/components/VariantSwitch";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Engineering from "@/components/sections/Engineering";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <AmbientLight />
      <GlassNav />
      <main>
        <Hero />
        <Work />
        <Engineering />
        <Experience />
        <About />
        <Contact />
      </main>
      <VariantSwitch current="glass" />
    </>
  );
}
