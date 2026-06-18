import { Intro } from "@/components/Intro";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { WorkGrid } from "@/components/work/WorkGrid";

export default function Home() {
  return (
    <Intro>
      <Hero />
      <WorkGrid />
      <Contact />
    </Intro>
  );
}
