# DESIGN GUIDE — Pedro Guilherme® Portfolio

> Guia de direção de arte e arquitetura para quem (humano ou IA) for evoluir este projeto.
> Leia isto ANTES de mexer em qualquer componente visual.

## A ideia em uma frase

Portfólio de **graphic designer com identidade motion-first**, direção **"Brutalismo
Editorial / Swiss"**: grade visível, tipo condensado gigante que vaza a margem, vermelho
como bloco estrutural, mobília de revista. Confiante e rigoroso — energia Norm / Spin /
Krebs. Estúdio criativo internacional, NÃO portfólio de dev.

**Não é:** landing de SaaS, portfólio dark genérico, template de IA, festival de
glow/partícula, minimalismo "seguro" sem personalidade. Se começar a parecer "editorial
minimalista padrão de Awwwards", recuou demais — empurre o brutalismo.

**FORMATO = "quick portfolio"** (decisão do dono, modelo UX = ibelick/nim): chegar → ver os
trabalhos → contatar. Scroll curto, copy MÍNIMA, poucas seções. NÃO adicione seções/texto sem
pedir (o dono reclamou de verbosidade). Seções cortadas de propósito: Manifesto, Visual Wall,
Services, About — não recriar sem pedir. Bilíngue PT/EN obrigatório: toda string nova vai no
dicionário (`src/i18n/dictionaries.ts`), nunca hardcoded; conteúdo de projeto em `data/projects.ts`
(EN+PT). Intro = porta de idioma 1× por visita (localStorage `pg-lang`); toggle EN/PT no header/menu.

## Direção de arte

### Cores (tokens em `src/app/globals.css`)

| Token | Valor | Uso |
|---|---|---|
| `--background` | `#ECE8DF` | Papel off-white — a base é CLARA, de propósito |
| `--background-alt` | `#E3DED2` | Papel mais escuro p/ alternar seções (quebra a monotonia; hoje no MotionReel) |
| `--foreground` | `#141210` | Tinta (quase preto quente) |
| `--accent` | `#E10600` | **Vermelho (tipo F1)** — único acento. Pode virar BLOCO estrutural (barra, fundo), não só detalhe |
| `--muted` | `#76705F` | Metadados, texto secundário |
| `--border` | `rgba(20,18,16,.5)` | Regras DURAS (Swiss) — separadores de seção fortes |
| `--hairline` | `rgba(20,18,16,.16)` | Regras leves (sub-divisões) |
| `--grid-line` | `rgba(20,18,16,.06)` | Linhas da grade visível |

Regra de ouro do accent: se uma tela tem mais de ~3 elementos vermelhos visíveis, é demais
(o bloco estrutural conta como 1).

### Tipografia (carregada em `src/app/layout.tsx` via next/font)

Sistema de TRÊS vozes, cada uma com função clara:

- **Anton** (`--font-anton` → `font-display`, classe `.display`): a voz GIGANTE. Condensada,
  pesada, uppercase. É o que vaza a margem e vira arte. Tudo que é display/hero/headline de
  seção usa `.display`. Peso único 400 (já é heavy).
- **Space Grotesk** (`--font-space-grotesk` → `font-sans`, padrão do `body`): a voz legível
  com caráter. Parágrafos, subtítulos, títulos de card (classe `.heading` = bold uppercase
  tracking apertado). NÃO é genérica como a Archivo antiga.
- **IBM Plex Mono** (`--font-plex-mono` → `font-mono`, classe `.label`): metadados, folios,
  labels de borda, botões. Toda informação técnica/secundária fala em mono.

Sem serif (foi removida — não combina com brutalismo). Contraste vem de Anton-vs-mono, não
de itálico. Escala sempre com `clamp()`. Numerais de índice em tudo.

**HIERARQUIA (importante):** Anton gigante é reservado ao **nome do hero** (e título de case +
palavras decorativas em outline do reel). Títulos de SEÇÃO usam `.heading` (Space Grotesk),
escala média — NUNCA Anton gigante, senão "bate" com o nome. Esse foi um pedido explícito.

