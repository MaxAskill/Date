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
        "rounded-3xl bg-white/80 backdrop-blur border border-white shadow-card",
        className,
      )}
      {...props}
    />
  );
}
