import type { Metadata } from "next";
import GlassNav from "@/components/GlassNav";
import VariantSwitch from "@/components/VariantSwitch";
import Environment from "@/components/memphis/Environment";
import Traveler from "@/components/memphis/Traveler";
import MemphisHero from "@/components/memphis/MemphisHero";
import MemphisWork from "@/components/memphis/MemphisWork";
import MemphisStack from "@/components/memphis/MemphisStack";
import MemphisExperience from "@/components/memphis/MemphisExperience";
import MemphisContact from "@/components/memphis/MemphisContact";
import { site } from "@/content/content";

export const metadata: Metadata = {
  title: "Neo-Memphis",
  description: site.description,
  alternates: { canonical: "/memphis" },
};

/**
 * Variant B (MEMPHIS_SPEC.md): the same Liquid Glass interface system
 * dropped inside a living Neo-Memphis world. Every token the glass
 * reads is re-declared by the .memphis scope; the components are shared.
 */
export default function MemphisPage() {
  return (
    <div className="memphis relative min-h-screen">
      <Environment />
      <Traveler />
      <GlassNav />
      <main className="relative z-10">
        <MemphisHero />
        <MemphisWork />
        <MemphisStack />
        <MemphisExperience />
        <MemphisContact />
      </main>
      <VariantSwitch current="memphis" />
    </div>
  );
}
