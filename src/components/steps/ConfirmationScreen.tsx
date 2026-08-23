"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Confetti } from "@/components/decorative/Confetti";
import { Sparkles } from "@/components/decorative/Sparkles";
import { buildGoogleCalendarUrl, downloadIcsFile } from "@/lib/ics";
import { formatDateLong } from "@/lib/utils";
import type { DatePlan } from "@/lib/types";

type Props = {
  plan: DatePlan;
  onReset: () => void;
};

export function ConfirmationScreen({ plan, onReset }: Props) {
  const [showConfetti, setShowConfetti] = useState(true);

  const gcalUrl = buildGoogleCalendarUrl(plan);

  return (
    <section className="relative px-4 sm:px-6 py-10 sm:py-16 flex items-center justify-center min-h-[80dvh]">
      {showConfetti && <Confetti />}
      <Sparkles count={20} />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-xl"
      >
        <Card className="p-7 sm:p-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 180, delay: 0.2 }}
            className="text-5xl sm:text-6xl"
            aria-hidden
          >
            💕
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-5 font-display text-4xl sm:text-5xl text-rose-900 leading-tight"
          >
            It&apos;s a date.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-4 text-rose-900/80 text-lg"
          >
            I&apos;m looking forward to seeing you.
          </motion.p>

          {plan.date && plan.time && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 p-4 sm:p-5"
            >
              <div className="text-sm uppercase tracking-wider text-rose-700/70">
                Locked in
              </div>
              <div className="mt-1 font-display text-xl sm:text-2xl text-rose-900">
                {formatDateLong(plan.date.date)} · {plan.time.label}
              </div>
              <div className="text-rose-900/75 mt-1">
                {plan.restaurant?.name || plan.customRestaurant || "TBD"}
              </div>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-5 text-sm text-rose-700/70"
          >
            Now I just have to figure out what to wear.{" "}
            <span aria-hidden>😅</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-7 flex flex-col sm:flex-row gap-3 justify-center"
          >
            {gcalUrl && (
              <a
                href={gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium bg-rose-500 text-white shadow-soft hover:bg-rose-600 transition"
              >
                <span aria-hidden>🗓️</span> Add to Google Calendar
              </a>
            )}
            <Button
              size="lg"
              variant="secondary"
              onClick={() => downloadIcsFile(plan)}
              disabled={!plan.date || !plan.time}
            >
              <span aria-hidden>📅</span> Download calendar file
            </Button>
          </motion.div>

          <button
            type="button"
            onClick={onReset}
            className="mt-6 text-xs text-rose-700/60 underline hover:text-rose-700"
          >
            Start over
          </button>
        </Card>
      </motion.div>
    </section>
  );
}
