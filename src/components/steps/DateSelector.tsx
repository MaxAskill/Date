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
  const [customError, setCustomError] = useState("");

  const suggested = getSuggestedDates();

  const handleCustomSubmit = () => {
    setCustomError("");
    if (!customValue) return;
    const [y, m, d] = customValue.split("-").map(Number);
    if (!y || !m || !d) {
      setCustomError("Use YYYY-MM-DD, like 2026-09-05.");
      return;
    }
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() !== y ||
      date.getMonth() !== m - 1 ||
      date.getDate() !== d
    ) {
      setCustomError("That date does not look valid.");
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      setCustomError("Pick today or a future date.");
      return;
    }
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
                type="text"
                inputMode="numeric"
                value={customValue}
                onChange={(e) => {
                  setCustomValue(e.target.value);
                  setCustomError("");
                }}
                placeholder="YYYY-MM-DD"
                className="flex-1 rounded-sm border border-rose-200 bg-cream-50 px-4 py-2.5 font-medium tracking-[0.08em] text-rose-900 placeholder:text-rose-800/35 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <Button onClick={handleCustomSubmit} disabled={!customValue}>
                Use this date
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setCustomMode(false);
                  setCustomValue("");
                  setCustomError("");
                }}
              >
                Cancel
              </Button>
            </div>
            {customError && (
              <p className="mt-3 text-sm text-rose-700">{customError}</p>
            )}
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-rose-700/55">
              Custom date, no default calendar popup
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
