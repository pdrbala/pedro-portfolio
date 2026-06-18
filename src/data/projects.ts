import type { Lang } from "@/i18n/dictionaries";

export type CaseBlock =
  | { kind: "text"; heading?: string; body: string }
  | { kind: "image"; src: string; alt: string; w: number; h: number };

export interface Project {
  slug: string;
  index: string;
  title: string;
  year: string;
  cover: string;
  coverW: number;
  coverH: number;
  featured: boolean;
  coverAlt: string;
  type: string;
  tags: string[];
  description: string;
  caseStudy: {
    intro: string;
    role: string;
    deliverables: string[];
    blocks: CaseBlock[];
  };
}

/** Shared, language-agnostic fields. Replace covers in /public/work with real work. */
const base = [
  {
    slug: "a-verdade",
    index: "01",
    year: "2025",
    cover: "/work/jornal-01.jpg",
    coverW: 1055,
    coverH: 1491,
    featured: true,
  },
  {
    slug: "monogamia-capitalista",
    index: "02",
    year: "2025",
    cover: "/work/monogamia-01.jpg",
    coverW: 941,
    coverH: 1672,
    featured: false,
  },
  {
    slug: "eric-goncalves",
    index: "03",
    year: "2025",
    cover: "/work/eric-01.jpg",
    coverW: 1219,
    coverH: 820,
    featured: false,
  },
  {
    slug: "costa-costa",
    index: "04",
    year: "2024",
    cover: "/work/costa-01.jpg",
    coverW: 1600,
    coverH: 883,
    featured: false,
  },
] as const;

type Slug = (typeof base)[number]["slug"];

type Content = Pick<Project, "title" | "coverAlt" | "type" | "tags" | "description" | "caseStudy">;

