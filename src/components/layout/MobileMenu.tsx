"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useEffect, type MouseEvent } from "react";
import { NAV } from "@/components/layout/Header";
import { useLang } from "@/i18n/LanguageProvider";
import { LANGS } from "@/i18n/dictionaries";
import { email, socials } from "@/data/socials";

const EASE = [0.76, 0, 0.24, 1] as const;

export function MobileMenu({
  open,
  onNavigate,
  onClose,
}: {
  open: boolean;
  onNavigate: (e: MouseEvent<HTMLAnchorElement>, hash: string) => void;
  onClose: () => void;
}) {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const onMotion = pathname.startsWith("/motion");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-105 flex flex-col justify-between bg-background px-5 pt-24 pb-10 md:hidden"
        >
          <nav aria-label="Mobile">
            <ul>
              {NAV.map((link, i) => (
                <li key={link.hash} className="overflow-hidden border-t border-foreground last:border-b">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
                  >
                    <Link
                      href={`/${link.hash}`}
                      onClick={(e) => onNavigate(e, link.hash)}
                      className="display flex items-baseline gap-4 py-4 text-[clamp(3rem,16vw,5.5rem)] text-foreground"
                    >
                      <span className="label text-accent">0{i + 1}</span>
                      {t.nav[link.key]}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-5">
            <Link
              href={onMotion ? "/" : "/motion"}
              onClick={onClose}
              className="btn btn-line flex items-center justify-center gap-2"
            >
              {onMotion ? t.motion.toEditorial : t.motion.toMotion}
              <ArrowUpRight size={14} />
            </Link>
            <div className="flex gap-px" role="group" aria-label="Language">
              {LANGS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`btn ${lang === l ? "btn-fill" : "btn-line"} flex-1`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a href={`mailto:${email}`} className="label text-foreground underline underline-offset-4">
              {email}
            </a>
            <ul className="flex gap-6">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label text-muted transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
