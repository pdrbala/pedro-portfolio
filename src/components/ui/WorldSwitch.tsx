"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

/**
 * Big bottom CTA that crosses to the other world (Motion / ↔ Design /design),
 * mirroring the header cross-link. Language is untouched.
 */
export function WorldSwitch() {
  const pathname = usePathname();
  const onDesign = pathname.startsWith("/design") || pathname.startsWith("/work");
  const cross = onDesign
    ? { href: "/", label: "Motion" }
    : { href: "/design", label: "Graphic Design" };

  return (
    <Link
      href={cross.href}
      className="group flex items-center justify-between gap-6 border-t border-foreground px-5 py-12 transition-colors hover:bg-accent sm:px-10 sm:py-16"
    >
      <span className="display text-[clamp(2.6rem,9vw,7rem)] text-accent transition-colors group-hover:text-background">
        {cross.label}
      </span>
      <ArrowUpRight
        className="size-10 shrink-0 text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-background sm:size-16"
      />
    </Link>
  );
}
