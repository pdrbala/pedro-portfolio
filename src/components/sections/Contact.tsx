"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useLang } from "@/i18n/LanguageProvider";
import { email, socials } from "@/data/socials";

export function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="bg-foreground px-5 pt-14 pb-10 text-background sm:px-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-background/40 pt-3">
        <p className="label flex items-center gap-3 text-background">
          <span aria-hidden className="inline-block size-2 bg-accent" />
          03
          <span aria-hidden className="text-background/40">/</span>
          {t.contact.label}
        </p>
        <p className="label text-background/60">{t.contact.reply}</p>
      </div>

      <Reveal blur={false} y={20} className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h2 className="heading max-w-2xl text-[clamp(2rem,6vw,4.5rem)] text-background">
          {t.contact.heading}
        </h2>
        <a
          href={`mailto:${email}?subject=New%20project`}
          className="btn group !border-background !px-10 !py-6 !text-sm text-background hover:!border-accent hover:!bg-accent"
        >
          {t.hero.startProject}
          <ArrowUpRight
            size={16}
            aria-hidden
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </Reveal>

      <div className="mt-20 grid gap-y-8 border-t border-background/40 pt-6 sm:grid-cols-2">
        <div>
          <h3 className="label text-background/50">{t.contact.email}</h3>
          <a
            href={`mailto:${email}`}
            className="mt-3 inline-block font-sans text-xl font-medium text-background transition-colors hover:text-accent sm:text-2xl"
          >
            {email}
          </a>
        </div>
        <div>
          <h3 className="label text-background/50">{t.contact.elsewhere}</h3>
          <ul className="mt-3">
            {socials.map((social) => (
              <li key={social.label} className="border-t border-background/15 first:border-0">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-2.5 transition-colors hover:text-accent"
                >
                  <span className="label">{social.label}</span>
                  <span className="label text-background/50 group-hover:text-accent">
                    {social.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