const content: Record<Lang, Record<Slug, Content>> = {
  en: {
    "a-verdade": {
      title: "A Verdade",
      coverAlt: "A Verdade newspaper front page — who stole our time?",
      type: "Editorial / Newspaper",
      tags: ["Editorial", "Print", "Political"],
      description:
        "A conceptual political newspaper on labour and time — confrontational front pages, data spreads and protest photography.",
      caseStudy: {
        intro:
          "A special edition built around one question: who stole our time? Editorial design for a political paper on the 6×1 work scale — type-led, data-driven, unafraid.",
        role: "Editorial design, art direction, layout",
        deliverables: ["Front page", "Feature spread", "Infographics", "Cover system"],
        blocks: [
          {
            kind: "text",
            heading: "A front page that argues",
            body: "The cover leads with a single confrontational headline over protest photography — the message lands before a word is read.",
          },
          { kind: "image", src: "/work/jornal-02.jpg", alt: "Feature spread — six days for work", w: 1200, h: 1697 },
          {
            kind: "text",
            heading: "Data with a point of view",
            body: "Charts, a 6×1 day breakdown and a timeline turn statistics into an argument, not decoration.",
          },
          { kind: "image", src: "/work/jornal-03.jpg", alt: "Infographic page — how much time is left", w: 1200, h: 1697 },
        ],
      },
    },
    "monogamia-capitalista": {
      title: "Monogamia Capitalista",
      coverAlt: "Monogamia Capitalista book cover",
      type: "Editorial / Book cover",
      tags: ["Editorial", "Cover", "Print"],
      description:
        "Cover for a critical essay on love as property — vintage agitprop type, woodcut texture and a heart-shaped padlock.",
      caseStudy: {
        intro:
          "A book that frames monogamy as ownership deserves a cover that looks like old propaganda. Distressed display type, a constructivist navy-and-red palette and a heart-shaped padlock — romance as a contract.",
        role: "Cover design, typography, art direction",
        deliverables: ["Cover", "Typography", "Mockup"],
        blocks: [
          {
            kind: "text",
            heading: "Agitprop, updated",
            body: "Worn letterpress type, folk ornaments and a navy-and-red palette borrow the language of vintage political pamphlets — then turn it on romance.",
          },
          { kind: "image", src: "/work/monogamia-02.jpg", alt: "Monogamia Capitalista flat cover", w: 1055, h: 1491 },
          {
            kind: "text",
            heading: "One loaded symbol",
            body: "A heart-shaped padlock says everything the title argues: affection, possession and control, locked together.",
          },
        ],
      },
    },
    "eric-goncalves": {
      title: "Eric Gonçalves Advocacia",
      coverAlt: "Eric Gonçalves stationery system",
      type: "Visual identity / Law",
      tags: ["Branding", "Identity", "Editorial"],
      description:
        "A visual identity for a law practice — an EG column monogram, a navy & sand palette and a full stationery system.",
      caseStudy: {
        intro:
          "Law brands tend to look interchangeable. The brief: authority and trust without the clichés — a custom monogram that fuses the columns of a courthouse with the initials EG.",
        role: "Brand identity, logo, stationery",
        deliverables: ["Monogram", "Logo system", "Stationery", "Pattern & guidelines"],
        blocks: [
          {
            kind: "text",
            heading: "A monogram with a concept",
            body: "The EG ligature is built as a classical column — capital, shaft, base — so the mark reads as both initials and institution.",
          },
          { kind: "image", src: "/work/eric-02.jpg", alt: "Eric Gonçalves brand board", w: 1080, h: 2204 },
          {
            kind: "text",
            heading: "A system, head to toe",
            body: "Navy and sand, a woven pattern and a complete stationery suite keep the brand consistent from card to letterhead.",
          },
        ],
      },
    },
    "costa-costa": {
      title: "Costa & Costa",
      coverAlt: "Costa & Costa stationery mockup",
      type: "Visual identity / Accounting",
      tags: ["Branding", "Identity", "Logo"],
      description:
        "A warm, modern identity for an accounting firm — a crescent ‘C’ monogram in terracotta and a clean stationery system.",
      caseStudy: {
        intro:
          "Accounting doesn’t have to feel cold. Costa & Costa gets a warm terracotta palette and a crescent ‘C’ monogram — approachable, but precise.",
        role: "Brand identity, logo, stationery",
        deliverables: ["Monogram", "Logo system", "Stationery", "Mockups"],
        blocks: [
          {
            kind: "text",
            heading: "One confident letter",
            body: "The mark reduces the brand to a single crescent C — memorable at any size, from app icon to embossed folder.",
          },
          { kind: "image", src: "/work/costa-02.jpg", alt: "Business card in hand", w: 1600, h: 1120 },
          {
            kind: "text",
            heading: "Warm and precise",
            body: "Terracotta, soft neutrals and clean type make the firm feel human without losing rigour.",
          },
          { kind: "image", src: "/work/costa-03.jpg", alt: "Embossed logo on dark stock", w: 1600, h: 1067 },
        ],
      },
    },
  },
  pt: {
    "a-verdade": {
      title: "A Verdade — Jornal",
      coverAlt: "Capa do jornal A Verdade — quem roubou nosso tempo?",
      type: "Editorial / Jornal",
      tags: ["Editorial", "Impresso", "Político"],
      description:
        "Jornal político conceitual sobre trabalho e tempo — capas de impacto, infográficos e fotografia de luta.",
      caseStudy: {
        intro:
          "Uma edição especial em torno de uma pergunta: quem roubou nosso tempo? Projeto editorial para um jornal sobre a escala 6×1 — guiado pela tipografia, baseado em dados, sem medo.",
        role: "Projeto editorial, direção de arte, diagramação",
        deliverables: ["Capa", "Reportagem", "Infográficos", "Sistema de capa"],
        blocks: [
          {
            kind: "text",
            heading: "Uma capa que argumenta",
            body: "A capa abre com um único título confrontador sobre fotografia de manifestação — a mensagem chega antes de qualquer palavra.",
          },
          { kind: "image", src: "/work/jornal-02.jpg", alt: "Reportagem — seis dias para o trabalho", w: 1200, h: 1697 },
          {
            kind: "text",
            heading: "Dados com ponto de vista",
            body: "Gráficos, a divisão de um dia na 6×1 e uma linha do tempo transformam estatística em argumento, não em enfeite.",
          },
          { kind: "image", src: "/work/jornal-03.jpg", alt: "Página de infográfico — quanto tempo sobra", w: 1200, h: 1697 },
        ],
      },
    },
    "monogamia-capitalista": {
      title: "Monogamia Capitalista",
      coverAlt: "Capa do livro Monogamia Capitalista",
      type: "Editorial / Capa de livro",
      tags: ["Editorial", "Capa", "Impresso"],
      description:
        "Capa para um ensaio crítico sobre o amor como posse — tipografia de agitprop, textura xilogravada e um cadeado-coração.",
      caseStudy: {
        intro:
          "Um livro que trata a monogamia como propriedade pede uma capa com cara de propaganda antiga. Tipografia desgastada, paleta construtivista azul e vermelho e um cadeado em forma de coração — o romance como contrato.",
        role: "Design de capa, tipografia, direção de arte",
        deliverables: ["Capa", "Tipografia", "Mockup"],
        blocks: [
          {
            kind: "text",
            heading: "Agitprop, atualizado",
            body: "Tipografia gasta, ornamentos populares e uma paleta azul e vermelho tomam emprestada a linguagem dos panfletos políticos antigos — e a viram contra o romance.",
          },
          { kind: "image", src: "/work/monogamia-02.jpg", alt: "Capa plana de Monogamia Capitalista", w: 1055, h: 1491 },
          {
            kind: "text",
            heading: "Um símbolo carregado",
            body: "Um cadeado em forma de coração diz tudo o que o título argumenta: afeto, posse e controle, trancados juntos.",
          },
        ],
      },
    },
    "eric-goncalves": {
      title: "Eric Gonçalves Advocacia",
      coverAlt: "Sistema de papelaria do Eric Gonçalves",
      type: "Identidade visual / Advocacia",
      tags: ["Branding", "Identidade", "Editorial"],
      description:
        "Identidade visual para um escritório de advocacia — monograma-coluna EG, paleta azul & areia e sistema de papelaria.",
      caseStudy: {
        intro:
          "Marca de advogado tende a parecer toda igual. O objetivo: autoridade e confiança sem clichê — um monograma que funde as colunas do fórum com as iniciais EG.",
        role: "Identidade de marca, logo, papelaria",
        deliverables: ["Monograma", "Sistema de logo", "Papelaria", "Padrão & diretrizes"],
        blocks: [
          {
            kind: "text",
            heading: "Um monograma com conceito",
            body: "A ligadura EG é construída como uma coluna clássica — capitel, fuste, base — pra marca ler como inicial e como instituição.",
          },
          { kind: "image", src: "/work/eric-02.jpg", alt: "Board da marca Eric Gonçalves", w: 1080, h: 2204 },
          {
            kind: "text",
            heading: "Um sistema, da cabeça aos pés",
            body: "Azul-marinho e areia, um padrão trançado e uma papelaria completa mantêm a marca consistente do cartão ao timbrado.",
          },
        ],
      },
    },
    "costa-costa": {
      title: "Costa & Costa",
      coverAlt: "Mockup de papelaria da Costa & Costa",
      type: "Identidade visual / Contabilidade",
      tags: ["Branding", "Identidade", "Logo"],
      description:
        "Identidade quente e moderna para uma contabilidade — monograma ‘C’ em terracota e papelaria limpa.",
      caseStudy: {
        intro:
          "Contabilidade não precisa ser fria. Costa & Costa ganha uma paleta terracota e um monograma ‘C’ em meia-lua — acessível, mas preciso.",
        role: "Identidade de marca, logo, papelaria",
        deliverables: ["Monograma", "Sistema de logo", "Papelaria", "Mockups"],
        blocks: [
          {
            kind: "text",
            heading: "Uma letra confiante",
            body: "A marca se reduz a um único C em meia-lua — memorável em qualquer tamanho, do ícone à pasta com relevo.",
          },
          { kind: "image", src: "/work/costa-02.jpg", alt: "Cartão de visita na mão", w: 1600, h: 1120 },
          {
            kind: "text",
            heading: "Quente e precisa",
            body: "Terracota, neutros suaves e tipografia limpa deixam o escritório humano sem perder rigor.",
          },
          { kind: "image", src: "/work/costa-03.jpg", alt: "Logo em relevo sobre papel escuro", w: 1600, h: 1067 },
        ],
      },
    },
  },
};

export function getProjects(lang: Lang): Project[] {
  return base.map((b) => ({ ...b, ...content[lang][b.slug] }));
}

export function getProject(slug: string, lang: Lang) {
  return getProjects(lang).find((p) => p.slug === slug);
}

export function getNextProject(slug: string, lang: Lang) {
  const list = getProjects(lang);
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1) return list[0];
  return list[(i + 1) % list.length];
}

/** Slugs for static generation (language-agnostic). */
export const projectSlugs: string[] = base.map((b) => b.slug);
