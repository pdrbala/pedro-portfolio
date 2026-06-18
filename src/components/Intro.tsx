"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/dictionaries";

const IntroContext = createContext(false);

/** True once a language has been chosen (or restored) and the gate is gone. */
export function useIntroDone() {
  return useContext(IntroContext);
}

const EASE = [0.76, 0, 0.24, 1] as const;

/** Minimal flag mark in the site palette — abstract, brutalist, not a real flag. */
function FlagChip({ lang }: { lang: Lang }) {
  return (
    <span className="relative block size-6 shrink-0 border border-current bg-background">
      {lang === "pt" ? (
        <span className="absolute inset-0 m-auto size-2.5 rounded-full bg-accent" />
      ) : (
        <>
          <span className="absolute top-1/2 left-1/2 h-2.5 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-accent" />
          <span className="absolute top-1/2 left-1/2 h-[2px] w-2.5 -translate-x-1/2 -translate-y-1/2 bg-accent" />
        </>
      )}
    </span>
  );
}

export function Intro({ children }: { children: ReactNode }) {
  const { chosen, mounted, setLang } = useLang();
  const reduced = useReducedMotion();
  const open = !chosen; // covers pre-mount + first visit

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  function choose(l: Lang) {
    setLang(l);
  }

  const rows: { lang: Lang; word: string; name: string; dim?: boolean }[] = [
    { lang: "en", word: "WELCOME", name: "English" },
    { lang: "pt", word: "BEM-VINDO", name: "Português", dim: true },
  ];

  return (
    <IntroContext.Provider value={mounted && chosen}>
      {children}
      {/* portal to body so the gate escapes the route-transition stacking context
          and covers the header (z-110) too */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
          <motion.div
            key="intro"
            exit={reduced ? { opacity: 0 } : { y: "-100%" }}
            transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
            className="fixed inset-0 z-200 flex flex-col bg-foreground p-5 text-background sm:p-10"
          >
            {mounted && (
              <>
                <div className="flex items-center justify-between">
                  <p className="label flex items-center gap-2 text-background/60">
                    <span aria-hidden className="size-2 bg-accent" />
                    Pedro Guilherme©
                  </p>
                  <p className="label text-background/60">Portfolio — 2026</p>
                </div>

                <ul className="flex flex-1 flex-col justify-center">
                  {rows.map((r) => (
                    <li key={r.lang} className="border-t border-background/20 last:border-b">
                      <button
                        type="button"
                        onClick={() => choose(r.lang)}
                        className="group flex w-full items-center justify-between gap-4 py-2 text-left sm:py-3"
                      >
                        <span
                          className={`display text-[clamp(2.4rem,11vw,9rem)] leading-[0.92] transition-colors duration-300 group-hover:text-accent ${
                            r.dim ? "text-background/40" : "text-background"
                          }`}
                        >
                          {r.word}
                        </span>

                        <span className="flex shrink-0 flex-col items-end gap-1.5">
                          {/* the "Idioma / Language" label sits at WELCOME level */}
                          {r.lang === "en" && (
                            <span className="label text-background/45">Idioma / Language</span>
                          )}
                          <span className="flex items-center gap-2 text-background transition-colors group-hover:text-accent">
                            <FlagChip lang={r.lang} />
                            <span className="label">{r.name}</span>
                            <ArrowUpRight
                              size={16}
                              aria-hidden
                              className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                            />
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </IntroContext.Provider>
  );
}
