"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useIntroDone } from "@/components/Intro";
import { Marquee } from "@/components/motion/Marquee";
import { Motif, MOTIF_COUNT } from "@/components/motion/Motif";
import { Reveal } from "@/components/motion/Reveal";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useLang } from "@/i18n/LanguageProvider";

const TILES = Array.from({ length: MOTIF_COUNT }, (_, i) => i);

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo",
      }).format(new Date());
    const first = window.setTimeout(() => setTime(format()), 0);
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <>{time ?? "--:--"}</>;
}

export function Hero() {
  const introDone = useIntroDone();
  const lenis = useLenis();
  const { t } = useLang();

  function goTo(e: MouseEvent<HTMLAnchorElement>, hash: string) {
    const el = document.querySelector<HTMLElement>(hash);
    if (!el) return;
    e.preventDefault();
    if (lenis?.current) lenis.current.scrollTo(el, { offset: 0 });
    else el.scrollIntoView();
  }

  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-24">
      <div className="px-5 sm:px-10">
        <Reveal blur={false} y={0} delay={0.1} className={introDone ? "" : "opacity-0"}>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-2 w-2 bg-accent" />
            <p className="label text-muted">{t.hero.location}</p>
          </div>
        </Reveal>

        <h1 className="display mt-4 text-[clamp(4rem,19vw,21rem)] leading-[1.02]">
          <span className="block">
            <SplitTextReveal text="PEDRO" as="span" per="char" play={introDone} delay={0.05} stagger={0.04} />
          </span>
          <span className="block whitespace-nowrap">
            <SplitTextReveal
              text="GUILHERME"
              as="span"
              per="char"
              play={introDone}
              delay={0.18}
              stagger={0.035}
            />
          </span>
        </h1>

        <Reveal blur={false} y={0} delay={0.5}>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-stretch gap-4">
              <span aria-hidden className="w-1.5 shrink-0 bg-accent" />
              <p className="max-w-sm text-base leading-snug text-foreground sm:text-lg">
                {t.hero.tagline}
              </p>
            </div>

            <div className="flex flex-col gap-px sm:flex-row">
              <a href="#work" onClick={(e) => goTo(e, "#work")} className="btn btn-fill">
                {t.hero.viewWork}
              </a>
              <a href="#contact" onClick={(e) => goTo(e, "#contact")} className="btn btn-line">
                {t.hero.startProject}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-12">
        <div className="grid grid-cols-2 border-y border-hairline md:grid-cols-3">
          <p className="label border-r border-hairline px-5 py-3 text-muted sm:px-10">
            {t.hero.role}
          </p>
          <p className="label hidden items-center gap-2 border-r border-hairline px-6 py-3 text-muted md:flex">
            <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-accent" />
            {t.hero.available}
          </p>
          <p className="label px-5 py-3 text-muted sm:px-6">
            São Paulo <LocalTime /> <span className="text-foreground">GMT-3</span>
          </p>
        </div>

        <Marquee baseVelocity={-1.6} className="border-b border-hairline py-3" rowClassName="gap-3 pr-3">
          {TILES.map((v) => (
            <div
              key={v}
              className="relative h-24 w-32 shrink-0 overflow-hidden border border-hairline sm:h-28 sm:w-40"
            >
              <Motif variant={v} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
