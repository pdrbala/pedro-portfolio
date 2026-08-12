"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/data/projects";
import { asset, cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WorkCard({
  project,
  aspectClass = "aspect-4/5",
  className,
}: {
  project: Project;
  /** per-slot aspect ratio so the grid reads as a composed page, not a template */
  aspectClass?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <Link href={`/work/${project.slug}`} data-cursor="view" className={cn("group block", className)}>
      {/* meta band on a hard rule */}
      <div className="flex items-baseline justify-between gap-4 border-t border-foreground pt-2.5 pb-4">
        <span className="label text-foreground">
          {project.index} <span className="text-muted">/ {project.year}</span>
        </span>
        <span className="label truncate text-muted">{project.type}</span>
      </div>

      {project.layout === "collage" && project.gallery ? (
        <motion.div
          initial={reduced ? false : { clipPath: "inset(12% 6% 12% 6%)", scale: 1.04 }}
          whileInView={reduced ? undefined : { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className={cn(
            "relative overflow-hidden bg-foreground/5 w-full",
            project.collageLayout === "3x3" ? "aspect-video" : "aspect-21/9",
          )}
        >
          <div
            className={cn(
              "grid gap-2 bg-foreground/10 p-2 h-full",
              project.collageLayout === "3x3" ? "grid-cols-3 grid-rows-3" : "grid-cols-3",
            )}
          >
            {project.gallery.slice(0, project.collageLayout === "3x3" ? 9 : 3).map((img) => (
              <div key={img.src} className="relative h-full w-full overflow-hidden">
                <Image
                  src={asset(img.src)}
                  alt={img.alt}
                  fill
                  sizes={project.collageLayout === "3x3" ? "(min-width: 768px) 16vw, 33vw" : "(min-width: 768px) 30vw, 33vw"}
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
          <span
            aria-hidden
            className="display absolute right-3 bottom-1 text-[5rem] leading-none text-background/0 mix-blend-difference transition-colors duration-500 group-hover:text-background/90"
          >
            {project.index}
          </span>
        </motion.div>
      ) : (
        <motion.div
          initial={reduced ? false : { clipPath: "inset(12% 6% 12% 6%)", scale: 1.04 }}
          whileInView={reduced ? undefined : { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className={cn("relative overflow-hidden bg-foreground/5", aspectClass)}
        >
          <Image
            src={asset(project.cover)}
            alt={project.coverAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          {/* index overprint — bleeds in from the corner on hover */}
          <span
            aria-hidden
            className="display absolute right-3 bottom-1 text-[5rem] leading-none text-background/0 mix-blend-difference transition-colors duration-500 group-hover:text-background/90"
          >
            {project.index}
          </span>
        </motion.div>
      )}

      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <h3 className="heading text-[clamp(1.6rem,3.2vw,2.6rem)] transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="label mt-2 text-muted">{project.tags.join(" / ")}</p>
        </div>
        <ArrowUpRight
          aria-hidden
          size={24}
          className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent group-focus-visible:text-accent"
        />
      </div>
    </Link>
  );
}
