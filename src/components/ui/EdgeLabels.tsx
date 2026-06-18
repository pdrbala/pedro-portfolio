/**
 * Magazine furniture: vertical running labels pinned to the screen edges.
 * Rotated mono text — the kind of detail you only see on studio sites.
 */
export function EdgeLabels() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 hidden lg:block">
      <span
        className="label absolute top-1/2 left-2 -translate-y-1/2 text-muted"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        Pedro Guilherme — Visual Systems
      </span>
      <span
        className="label absolute top-1/2 right-2 -translate-y-1/2 text-muted"
        style={{ writingMode: "vertical-rl" }}
      >
        Portfolio © 2026 / São Paulo
      </span>
    </div>
  );
}
