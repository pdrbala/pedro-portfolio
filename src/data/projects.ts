import type { Lang } from "@/i18n/dictionaries";

export type CaseBlock =
  | { kind: "text"; heading?: string; body: string }
  | { kind: "image"; src: string; alt: string; w: number; h: number }
  | { kind: "gallery"; images: { src: string; alt: string; w: number; h: number }[] };

/** One tile in a card's multi-image teaser (see `layout: "collage"`). */
export interface GalleryImage {
  src: string;
  alt: string;
  w: number;
  h: number;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  year: string;
  cover: string;
  coverW: number;
  coverH: number;
  featured: boolean;
  /** "collage" renders `gallery` as a multi-image teaser instead of a single cover image. */
  layout: "single" | "collage";
  gallery?: GalleryImage[];
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
    slug: "gao-contabeis",
    index: "01",
    year: "2025",
    cover: "/work/gao-01.jpg",
    coverW: 1080,
    coverH: 1350,
    featured: true,
    layout: "collage",
  },
  {
    slug: "gao-apresentacao",
    index: "02",
    year: "2025",
    cover: "/work/gao-pres-01.png",
    coverW: 1920,
    coverH: 1080,
    featured: false,
    layout: "collage",
  },
  {
    slug: "eric-goncalves",
    index: "03",
    year: "2025",
    cover: "/work/eric-01.jpg",
    coverW: 1219,
    coverH: 820,
    featured: false,
    layout: "single",
  },
  {
    slug: "costa-costa",
    index: "04",
    year: "2024",
    cover: "/work/costa-01.jpg",
    coverW: 1600,
    coverH: 883,
    featured: false,
    layout: "single",
  },
] as const;

type Slug = (typeof base)[number]["slug"];

type Content = Pick<Project, "title" | "coverAlt" | "type" | "tags" | "description" | "caseStudy" | "gallery">;

