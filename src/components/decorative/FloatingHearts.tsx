"use client";

import { useEffect, useState } from "react";

type Heart = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
  opacity: number;
};

const EMOJIS = ["💕", "💗", "💖", "🌸", "✨", "🤍", "💞"];

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 22,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 12,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      opacity: 0.25 + Math.random() * 0.4,
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 animate-floatUp select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
