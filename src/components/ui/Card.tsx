"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg bg-cream-50/92 backdrop-blur border border-rose-200/70 shadow-card",
        className,
      )}
      {...props}
    />
  );
}
