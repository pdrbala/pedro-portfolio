import { cn } from "@/lib/utils";

/**
 * Editorial section marker: accent square, index, em-dash, name —
 * with an optional right-aligned meta slot. Sits on a hard top rule.
 */
export function SectionLabel({
  index,
  children,
  meta,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-foreground pt-3",
        className,
      )}
    >
      <p className="label flex items-center gap-3 text-foreground">
        <span aria-hidden className="inline-block size-2 bg-accent" />
        {index ? (
          <>
            {index}
            <span aria-hidden className="text-muted">
              /
            </span>
          </>
        ) : null}
        {children}
      </p>
      {meta ? <p className="label text-muted">{meta}</p> : null}
    </div>
  );
}
