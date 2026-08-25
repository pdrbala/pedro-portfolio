import type { Metadata } from "next";
import { Intro } from "@/components/Intro";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { WorldSwitch } from "@/components/ui/WorldSwitch";

export const metadata: Metadata = {
  title: "Graphic Design",
  description:
    "Editorial systems, brand identities and visual design work by Pedro Guilherme.",
};

export default function DesignPage() {
  return (
    <Intro>
      <Hero />
      <WorkGrid />
      <WorldSwitch />
      <Contact />
    </Intro>
  );
}
