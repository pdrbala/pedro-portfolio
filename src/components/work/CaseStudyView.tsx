"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { useLang } from "@/i18n/LanguageProvider";
import { getNextProject, getProject } from "@/data/projects";
import { asset } from "@/lib/utils";

export function CaseStudyView({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const project = getProject(slug, lang);
  if (!project) return null;
  const next = getNextProject(slug, lang);
  const coverPortrait = project.coverH > project.coverW;

  const blocks = project.caseStudy.blocks.map((block, i, arr) => ({
    block,
    ordinal: arr.slice(0, i + 1).filter((b) => b.kind === block.kind).length,
  }));

  return (
    <article className="px-5 pt-28 pb-24 sm:px-10 sm:pt-36">
      <Link
        href="/#work"
        className="label inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={12} aria-hidden /> {t.caseStudy.back}
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-foreground pt-3">
          <p className="label flex flex-wrap items-center gap-3">
            <span aria-hidden className="inline-block size-2 bg-accent" />
            {project.index}
            <span aria-hidden className="text-muted">/</span>
            <span>{project.type}</span>
          </p>
          <p className="label text-muted">
            {t.caseStudy.label} / {project.year}
          </p>
        </div>

        <h1 className="mt-8 overflow-hidden">
          <SplitTextReveal
            text={project.title}
            as="span"
            per="word"
            play
            stagger={0.07}
            className="display text-[clamp(2.6rem,9vw,9rem)] leading-[1.02]"
          />
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="text-[clamp(1.25rem,2vw,1.7rem)] leading-snug font-medium tracking-tight">
              {project.caseStudy.intro}
            </p>
          </Reveal>
          <Reveal delay={0.1} blur={false} className="md:col-span-4 md:col-start-9">
            <dl>
              <div className="border-t border-hairline py-4">
                <dt className="label text-muted">{t.caseStudy.role}</dt>
                <dd className="mt-2 text-sm leading-relaxed">{project.caseStudy.role}</dd>
              </div>
              <div className="border-t border-hairline py-4">
                <dt className="label text-muted">{t.caseStudy.deliverables}</dt>
                <dd className="mt-2 text-sm leading-relaxed">
                  {project.caseStudy.deliverables.join(" / ")}
                </dd>
              </div>
              <div className="border-t border-hairline py-4">
                <dt className="label text-muted">{t.caseStudy.tags}</dt>
                <dd className="label mt-2 text-foreground">{project.tags.join(" / ")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      {/* cover — natural ratio, no crop (portrait pages get centred) */}
      <Reveal delay={0.15} className={coverPortrait ? "mx-auto mt-16 max-w-lg" : "-mx-5 mt-16 sm:-mx-10"}>
        <Image
          src={asset(project.cover)}
          alt={project.coverAlt}
          width={project.coverW}
          height={project.coverH}
          priority
          sizes={coverPortrait ? "(min-width: 1024px) 32rem, 100vw" : "100vw"}
          className="h-auto w-full bg-foreground/5"
        />
      </Reveal>

      <div className="mt-24 space-y-20 sm:space-y-32">
        {blocks.map(({ block, ordinal }, i) => {
          if (block.kind === "text") {
            return (
              <Reveal key={i}>
                <div className="grid gap-6 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <p className="label text-accent">({String(ordinal).padStart(2, "0")})</p>
                    {block.heading ? (
                      <h2 className="heading mt-3 text-2xl sm:text-3xl">{block.heading}</h2>
                    ) : null}
                  </div>
                  <p className="text-lg leading-relaxed text-muted md:col-span-7 md:col-start-6">
                    {block.body}
                  </p>
                </div>
              </Reveal>
            );
          }
          const portrait = block.h > block.w;
          return (
            <Reveal key={i} className={portrait ? "mx-auto max-w-md" : "-mx-5 sm:-mx-10"}>
              <Image
                src={asset(block.src)}
                alt={block.alt}
                width={block.w}
                height={block.h}
                sizes={portrait ? "(min-width: 768px) 28rem, 100vw" : "100vw"}
                className="h-auto w-full bg-foreground/5"
              />
            </Reveal>
          );
        })}
      </div>

      <footer className="mt-28 border-t border-foreground pt-4">
        <p className="label text-muted">{t.caseStudy.next}</p>
        <Link
          href={`/work/${next.slug}`}
          data-cursor="view"
          className="group mt-4 flex flex-wrap items-baseline justify-between gap-4"
        >
          <span className="display text-[clamp(2.6rem,8vw,7rem)] transition-colors group-hover:text-accent">
            {next.title}
          </span>
          <span className="label flex items-center gap-2 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent">
            {t.caseStudy.view} <ArrowUpRight size={13} aria-hidden />
          </span>
        </Link>
      </footer>
    </article>
  );
}
