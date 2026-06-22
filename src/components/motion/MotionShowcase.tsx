"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLang } from "@/i18n/LanguageProvider";
import { getMotion, type MotionItem } from "@/data/motion";
import { asset, cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function PlayBadge({ small }: { small?: boolean }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-sm transition-transform duration-300 group-hover:scale-110",
          small ? "size-12" : "size-16",
        )}
      >
        <Play className="ml-0.5 fill-current" size={small ? 18 : 24} />
      </span>
    </span>
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
    <button
      type="button"
      data-cursor="view"
      onClick={() => onOpen(item)}
      className="group block w-full text-left"
    >
      <div className="flex items-baseline justify-between gap-4 border-t border-foreground pt-2.5 pb-4">
        <span className="label text-foreground">{item.year}</span>
        <span className="label truncate text-muted">{item.type}</span>
      </div>
      <div
        className={cn(
          "relative overflow-hidden bg-foreground/5",
          feature ? "aspect-[1200/502]" : "aspect-[9/16]",
        )}
      >
        <Image
          src={asset(item.poster)}
          alt={item.title}
          fill
          sizes={feature ? "100vw" : "(min-width: 768px) 40vw, 50vw"}
          className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-60" />
        <PlayBadge small={!feature} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
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
        <p className="heading max-w-2xl text-[clamp(1.4rem,3vw,2.4rem)] text-foreground">
          {t.motion.lead}
        </p>
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
              <iframe
                key={active.slug}
                src={`https://drive.google.com/file/d/${active.id}/preview`}
                title={active.title}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
