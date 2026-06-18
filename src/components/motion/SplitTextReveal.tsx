"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

interface SplitTextRevealProps {
  text: string;
  as?: keyof typeof TAGS;
  per?: "word" | "char";
  className?: string;
  delay?: number;
  stagger?: number;
  /**
   * Controlled mode: pass a boolean to play/hold the reveal manually
   * (e.g. wait for the preloader). Leave undefined to play on scroll into view.
   */
  play?: boolean;
}

/**
 * Masked text reveal — each word/char slides up from behind an
 * overflow-hidden line. Screen readers get the plain string via aria-label.
 */
export function SplitTextReveal({
  text,
  as = "span",
  per = "word",
  className,
  delay = 0,
  stagger = 0.04,
  play,
}: SplitTextRevealProps) {
  const reduced = useReducedMotion();
  const Tag = TAGS[as];
  const PlainTag = as;

  if (reduced) {
    return <PlainTag className={className}>{text}</PlainTag>;
  }

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { y: "115%" },
    visible: { y: "0%", transition: { duration: 0.75, ease: EASE } },
  };

  const words = text.split(" ");

  return (
    <Tag
      aria-label={text}
      initial="hidden"
      {...(play === undefined
        ? { whileInView: "visible", viewport: { once: true, margin: "-10% 0px" } }
        : { animate: play ? "visible" : "hidden" })}
      variants={container}
      className={cn("inline-block", className)}
    >
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {per === "char" ? (
            [...word].map((char, ci) => (
              // pt/-mt extend the mask upward so diacritics (Á, Ã…) aren't clipped
              <span key={ci} className="inline-block overflow-hidden pt-[0.15em] -mt-[0.15em] align-bottom">
                <motion.span variants={item} className="inline-block will-change-transform">
                  {char}
                </motion.span>
              </span>
            ))
          ) : (
            <span className="inline-block overflow-hidden pt-[0.15em] -mt-[0.15em] align-bottom">
              <motion.span variants={item} className="inline-block will-change-transform">
                {word}
              </motion.span>
            </span>
          )}
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}
