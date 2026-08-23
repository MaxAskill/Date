"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function InvitationMessage({
  inviteeName,
  onAccept,
  onShowPlan,
}: {
  inviteeName?: string;
  onAccept: () => void;
  onShowPlan: () => void;
}) {
  return (
    <section className="relative px-6 py-12 sm:py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl"
      >
        <Card className="p-8 sm:p-12 text-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-5xl sm:text-6xl block mb-6"
            aria-hidden
          >
            💌
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl text-rose-900 leading-tight"
          >
            A small note
            {inviteeName ? `, ${inviteeName}` : ""}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-5 text-rose-900/80 text-base sm:text-lg leading-relaxed"
          >
            I&apos;d really love to spend some time with you. Nothing complicated —
            just good food, good conversation, and hopefully a really nice memory
            together.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 font-display text-2xl sm:text-3xl text-rose-700"
          >
            So… would you let me take you on a date?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Button size="lg" onClick={onAccept}>
              <span aria-hidden>❤️</span> Yes, I&apos;d love to
            </Button>
            <Button size="lg" variant="secondary" onClick={onShowPlan}>
              <span aria-hidden>🌷</span> Maybe… show me the plan
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-6 text-xs text-rose-700/60"
          >
            No pressure — you can change anything along the way.
          </motion.p>
        </Card>
      </motion.div>
    </section>
  );
}
