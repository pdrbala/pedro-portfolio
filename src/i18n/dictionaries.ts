export type Lang = "en" | "pt";

export const LANGS: Lang[] = ["en", "pt"];

/** UI chrome strings. Project/case content is localized in src/data/projects.ts. */
export const dict = {
  en: {
    nav: { work: "Work", motion: "Motion", contact: "Contact", menu: "Menu", close: "Close" },
    hero: {
      role: "Graphic Designer & Art Director",
      location: "Brazil-based / Working worldwide",
      tagline: "Motion-led visual systems, campaign assets and digital-first brand moments.",
      available: "Available — Q3 2026",
      viewWork: "Selected work",
      startProject: "Start a project",
    },
    work: { label: "Selected Work", lead: "Editorial, identity and graphic work.", featured: "Featured" },
    reel: { label: "In motion" },
    contact: {
      label: "Contact",
      reply: "Replies within 48h",
      heading: "Let’s work together.",
      email: "Email",
      elsewhere: "Elsewhere",
    },
    intro: { welcome: "Welcome", prompt: "Pick a language" },
    footer: { rights: "© 2026 Pedro Guilherme", note: "Brazil-based / Worldwide", top: "Top" },
    caseStudy: {
      back: "All work",
      role: "Role",
      deliverables: "Deliverables",
      tags: "Tags",
      label: "Case study",
      next: "Next project",
      view: "View case",
    },
    langName: "English",
  },
  pt: {
    nav: { work: "Trabalhos", motion: "Motion", contact: "Contato", menu: "Menu", close: "Fechar" },
    hero: {
      role: "Designer Gráfico — Editorial & Identidade",
      location: "Brasil — Design editorial com propósito",
      tagline: "Design editorial, identidade visual e peças gráficas para publicações, campanhas e movimentos.",
      available: "Aberto a propostas",
      viewWork: "Ver trabalhos",
      startProject: "Vamos conversar",
    },
    work: { label: "Trabalhos Selecionados", lead: "Editorial, identidade e peças gráficas com propósito.", featured: "Destaque" },
    reel: { label: "Em movimento" },
    contact: {
      label: "Contato",
      reply: "Respondo em até 48h",
      heading: "Vamos criar algo com propósito.",
      email: "E-mail",
      elsewhere: "Redes",
    },
    intro: { welcome: "Bem-vindo", prompt: "Escolha o idioma" },
    footer: { rights: "© 2026 Pedro Guilherme", note: "Do Brasil / Mundo", top: "Topo" },
    caseStudy: {
      back: "Todos os trabalhos",
      role: "Função",
      deliverables: "Entregas",
      tags: "Tags",
      label: "Case",
      next: "Próximo projeto",
      view: "Ver case",
    },
    langName: "Português",
  },
} as const;

export type Dict = (typeof dict)[Lang];
