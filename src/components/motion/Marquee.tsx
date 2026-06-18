"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return min + (((v - min) % range) + range) % range;
}

/**
 * Infinite marquee that reacts to scroll velocity.
 * Content is rendered four times; copies are aria-hidden.
 */
export function Marquee({
  children,
  baseVelocity = 2,
  className,
  rowClassName,
}: {
  children: ReactNode;
  /** %/second drift. Negative reverses direction. */
  baseVelocity?: number;
  className?: string;
  rowClassName?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(baseVelocity >= 0 ? 1 : -1);
  const reduced = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * Math.abs(baseVelocity) * (delta / 1000);
    const vf = velocityFactor.get();
    // scrolling flips/accelerates the drift, so the wall feels alive
    if (vf < 0) direction.current = baseVelocity >= 0 ? -1 : 1;
    else if (vf > 0) direction.current = baseVelocity >= 0 ? 1 : -1;
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div className="flex w-max will-change-transform" style={reduced ? undefined : { x }}>
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0}
            className={cn("flex shrink-0 items-center", rowClassName)}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
