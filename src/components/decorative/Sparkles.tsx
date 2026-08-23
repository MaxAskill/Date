"use client";

import { useEffect, useState } from "react";

type Sparkle = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
};

export function Sparkles({ count = 24 }: { count?: number }) {
  const [items, setItems] = useState<Sparkle[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {items.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: "0 0 8px rgba(255,255,255,0.9)",
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
