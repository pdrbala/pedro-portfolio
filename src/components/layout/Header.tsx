"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useLang } from "@/i18n/LanguageProvider";

export const NAV = [
  { key: "work", hash: "#work" },
  { key: "contact", hash: "#contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { t, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  // Two coupled worlds: EN/Motion (/motion) and PT/Editorial (/).
  // The cross-link switches BOTH language and world at once.
  const onMotion = pathname.startsWith("/motion");
  const cross = onMotion
    ? { href: "/", label: "Graphic Design", lang: "pt" as const }
    : { href: "/motion", label: "Motion", lang: "en" as const };

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
            href={onMotion ? "/motion" : "/"}
            className="label flex items-center gap-2 border-r border-foreground px-5 py-4 font-bold text-foreground sm:px-8"
            aria-label="Pedro Guilherme — home"
          >
            <span aria-hidden className="size-2 bg-accent" />
            Pedro Guilherme<span className="text-accent">®</span>
          </Link>

          <div className="flex items-stretch">
            <nav aria-label="Primary" className="hidden items-stretch md:flex">
              {!onMotion &&
                NAV.map((link, i) => (
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
              <Link
                href={cross.href}
                onClick={() => setLang(cross.lang)}
                className="label group flex items-center gap-1.5 border-l border-foreground px-6 text-accent transition-colors hover:bg-accent hover:text-background"
              >
                {cross.label}
                <ArrowUpRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
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
