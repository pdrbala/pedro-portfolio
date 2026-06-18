"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";

type Mode = "default" | "link" | "view";

/**
 * Signature custom cursor — a small ink ring that follows the pointer, grows
 * over interactive elements, and turns into a filled "VIEW" disc over work
 * cards (any element marked data-cursor="view"). Fine-pointer + motion only.
 * mix-blend-difference makes it auto-invert against any background.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);
  // raw position = crisp, no lag (the floaty spring felt bad)
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const raf = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // defer state update one tick to avoid a synchronous setState in the effect body
    const enableTimer = window.setTimeout(() => setEnabled(true), 0);
    document.body.classList.add("cursor-hidden");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const el = e.target as HTMLElement | null;
        if (el?.closest('[data-cursor="view"]')) setMode("view");
        else if (el?.closest('a, button, [role="button"]')) setMode("link");
        else setMode("default");
      });
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      clearTimeout(enableTimer);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.body.classList.remove("cursor-hidden");
      cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 80 : mode === "link" ? 46 : 16;
  // default dot + view disc are FILLED white (mix-blend-difference inverts whatever's
  // under them → always visible on any background). Link is a hollow ring so the link
  // stays readable inside it.
  const filled = mode !== "link";

  return (
    // position via motion values (x/y) = instant, no lag.
    // size/fill/opacity as plain inline styles (always applied) + CSS transition for the
    // grow/shrink. mix-blend-difference inverts whatever is underneath → always visible.
    // z above the intro overlay (z-200) so the cursor shows there too.
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[250] flex items-center justify-center rounded-full mix-blend-difference transition-[width,height,margin,background-color,box-shadow,opacity] duration-200 ease-out"
      style={{
        x,
        y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        opacity: visible ? 1 : 0,
        backgroundColor: filled ? "#ffffff" : "rgba(255,255,255,0)",
        boxShadow: filled ? "none" : "inset 0 0 0 1px #ffffff",
      }}
    >
      {mode === "view" && (
        <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-black uppercase">
          View
        </span>
      )}
    </motion.div>
  );
}
