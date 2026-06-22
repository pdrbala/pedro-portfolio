import type { Lang } from "@/i18n/dictionaries";

export interface MotionItem {
  slug: string;
  /** Google Drive file id — must be shared "anyone with the link". */
  id: string;
  poster: string;
  orientation: "landscape" | "portrait";
  featured: boolean;
  year: string;
  title: string;
  type: string;
}

/**
 * Motion / video work. Sources live on Google Drive (embedded via /preview).
 * Titles/types are placeholders from the footage — edit freely.
 * To add a video: share it on Drive ("anyone with link"), drop the file id +
 * a poster in /public/work, and add an entry here.
 */
const base = [
  { slug: "showreel", id: "1VvawE22vALVPfcGaWNIT7MDavbtAuN0D", poster: "/work/motion-v3.jpg", orientation: "landscape", featured: true, year: "2025" },
  { slug: "real-estate", id: "1JSHL8rWVDm5wyTCMQehmRY2HiOo2F9-Y", poster: "/work/motion-v1.jpg", orientation: "portrait", featured: false, year: "2025" },
  { slug: "motion-graphics", id: "1UzuQaLlQOdX7sWkSZmxOT0N8wzxXv5V1", poster: "/work/motion-v2.jpg", orientation: "portrait", featured: false, year: "2025" },
  { slug: "fashion", id: "1wflUD8w0zno6952jklAMl4PpCwCd4lqh", poster: "/work/motion-v4.jpg", orientation: "portrait", featured: false, year: "2025" },
  { slug: "aerial", id: "1zOBe-t6_v7f_q8nyyqf7G3CkiuXadbz-", poster: "/work/motion-v5.jpg", orientation: "portrait", featured: false, year: "2025" },
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
