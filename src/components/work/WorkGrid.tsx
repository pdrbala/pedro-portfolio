"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkCard } from "@/components/work/WorkCard";
import { useLang } from "@/i18n/LanguageProvider";
import { getProjects } from "@/data/projects";
import { asset } from "@/lib/utils";

export function WorkGrid() {
  const { t, lang } = useLang();
  const projects = getProjects(lang);
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const count = String(projects.length).padStart(2, "0");

  return (
    <section id="work" className="overflow-hidden px-5 py-16 sm:px-10 sm:py-24">
      <SectionLabel index="01" meta={`${count} ${lang === "pt" ? "projetos" : "projects"} / 2024–25`}>
        {t.work.label}
      </SectionLabel>

      <Reveal blur={false} y={16} className="mt-6">
        <p className="heading max-w-2xl text-[clamp(1.4rem,3vw,2.4rem)] text-foreground">{t.work.lead}</p>
      </Reveal>

      {featured && (
        <Reveal className="mt-12 md:mt-16">
          <Link
            href={`/work/${featured.slug}`}
            data-cursor="view"
            className="group grid gap-8 border-t border-foreground pt-6 md:grid-cols-12 md:gap-12"
          >
            <div className="relative overflow-hidden bg-foreground/5 md:col-span-5">
              <Image
                src={asset(featured.cover)}
                alt={featured.coverAlt}
                width={featured.coverW}
                height={featured.coverH}
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-col justify-center md:col-span-6">
              <p className="label flex items-center gap-3 text-accent">
                <span aria-hidden className="size-2 bg-accent" />
                {t.work.featured} — {featured.year}
              </p>
              <h3 className="display mt-4 text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] transition-colors duration-300 group-hover:text-accent">
                {featured.title}
              </h3>
              <p className="label mt-3 text-muted">{featured.type}</p>
              <p className="mt-6 max-w-md leading-relaxed text-muted">{featured.description}</p>
              <span className="label mt-8 inline-flex items-center gap-2 text-foreground transition-all group-hover:translate-x-1 group-hover:text-accent">
                {t.caseStudy.view} <ArrowUpRight size={14} aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>
      )}

      <div className="mt-14 grid gap-y-14 md:mt-20 md:grid-cols-2 md:gap-x-10">
        {rest.map((project) => (
          <WorkCard key={project.slug} project={project} aspectClass="aspect-4/5 md:aspect-4/3" />
        ))}
      </div>
    </section>
  );
}
