"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * Big bottom CTA that crosses to the other world AND switches language
 * (EN/Motion ↔ PT/Editorial), mirroring the header cross-link.
 */
export function WorldSwitch() {
  const pathname = usePathname();
  const { setLang } = useLang();
  const onMotion = pathname.startsWith("/motion");
  const cross = onMotion
    ? { href: "/", label: "Graphic Design", lang: "pt" as const }
    : { href: "/motion", label: "Motion", lang: "en" as const };

  return (
    <Link
      href={cross.href}
      onClick={() => setLang(cross.lang)}
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
