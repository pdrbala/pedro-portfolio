"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { VideoPlayer } from "@/components/motion/VideoPlayer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorldSwitch } from "@/components/ui/WorldSwitch";
import { useLang } from "@/i18n/LanguageProvider";
import { getMotion, type MotionItem } from "@/data/motion";
import { asset, cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Muted loop that plays only while in view (saves CPU/battery); respects reduced motion. */
function VideoLoop({ item }: { item: MotionItem }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={asset(item.poster)}
      className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
    >
      <source src={asset(item.src)} type="video/mp4" />
    </video>
  );
}

function Card({
  item,
  feature,
  onOpen,
}: {
  item: MotionItem;
  feature?: boolean;
  onOpen: (i: MotionItem) => void;
}) {
  return (
    <button type="button" data-cursor="view" onClick={() => onOpen(item)} className="group block w-full text-left">
      <div className="flex items-baseline justify-between gap-4 border-t border-foreground pt-2.5 pb-4">
        <span className="label text-foreground">{item.year}</span>
        <span className="label truncate text-muted">{item.type}</span>
      </div>
      <div className={cn("relative overflow-hidden bg-foreground/10", feature ? "aspect-video" : "aspect-[9/16]")}>
        <VideoLoop item={item} />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/25 to-transparent opacity-50" />
      </div>
      <div className="mt-4">
        <h3 className="heading text-[clamp(1.3rem,2.4vw,2rem)] transition-colors duration-300 group-hover:text-accent">
          {item.title}
        </h3>
      </div>
    </button>
  );
}

export function MotionShowcase() {
  const { t, lang } = useLang();
  const items = getMotion(lang);
  const feature = items.find((i) => i.featured);
  const rest = items.filter((i) => !i.featured);
  const [active, setActive] = useState<MotionItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="overflow-hidden px-5 pt-28 pb-24 sm:px-10 sm:pt-36">
      <SectionLabel index="✦" meta={`${items.length} ${t.motion.count} / 2025`}>
        {t.motion.label}
      </SectionLabel>

      <Reveal blur={false} y={16} className="mt-6">
        <p className="heading max-w-2xl text-[clamp(1.4rem,3vw,2.4rem)] text-foreground">{t.motion.lead}</p>
      </Reveal>

      {feature && (
        <Reveal className="mt-12 md:mt-16">
          <Card item={feature} feature onOpen={setActive} />
        </Reveal>
      )}

      {/* verticals, 2-up, width-capped so they don't get huge */}
      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-12 md:mt-20 md:gap-x-10">
        {rest.map((item) => (
          <Card key={item.slug} item={item} onOpen={setActive} />
        ))}
      </div>

      {/* bottom cross-link to the editorial world (full-bleed band) */}
      <div className="-mx-5 mt-24 sm:-mx-10 sm:mt-32">
        <WorldSwitch />
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-foreground/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              aria-label="Close"
              className="label absolute top-5 right-5 z-10 flex items-center gap-2 text-background transition-colors hover:text-accent"
            >
              Close <X size={16} />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative w-full overflow-hidden bg-black",
                active.orientation === "portrait"
                  ? "aspect-[9/16] max-h-[88vh] w-auto sm:max-w-[min(440px,46vw)]"
                  : "aspect-video max-w-5xl",
              )}
            >
              <VideoPlayer
                key={active.slug}
                src={asset(active.src)}
                poster={asset(active.poster)}
                className="absolute inset-0 h-full w-full"
              />
            </motion.div>
            <p className="label absolute top-5 left-5 text-background/60">{active.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