const content: Record<Lang, Record<Slug, Content>> = {
  en: {
    "gao-contabeis": {
      title: "GAO Contábeis",
      coverAlt: "GAO Contábeis social media campaign posts",
      type: "Social Media / Graphic Design",
      tags: ["Social Media", "Graphic Design", "Editorial"],
      description:
        "Strategic social media design system for an accounting firm — high-impact typography, editorial layouts and targeted business communications.",
      gallery: [
        { src: "/work/gao-01.jpg", alt: "GAO Contábeis — Social post 1", w: 1080, h: 1350 },
        { src: "/work/gao-02.jpg", alt: "GAO Contábeis — Social post 2", w: 1080, h: 1350 },
        { src: "/work/gao-03.jpg", alt: "GAO Contábeis — Social post 3", w: 1080, h: 1350 },
        { src: "/work/gao-04.jpg", alt: "GAO Contábeis — Social post 4", w: 1080, h: 1350 },
      ],
      caseStudy: {
        intro:
          "A series of editorial social media posts created for GAO Contábeis. The strategy combines elegant serif headlines, strong corporate imagery, and concise financial messaging to elevate the brand's visual positioning.",
        role: "Graphic design, typography, social content direction",
        deliverables: ["Social Media Grid", "Content Design", "Typography System", "Post Templates"],
        blocks: [
          {
            kind: "text",
            heading: "Strategic Messaging & Editorial Layout",
            body: "Connecting business realities like tax reform, mine closure costs, and pricing strategy with refined visual presentation.",
          },
          { kind: "image", src: "/work/gao-02.jpg", alt: "GAO Contábeis — Mining cost post", w: 1080, h: 1350 },
          {
            kind: "text",
            heading: "Typography & Corporate Aesthetic",
            body: "Editorial serif typography over carefully compositioned photography builds authority and immediate trust with corporate clients.",
          },
          { kind: "image", src: "/work/gao-03.jpg", alt: "GAO Contábeis — Business growth post", w: 1080, h: 1350 },
          { kind: "image", src: "/work/gao-04.jpg", alt: "GAO Contábeis — Tax reform post", w: 1080, h: 1350 },
        ],
      },
    },
    "gao-apresentacao": {
      title: "GAO — Apresentação Institucional",
      coverAlt: "GAO Contábeis commercial presentation slides",
      type: "Presentation / Pitch Deck",
      tags: ["Presentation", "Slide Deck", "Corporate", "Infographics"],
      description:
        "Commercial pitch deck and institutional presentation for GAO Contábeis — service ecosystem, customer onboarding workflow, and performance metrics.",
      gallery: [
        { src: "/work/gao-pres-02.png", alt: "GAO — 360° Service Ecosystem", w: 1920, h: 1080 },
        { src: "/work/gao-pres-03.png", alt: "GAO — Onboarding Journey", w: 1920, h: 1080 },
        { src: "/work/gao-pres-07.png", alt: "GAO — Service Metrics", w: 1920, h: 1080 },
      ],
      caseStudy: {
        intro:
          "Full corporate slide deck designed for client proposals, pitch meetings, and internal reporting. Features a custom 360º ecosystem diagram, onboarding timeline, and data visualization cards.",
        role: "Slide deck design, infographic layout, pitch presentation",
        deliverables: ["16:9 Presentation Deck", "Commercial Proposal", "Infographics", "Onboarding System"],
        blocks: [
          {
            kind: "text",
            heading: "Brand Identity & 360º Service Ecosystem",
            body: "Clear visual hierarchy introducing the brand logo and mapping the 9 core accounting, tax, and legal business verticals.",
          },
          {
            kind: "gallery",
            images: [
              { src: "/work/gao-pres-01.png", alt: "GAO — Presentation Title Slide", w: 1920, h: 1080 },
              { src: "/work/gao-pres-02.png", alt: "GAO — 360º Service Ecosystem", w: 1920, h: 1080 },
            ],
          },
          {
            kind: "text",
            heading: "Onboarding Workflow & Core Values",
            body: "A linear timeline guiding prospective clients through the 8 onboarding steps from contract signature to fiscal monitoring.",
          },
          {
            kind: "gallery",
            images: [
              { src: "/work/gao-pres-03.png", alt: "GAO — Onboarding Journey", w: 1920, h: 1080 },
              { src: "/work/gao-pres-04.png", alt: "GAO — Transformative Goals", w: 1920, h: 1080 },
            ],
          },
          {
            kind: "text",
            heading: "Organizational Benefits & Performance Numbers",
            body: "Visualizing key performance indicators, client support volumes, and employee benefit programs.",
          },
          {
            kind: "gallery",
            images: [
              { src: "/work/gao-pres-05.png", alt: "GAO — Investment in People", w: 1920, h: 1080 },
              { src: "/work/gao-pres-06.png", alt: "GAO — Employee Benefits Grid", w: 1920, h: 1080 },
              { src: "/work/gao-pres-07.png", alt: "GAO — Service Metrics", w: 1920, h: 1080 },
              { src: "/work/gao-pres-08.png", alt: "GAO — Closing Contact Slide", w: 1920, h: 1080 },
            ],
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
          { kind: "image", src: "/work/costa-03.jpg", alt: "Logo em relevo sobre papel escuro", w: 1600, h: 1067 },
        ],
      },
    },
  },
  pt: {
    "gao-contabeis": {
      title: "GAO Contábeis",
      coverAlt: "Posts de redes sociais para GAO Contábeis",
      type: "Social Media / Design Gráfico",
      tags: ["Social Media", "Design Gráfico", "Editorial"],
      description:
        "Design de posts e comunicação estratégica para contabilidade — tipografia editorial de alto impacto e direção de conteúdo de negócios.",
      gallery: [
        { src: "/work/gao-01.jpg", alt: "GAO Contábeis — Post 1", w: 1080, h: 1350 },
        { src: "/work/gao-02.jpg", alt: "GAO Contábeis — Post 2", w: 1080, h: 1350 },
        { src: "/work/gao-03.jpg", alt: "GAO Contábeis — Post 3", w: 1080, h: 1350 },
        { src: "/work/gao-04.jpg", alt: "GAO Contábeis — Post 4", w: 1080, h: 1350 },
      ],
      caseStudy: {
        intro:
          "Série de posts conceituais desenvolvida para a GAO Contábeis. A proposta une títulos tipográficos elegantes, fotografia corporativa e redação direta sobre desafios financeiros reais.",
        role: "Design gráfico, tipografia, direção de peças sociais",
        deliverables: ["Grid para Instagram", "Design de Conteúdo", "Sistema Tipográfico", "Templates"],
        blocks: [
          {
            kind: "text",
            heading: "Comunicação Estratégica & Layout Editorial",
            body: "Tradução de pautas complexas como reforma tributária, custos operacionais e precificação em peças visuais marcantes.",
          },
          { kind: "image", src: "/work/gao-02.jpg", alt: "GAO Contábeis — Post sobre mineração", w: 1080, h: 1350 },
          {
            kind: "text",
            heading: "Tipografia & Estética Corporativa",
            body: "Uso rigoroso da tipografia serifada sobre imagens contextualizadas para passar autoridade imediata ao público decisor.",
          },
          { kind: "image", src: "/work/gao-03.jpg", alt: "GAO Contábeis — Post sobre atualização", w: 1080, h: 1350 },
          { kind: "image", src: "/work/gao-04.jpg", alt: "GAO Contábeis — Post sobre reforma tributária", w: 1080, h: 1350 },
        ],
      },
    },
    "gao-apresentacao": {
      title: "GAO — Apresentação Institucional",
      coverAlt: "Slides da apresentação comercial da GAO Contábeis",
      type: "Apresentação & Comercial / Slide System",
      tags: ["Apresentação", "Proposta Comercial", "Métricas", "Slide Deck"],
      description:
        "Deck de apresentação comercial e institucional para a GAO Contábeis — diagramação de métricas, ecossistema de serviços, onboarding e relatórios corporativos.",
      gallery: [
        { src: "/work/gao-pres-02.png", alt: "GAO — Ecossistema 360º", w: 1920, h: 1080 },
        { src: "/work/gao-pres-03.png", alt: "GAO — Onboarding", w: 1920, h: 1080 },
        { src: "/work/gao-pres-07.png", alt: "GAO — Métricas de Atendimento", w: 1920, h: 1080 },
      ],
      caseStudy: {
        intro:
          "Sistema completo de apresentação comercial e institucional para a GAO Contábeis. Desenvolvido para reuniões com clientes e propostas de alto valor, apresentando métricas de atendimento, onboarding funcional e visão ecossistêmica 360º.",
        role: "Design de slides, infografia comercial, pitch deck",
        deliverables: ["Apresentação 16:9", "Proposta Comercial", "Infográficos de Métricas", "Pitch Deck"],
        blocks: [
          {
            kind: "text",
            heading: "Identidade & Ecossistema de Serviços 360º",
            body: "Estrutura visual limpa apresentando a marca GAO e mapeamento infográfico circular das 9 soluções contábeis e fiscais.",
          },
          {
            kind: "gallery",
            images: [
              { src: "/work/gao-pres-01.png", alt: "GAO — Capa da Apresentação", w: 1920, h: 1080 },
              { src: "/work/gao-pres-02.png", alt: "GAO — Ecossistema 360º", w: 1920, h: 1080 },
            ],
          },
          {
            kind: "text",
            heading: "Jornada de Onboarding & Valores Corporativos",
            body: "Linha do tempo passo a passo demonstrando o fluxo de onboarding do cliente e o posicionamento de transformação da empresa.",
          },
          {
            kind: "gallery",
            images: [
              { src: "/work/gao-pres-03.png", alt: "GAO — Onboarding de Sucesso", w: 1920, h: 1080 },
              { src: "/work/gao-pres-04.png", alt: "GAO — Evoluir e Transformar Vidas", w: 1920, h: 1080 },
            ],
          },
          {
            kind: "text",
            heading: "Métricas de Performance & Benefícios",
            body: "Diagramação de indicadores de atendimento, volume de obrigações entregues e cartões de benefícios organizacionais.",
          },
          {
            kind: "gallery",
            images: [
              { src: "/work/gao-pres-05.png", alt: "GAO — Investimento em Pessoas", w: 1920, h: 1080 },
              { src: "/work/gao-pres-06.png", alt: "GAO — Lista de Benefícios e Estrutura", w: 1920, h: 1080 },
              { src: "/work/gao-pres-07.png", alt: "GAO — Métricas de Atendimento e Entregas", w: 1920, h: 1080 },
              { src: "/work/gao-pres-08.png", alt: "GAO — Encerramento e Contato Comercial", w: 1920, h: 1080 },
            ],
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
