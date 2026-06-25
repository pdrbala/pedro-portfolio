import { Intro } from "@/components/Intro";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { WorldSwitch } from "@/components/ui/WorldSwitch";

export default function Home() {
  return (
    <Intro>
      <Hero />
      <WorkGrid />
      <WorldSwitch />
      <Contact />
    </Intro>
  );
}
