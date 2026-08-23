"use client";

import { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 mb-6 sm:mb-8">
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.28em] text-rose-500 font-semibold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl text-rose-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-rose-900/70 max-w-prose text-base sm:text-lg">
          {subtitle}
        </p>
      )}
      {action}
    </div>
  );
}
