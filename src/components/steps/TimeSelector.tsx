"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { timeOptions } from "@/lib/date-options";
import { cn } from "@/lib/utils";
import type { TimeOption } from "@/lib/types";

type Props = {
  selected: TimeOption | null;
  onSelect: (time: TimeOption) => void;
};

export function TimeSelector({ selected, onSelect }: Props) {
  const [customMode, setCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState("18:00");

  const handleCustomSubmit = () => {
    if (!customValue) return;
    const [hh, mm] = customValue.split(":").map(Number);
    if (hh === undefined || mm === undefined) return;
    const d = new Date();
    d.setHours(hh, mm, 0, 0);
    const label = d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    onSelect({ id: `custom-${customValue}`, label, value: customValue });
    setCustomMode(false);
  };

  return (
    <div>
      <SectionHeader
        eyebrow="Step 2 of 5"
        title="What time works best?"
        subtitle="Pick something that fits comfortably with your day."
      />

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {timeOptions.map((t, idx) => {
          const isSelected = selected?.id === t.id;
          return (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => onSelect(t)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.4 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "rounded-2xl border px-3 py-3 sm:py-4 text-center font-medium transition-all",
                isSelected
                  ? "border-rose-400 bg-rose-50 text-rose-700 shadow-soft"
                  : "border-rose-100 bg-white/70 text-rose-900 hover:border-rose-300 hover:bg-white",
              )}
            >
              {t.label}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6">
        {!customMode ? (
          <Button variant="ghost" onClick={() => setCustomMode(true)}>
            <span aria-hidden>🕒</span> Suggest another time
          </Button>
        ) : (
          <Card className="p-4 sm:p-5">
            <label
              htmlFor="custom-time"
              className="block text-sm font-medium text-rose-900 mb-2"
            >
              Pick a time
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="custom-time"
                type="time"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="flex-1 rounded-full border border-rose-200 px-4 py-2.5 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
              />
              <Button onClick={handleCustomSubmit} disabled={!customValue}>
                Use this time
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setCustomMode(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
