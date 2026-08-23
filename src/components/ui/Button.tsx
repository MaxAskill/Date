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
      "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const sizes = {
      md: "px-5 py-2.5 text-sm sm:text-base",
      lg: "px-7 py-3.5 text-base sm:text-lg",
    };

    const variants = {
      primary:
        "bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-soft hover:shadow-lg hover:from-rose-600 hover:to-rose-500",
      secondary:
        "bg-white text-rose-700 border border-rose-200 hover:border-rose-300 hover:bg-rose-50",
      ghost:
        "bg-transparent text-rose-700 hover:bg-rose-50/60",
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
