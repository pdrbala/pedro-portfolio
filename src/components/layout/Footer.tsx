"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useLang } from "@/i18n/LanguageProvider";

export function Footer() {
  const lenis = useLenis();
  const { t } = useLang();

  function backToTop() {
    if (lenis?.current) lenis.current.scrollTo(0);
    else window.scrollTo({ top: 0 });
  }

  return (
    <footer className="border-t border-foreground bg-background">
      <div className="flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p className="label text-muted">{t.footer.rights}</p>
        <p className="label text-muted">{t.footer.note}</p>
        <button
          type="button"
          onClick={backToTop}
          className="label flex items-center gap-2 text-foreground transition-colors hover:text-accent"
        >
          {t.footer.top} <ArrowUp size={13} aria-hidden />
        </button>
      </div>
    </footer>
  );
}
