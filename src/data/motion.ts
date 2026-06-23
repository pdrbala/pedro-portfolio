import type { Lang } from "@/i18n/dictionaries";

export interface MotionItem {
  slug: string;
  src: string; // self-hosted mp4 in /public/work
  poster: string;
  orientation: "landscape" | "portrait";
  featured: boolean;
  year: string;
  title: string;
  type: string;
}

/**
 * Motion / video work — self-hosted mp4 loops (autoplay muted in the grid,
 * sound in the modal). Titles/types are placeholders from the footage; edit freely.
 * To add a video: drop an optimized mp4 + poster in /public/work and add an entry.
 */
const base = [
  { slug: "showreel", src: "/work/motion-v3.mp4", poster: "/work/motion-v3.jpg", orientation: "landscape", featured: true, year: "2025" },
  { slug: "real-estate", src: "/work/motion-v1.mp4", poster: "/work/motion-v1.jpg", orientation: "portrait", featured: false, year: "2025" },
  { slug: "motion-graphics", src: "/work/motion-v2.mp4", poster: "/work/motion-v2.jpg", orientation: "portrait", featured: false, year: "2025" },
  { slug: "fashion", src: "/work/motion-v4.mp4", poster: "/work/motion-v4.jpg", orientation: "portrait", featured: false, year: "2025" },
  { slug: "aerial", src: "/work/motion-v5.mp4", poster: "/work/motion-v5.jpg", orientation: "portrait", featured: false, year: "2025" },
] as const;

type Slug = (typeof base)[number]["slug"];

const content: Record<Lang, Record<Slug, { title: string; type: string }>> = {
  en: {
    showreel: { title: "Showreel", type: "Edit / Reel" },
    "real-estate": { title: "Luxury Real Estate", type: "Real-estate film" },
    "motion-graphics": { title: "Kinetic Lines", type: "Motion graphics" },
    fashion: { title: "Fashion Film", type: "Fashion / Lifestyle" },
    aerial: { title: "Aerial — City", type: "Drone / Aerial" },
  },
  pt: {
    showreel: { title: "Showreel", type: "Edição / Reel" },
    "real-estate": { title: "Imóvel de Luxo", type: "Vídeo imobiliário" },
    "motion-graphics": { title: "Linhas Cinéticas", type: "Motion graphics" },
    fashion: { title: "Fashion Film", type: "Moda / Lifestyle" },
    aerial: { title: "Aéreo — Cidade", type: "Drone / Aéreo" },
  },
};

export function getMotion(lang: Lang): MotionItem[] {
  return base.map((b) => ({ ...b, ...content[lang][b.slug] }));
}
