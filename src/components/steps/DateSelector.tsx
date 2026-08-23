"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { DateOption } from "@/lib/types";
import { getSuggestedDates } from "@/lib/date-options";
import { formatDateShort } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  selected: DateOption | null;
  onSelect: (date: DateOption) => void;
};

export function DateSelector({ selected, onSelect }: Props) {
  const [customMode, setCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const suggested = getSuggestedDates();

  const handleCustomSubmit = () => {
    if (!customValue) return;
    // Build a DateOption from the user-picked date
    const [y, m, d] = customValue.split("-").map(Number);
    if (!y || !m || !d) return;
    const date = new Date(y, m - 1, d);
    const label = date.toLocaleDateString("en-US", { weekday: "long" });
    onSelect({
      id: `custom-${customValue}`,
      label,
      date: customValue,
      helper: formatDateShort(customValue),
    });
    setCustomMode(false);
  };

  return (
    <div>
      <SectionHeader
        eyebrow="Step 1 of 5"
        title="When can I steal a little bit of your time?"
        subtitle="Pick a date that feels right — you can change it any time."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {suggested.map((d: import("@/lib/types").DateOption, idx: number) => {
          const isSelected = selected?.id === d.id;
          return (
            <motion.button
              key={d.id}
              type="button"
              onClick={() => onSelect(d)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "text-left rounded-2xl border p-4 sm:p-5 transition-all",
                isSelected
                  ? "border-rose-400 bg-rose-50 shadow-soft"
                  : "border-rose-100 bg-white/70 hover:border-rose-300 hover:bg-white",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-rose-900 font-display text-xl sm:text-2xl leading-tight">
                    {d.label}
                  </div>
                  {d.helper && (
                    <div className="text-rose-700/70 text-sm mt-1">
                      {d.helper}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <span
                    className="shrink-0 text-rose-500 text-xl"
                    aria-label="Selected"
                  >
                    💕
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6">
        {!customMode ? (
          <Button variant="ghost" onClick={() => setCustomMode(true)}>
            <span aria-hidden>📅</span> Suggest another date
          </Button>
        ) : (
          <Card className="p-4 sm:p-5">
            <label
              htmlFor="custom-date"
              className="block text-sm font-medium text-rose-900 mb-2"
            >
              Pick a date
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="custom-date"
                type="date"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="flex-1 rounded-full border border-rose-200 px-4 py-2.5 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
                min={new Date().toISOString().slice(0, 10)}
              />
              <Button onClick={handleCustomSubmit} disabled={!customValue}>
                Use this date
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setCustomMode(false);
                  setCustomValue("");
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