Classes utilitárias em `globals.css`: `.display`, `.heading`, `.label`, `.btn`/`.btn-fill`/`.btn-line`.

### Assinaturas visuais do site (o que tira do genérico)

- **Grade Swiss VISÍVEL** (`GridOverlay`): linhas de coluna fixas sobre o site inteiro
  (4 col mobile / 12 desktop), `--grid-line`. É o que mais grita "revista, não site".
- **Labels de borda rotacionados** (`EdgeLabels`): texto mono vertical fixo nas laterais
  (só ≥lg). Detalhe de estúdio.
- **Cursor assinatura** (`Cursor`): anel de tinta com `mix-blend-difference` que cresce em
  links e vira disco "VIEW" sobre `[data-cursor="view"]` (cards/next). Só pointer fino +
  motion. `body.cursor-hidden` esconde o cursor nativo.
- **Tipo-como-arte**: nome do hero gigante (Anton) que vaza a borda direita; numerais
  fantasma gigantes que entram no hover (Services, WorkCard); "Let's talk" gigante no fundo
  do Contact; palavras em outline no MotionReel.
- **Botões hard-edge** (`.btn`): retângulos sem raio, hover inverte (fill). NUNCA pílula.
- **Vermelho estrutural**: barra vermelha vertical no hero, palavra "move?" em vermelho.
- **Hard rule de accent** de 4px no topo da página (`Header`); header com células divididas
  por bordas duras.
- Tags/listas separadas por ` / ` em mono — **nunca** chips/badges com borda (vibe SaaS).
- Grain overlay fixo (`NoiseOverlay`), relógio ao vivo de SP, scrollbar fina customizada.

## Regras de motion

- **Motion é direção de arte, não decoração.** Cada animação precisa de um motivo.
- `motion` (motion/react) para interações de componente; **GSAP + ScrollTrigger** só para
  seções pinadas/timeline (hoje: só a VisualWall); **Lenis** para smooth scroll
  (sincronizado com ScrollTrigger via `gsap.ticker` no `SmoothScrollProvider`).
- Anime transform/opacity (e clip-path pontual). Nada de layout animation cara.
- `prefers-reduced-motion` SEMPRE: Lenis nem inicializa, preloader é pulado, GSAP retorna
  cedo, componentes motion renderizam estáticos. O estado padrão do DOM é o estado FINAL
  (ex.: a VisualWall sem JS é o grid montado).
- Easing assinatura: `[0.16, 1, 0.3, 1]` (expo-out suave). Reveals ~0.7–1s.
- Preloader: tipográfico, 1× por sessão (`sessionStorage: pg-intro`), <1.5s total.
- `template.tsx` (transição de rota): **só opacity** — transform/filter ali quebra
  `position: fixed` dos filhos (preloader, cursor, grade, edge labels).
- Lint do Next 16/React proíbe `setState` SÍNCRONO dentro de effect — sempre deferir com
  `setTimeout(…, 0)` (ver `Cursor.tsx`, `Preloader.tsx`).

## Arquitetura

```
src/
  i18n/            ← bilíngue PT/EN: dictionaries.ts (strings de UI) + LanguageProvider (useLang)
  data/            ← conteúdo editável: projects (bilíngue via getProjects(lang)), socials
  app/
    page.tsx       ← home QUICK: Intro > Hero > WorkGrid > MotionReel > Contact
    work/[slug]/   ← case study: page.tsx (server, SSG) renderiza CaseStudyView (client, localizado)
    template.tsx   ← transição de rota (opacity only)
  components/
    Intro.tsx      ← porta de idioma "Welcome/Bem-vindo" + PT/EN; exporta useIntroDone
    motion/        ← primitivas: SplitTextReveal, Reveal, Marquee
    sections/      ← Hero, MotionReel, Contact
    work/          ← WorkCard, WorkGrid, CaseStudyView
    ui/            ← GridOverlay, EdgeLabels, Cursor, NoiseOverlay, SectionLabel
    layout/ ui/ providers/
```

