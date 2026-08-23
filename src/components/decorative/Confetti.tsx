"use client";

import { useEffect, useState } from "react";

const COLORS = ["#f43f6d", "#ff9eb1", "#9c7bff", "#ffd6a5", "#fff5f7", "#f7f4ff"];

type Piece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotate: number;
};

export function Confetti({ pieces = 80 }: { pieces?: number }) {
  const [items, setItems] = useState<Piece[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: pieces }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.6 + Math.random() * 1.4,
        size: 6 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: Math.random() * 360,
      })),
    );
  }, [pieces]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden z-50"
    >
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 block animate-confettiFall"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.4}px`,
            backgroundColor: p.color,
            borderRadius: "2px",
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
