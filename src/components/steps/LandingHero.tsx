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
    <section className="relative min-h-[88dvh] flex items-center justify-center px-3 py-8 sm:px-6 sm:py-12 overflow-hidden">
      <div className="absolute inset-0 bg-romantic-gradient" aria-hidden />
      <div
        className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/45 to-transparent"
        aria-hidden
      />
      <Sparkles count={22} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[520px] bg-rose-900 px-6 py-10 text-center shadow-card sm:px-10 sm:py-12"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block text-[11px] sm:text-xs tracking-[0.34em] uppercase text-cream-100/90 mb-6"
        >
          A private invitation
        </motion.span>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.75, ease: "easeOut" }}
          className="relative mx-auto mb-8 h-[260px] w-full max-w-[320px] sm:h-[300px]"
          aria-hidden
        >
          <div className="absolute left-1/2 top-5 h-56 w-44 -translate-x-1/2 rounded-lg border border-cream-100/35 bg-cream-100/10 shadow-inner" />
          <div className="absolute left-[8%] top-16 w-36 rotate-[-8deg] rounded-sm bg-cream-50 p-3 text-left shadow-card">
            <div className="text-[10px] uppercase tracking-[0.24em] text-rose-500">
              little plan
            </div>
            <div className="mt-3 font-display text-2xl leading-none text-rose-900">
              dinner
              <br />
              coffee
              <br />
              a walk
            </div>
            <div className="mt-4 h-px bg-rose-200" />
            <div className="mt-3 text-[10px] leading-relaxed text-rose-800/70">
              Ortigas / Megamall / wherever you feel comfortable
            </div>
          </div>
          <div className="absolute right-[9%] top-10 w-36 rotate-[7deg] rounded-sm bg-cream-50 p-2 shadow-card">
            <div
              className="h-36 rounded-sm bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&auto=format&fit=crop)",
              }}
            />
            <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-rose-800/70">
              date night
            </div>
          </div>
          <div className="absolute bottom-5 left-[23%] w-40 rotate-[-3deg] rounded-sm border border-cream-100/50 bg-rose-800 px-4 py-4 shadow-soft">
            <div className="text-[10px] uppercase tracking-[0.22em] text-cream-100/65">
              for
            </div>
            <div className="mt-1 font-display text-2xl leading-none text-cream-50">
              Beverly
              <br />
              Pastrana
            </div>
          </div>
          <div className="absolute bottom-10 right-[14%] flex h-16 w-16 rotate-[10deg] items-center justify-center rounded-full border border-cream-100/60 bg-cream-50 text-2xl shadow-card">
            📍
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-4xl sm:text-5xl text-cream-50 leading-[1.08]"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mx-auto mt-6 max-w-sm text-sm sm:text-base leading-relaxed text-cream-100/82"
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
          <Button
            size="lg"
            onClick={onContinue}
            className="border-cream-50 bg-cream-50 text-rose-900 hover:border-cream-100 hover:bg-cream-100"
          >
            See my plan <span aria-hidden>✨</span>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8 text-[11px] uppercase tracking-[0.24em] text-cream-100/65"
        >
          Made with care, just for you.
        </motion.p>
      </motion.div>
    </section>
  );
}