- Conteúdo NUNCA hardcoded em componente — sempre via `src/data/*.ts`.
- Imagens placeholder em `public/work/` (geradas por `scripts/make-placeholders.ps1`);
  trocar pelos trabalhos reais mantendo os paths do `projects.ts`.
- Next 16: ler docs em `node_modules/next/dist/docs/` antes de mexer (async params,
  Turbopack default, image qualities). Lint novo do React proíbe setState síncrono em
  effect e mutação durante render — usar os padrões já presentes no código.

## Repos de referência (o que extrair de cada um)

### Estrutura / base
- **github.com/ibelick/nim** — arquitetura enxuta de portfólio App Router, dados em arquivo único, poucas páginas.
- **github.com/magicuidesign/portfolio** — padrão "um arquivo de dados dirige o site inteiro" (aqui virou `src/data/`).
- **github.com/byigitt/portfolio** — referência de organização simples de componentes.

### Componentes de motion
- **github.com/ibelick/motion-primitives** — primitivas de texto/reveal (inspirou `SplitTextReveal`/`Reveal`); copiar PADRÕES, não componentes inteiros.
- **github.com/DavidHDev/react-bits** — interações pontuais (marquee com velocidade, cursores custom).
- **github.com/magicuidesign/magicui** — usar com critério; muita coisa lá é "SaaS demais" para este projeto.
- **github.com/motiondivision/motion** — a lib `motion` em si (docs de useScroll/useTransform/useVelocity — base do `Marquee` e `ScrollFadeText`).

### Engine de animação / scroll
- **github.com/greensock/GSAP** — ScrollTrigger (pin/scrub da VisualWall). GSAP é 100% grátis hoje, plugins incluídos.
- **github.com/greensock/gsap-skills** — receitas oficiais de ScrollTrigger.
- **github.com/darkroomengineering/lenis** — smooth scroll; ver README para integração com ScrollTrigger (já implementada no `SmoothScrollProvider`).

### Inspiração de layout/scroll
- **tympanus.net/codrops/2023/07/20/scroll-based-layout-animations/** e
  **tympanus.net/codrops/2024/09/18/exploration-of-on-scroll-layout-formations/** —
  origem da VisualWall (tiles espalhados → grid). A nossa versão usa transforms
  pré-computados (array `SCATTER`), sem FLIP, mais barato.
- **github.com/AliBagheri2079/dennis-snellenberg-portfolio** — preloader tipográfico,
  magnetic buttons, cursor label, transições de página. Referência de "feel", não de código.

**Importante:** nunca copiar branding/copy desses repos. Extrair padrão técnico e princípio
de direção de arte; a identidade é nossa.

## Checklist antes de entregar qualquer mudança

1. `npm run lint` e `npm run build` limpos.
2. Mobile não é versão quebrada do desktop (testar 375px).
3. Reduced motion funciona (conteúdo todo visível sem nenhuma animação).
4. Acessibilidade: foco visível, aria em interações, contraste forte, nada hover-only.
5. Accent vermelho continua raro na tela.
6. Performance: transform/opacity, `next/image` com `sizes`, nada de dependência nova sem motivo.

## Estado atual / próximos passos naturais

Feito: home completa, 4 case studies SSG, preloader, smooth scroll, visual wall pinada,
reel com velocidade de scroll, manifesto com fade por palavra, relógio SP, mobile ok.

Próximos (quando houver conteúdo real):
- Substituir placeholders por trabalhos reais (imagem/vídeo) em `public/work/`.
- Vídeo/loop real no MotionReel (mp4 mudo com poster, lazy).
- OG image + favicon com a identidade.
- E-mail real em `src/data/socials.ts` e domínio.
- Analytics leve (se pedir) e deploy (Vercel, build já é 100% estático).
