"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useLang } from "@/i18n/LanguageProvider";
import { LANGS } from "@/i18n/dictionaries";

export const NAV = [
  { key: "work", hash: "#work" },
  { key: "contact", hash: "#contact" },
] as const;

function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={className} role="group" aria-label="Language">
      {LANGS.map((l, i) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`label px-2 transition-colors ${
            lang === l ? "text-accent" : "text-muted hover:text-foreground"
          } ${i === 0 ? "border-r border-hairline pr-2" : "pl-2"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  function goTo(e: MouseEvent<HTMLAnchorElement>, hash: string) {
    setMenuOpen(false);
    if (pathname !== "/") return; // navigate to /#hash normally
    const el = document.querySelector<HTMLElement>(hash);
    if (!el) return;
    e.preventDefault();
    if (lenis?.current) lenis.current.scrollTo(el, { offset: 0 });
    else el.scrollIntoView();
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-110 bg-background/85 backdrop-blur-sm">
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-accent" />
        <div className="flex items-stretch justify-between border-b border-foreground">
          <Link
            href="/"
            className="label flex items-center gap-2 border-r border-foreground px-5 py-4 font-bold text-foreground sm:px-8"
            aria-label="Pedro Guilherme — home"
          >
            <span aria-hidden className="size-2 bg-accent" />
            Pedro Guilherme<span className="text-accent">®</span>
          </Link>

          <div className="flex items-stretch">
            <nav aria-label="Primary" className="hidden items-stretch md:flex">
              {NAV.map((link, i) => (
                <Link
                  key={link.hash}
                  href={`/${link.hash}`}
                  onClick={(e) => goTo(e, link.hash)}
                  className="label group flex items-center gap-2 border-l border-hairline px-6 text-muted transition-colors hover:bg-foreground hover:text-background"
                >
                  <span className="text-[0.85em] opacity-50 group-hover:text-accent group-hover:opacity-100">
                    0{i + 1}
                  </span>
                  {t.nav[link.key]}
                </Link>
              ))}
              <LangToggle className="flex items-center border-l border-foreground px-4" />
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="label border-l border-foreground px-5 text-foreground transition-colors hover:bg-foreground hover:text-background md:hidden"
            >
              {menuOpen ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onNavigate={goTo} onClose={() => setMenuOpen(false)} />
    </>
  );
}
