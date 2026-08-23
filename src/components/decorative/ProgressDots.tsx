"use client";

import { cn } from "@/lib/utils";

export function ProgressDots({
  total,
  current,
  labels,
}: {
  total: number;
  current: number; // 0..total-1
  labels?: string[];
}) {
  return (
    <div
      className="flex items-center gap-1.5 sm:gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i === current
              ? "w-6 sm:w-8 bg-rose-500"
              : i < current
                ? "w-3 sm:w-4 bg-rose-300"
                : "w-2 sm:w-3 bg-rose-200",
          )}
          aria-label={labels?.[i] ?? `Step ${i + 1}`}
        />
      ))}
    </div>
  );
}
