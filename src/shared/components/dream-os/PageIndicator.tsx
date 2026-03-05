"use client";

interface PageIndicatorProps {
  total: number;
  current: number;
}

/** Three-dot page indicator that highlights the active desktop page. */
export function PageIndicator({ total, current }: PageIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-2">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current
              ? "w-4 bg-[var(--dream-primary)]"
              : "w-1.5 bg-foreground/25"
          }`}
        />
      ))}
    </div>
  );
}
