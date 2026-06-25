/**
 * Visible Swiss column grid — printed registration rules over the whole site.
 * Pointer-safe, very faint, aligned to the section gutters (px-5 / sm:px-10).
 * Kept sparse (2 cols mobile / 6 desktop) so it reads as structure, not noise.
 */
export function GridOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 px-5 sm:px-10">
      <div className="mx-auto grid h-full max-w-[1700px] grid-cols-2 md:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={
              i === 0
                ? "border-x border-[var(--grid-line)]"
                : i < 2
                  ? "border-r border-[var(--grid-line)]"
                  : "hidden border-r border-[var(--grid-line)] md:block"
            }
          />
        ))}
      </div>
    </div>
  );
}
