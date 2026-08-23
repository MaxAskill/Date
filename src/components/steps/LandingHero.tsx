"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "@/components/decorative/Sparkles";

export function LandingHero({
  inviteeName,
  onContinue,
}: {
  inviteeName?: string;
  onContinue: () => void;
}) {
  const headline = inviteeName ? `Can I take you out, ${inviteeName}?` : "Can I take you out?";

  return (
    <section className="relative min-h-[88dvh] flex items-center justify-center px-6 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-romantic-gradient" aria-hidden />
      <Sparkles count={32} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase text-rose-500 mb-5"
        >
          A little invitation
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl text-rose-900 leading-[1.05] tracking-tight"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-6 text-rose-900/75 text-lg sm:text-xl leading-relaxed"
        >
          I have a little idea for us... but I want you to have a say too.{" "}
          <span aria-hidden>💕</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10"
        >
          <Button size="lg" onClick={onContinue}>
            See my plan <span aria-hidden>✨</span>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8 text-xs text-rose-700/60"
        >
          Made with care, just for you.
        </motion.p>
      </motion.div>
    </section>
  );
}
