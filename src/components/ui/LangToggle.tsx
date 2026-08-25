"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/** EN/PT switch — hard-edged mono pair, active side in ink. */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <span className={cn("label flex items-center gap-2", className)}>
      {(["en", "pt"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "uppercase transition-colors",
            lang === l ? "text-foreground underline underline-offset-4" : "text-muted hover:text-accent",
          )}
        >
          {l}
        </button>
      ))}
    </span>
  );
}
