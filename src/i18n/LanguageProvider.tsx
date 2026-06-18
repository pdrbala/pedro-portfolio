"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Dict, type Lang } from "@/i18n/dictionaries";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** true once the user has explicitly chosen a language (persisted) */
  chosen: boolean;
  /** true after mount, so we can avoid SSR/hydration mismatch */
  mounted: boolean;
  t: Dict;
}

const Context = createContext<LangCtx | null>(null);

const STORAGE_KEY = "pg-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [chosen, setChosen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // defer one tick to avoid a synchronous setState in the effect body
    const id = window.setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "en" || stored === "pt") {
        setLangState(stored);
        setChosen(true);
        document.documentElement.lang = stored === "pt" ? "pt-BR" : "en";
      }
      setMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    setChosen(true);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  }

  return (
    <Context.Provider value={{ lang, setLang, chosen, mounted, t: dict[lang] }}>
      {children}
    </Context.Provider>
  );
}

export function useLang() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
