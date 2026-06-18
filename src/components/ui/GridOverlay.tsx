/**
 * Visible Swiss column grid — printed registration rules over the whole site.
 * Pointer-safe, very faint, aligned to the section gutters (px-5 / sm:px-10).
 */
export function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 px-5 sm:px-10"
    >
      <div className="mx-auto grid h-full max-w-[1700px] grid-cols-4 md:grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={
              i === 0
                ? "border-x border-[var(--grid-line)]"
                : i < 4
                  ? "border-r border-[var(--grid-line)]"
                  : "hidden border-r border-[var(--grid-line)] md:block"
            }
          />
        ))}
      </div>
    </div>
  );
}
