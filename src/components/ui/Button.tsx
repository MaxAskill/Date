"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", children, ...rest },
    ref,
  ) {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-[0.08em] uppercase transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const sizes = {
      md: "px-5 py-2.5 text-sm sm:text-base",
      lg: "px-7 py-3.5 text-sm sm:text-base",
    };

    const variants = {
      primary:
        "bg-rose-900 text-cream-50 border border-rose-900 shadow-soft hover:bg-rose-700 hover:border-rose-700",
      secondary:
        "bg-transparent text-rose-900 border border-rose-300 hover:border-rose-700 hover:bg-rose-50",
      ghost:
        "bg-transparent text-rose-800 hover:bg-rose-100/70",
    };

    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
