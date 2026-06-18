/**
 * Brutalist geometric tiles for the motion reel — vector (no cropping), each with
 * one subtle internal animation. Colors come from CSS vars. Animations auto-disable
 * under prefers-reduced-motion (global rule). viewBox is 4:3 (120×90).
 */

const ink = "var(--foreground)";
const paper = "var(--background)";
const red = "var(--accent)";

export const MOTIF_COUNT = 6;

function Frame({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="120" height="90" fill={bg} />
      {children}
    </svg>
  );
}

function Bars() {
  // equalizer — bars scale vertically out of phase
  const xs = [16, 36, 56, 76, 96];
  return (
    <Frame bg={paper}>
      {xs.map((x, i) => (
        <rect
          key={x}
          x={x}
          y={20}
          width={12}
          height={56}
          fill={i === 2 ? red : ink}
          className="m-bar"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </Frame>
  );
}

function Triangle() {
  return (
    <Frame bg={paper}>
      <polygon points="60,16 102,76 18,76" fill={ink} className="m-rock" />
      <circle cx="60" cy="68" r="5" fill={red} />
    </Frame>
  );
}

function Stripes() {
  // ink bars scrolling vertically over red
  const ys = [-8, 4, 16, 28, 40, 52, 64, 76, 88];
  return (
    <Frame bg={red}>
      <g className="m-slide">
        {ys.map((y) => (
          <rect key={y} x="14" y={y} width="92" height="6" fill={ink} />
        ))}
      </g>
    </Frame>
  );
}

function CircleBreathe() {
  return (
    <Frame bg={red}>
      <circle cx="60" cy="45" r="26" fill={paper} className="m-breathe" />
    </Frame>
  );
}

function Ring() {
  return (
    <Frame bg={ink}>
      <circle cx="60" cy="45" r="26" fill="none" stroke={paper} strokeWidth="6" />
      <g className="m-spin">
        <circle cx="60" cy="19" r="5.5" fill={red} />
      </g>
    </Frame>
  );
}

function Concentric() {
  return (
    <Frame bg={paper}>
      {[34, 25, 16].map((r) => (
        <circle key={r} cx="60" cy="45" r={r} fill="none" stroke={ink} strokeWidth="3" />
      ))}
      <circle cx="60" cy="45" r="7" fill={red} className="m-pulse" />
    </Frame>
  );
}

const MOTIFS = [Bars, Triangle, Stripes, CircleBreathe, Ring, Concentric];

export function Motif({ variant }: { variant: number }) {
  const Component = MOTIFS[variant % MOTIFS.length];
  return <Component />;
}
