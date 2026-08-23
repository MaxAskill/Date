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
  const [customHour, setCustomHour] = useState("6");
  const [customMinute, setCustomMinute] = useState("00");
  const [customPeriod, setCustomPeriod] = useState<"PM" | "AM">("PM");

  const handleCustomSubmit = () => {
    const hour = Number(customHour);
    const minute = Number(customMinute);
    if (!hour || Number.isNaN(minute)) return;
    const hh =
      customPeriod === "PM" ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour;
    const customValue = `${String(hh).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    const d = new Date();
    d.setHours(hh, minute, 0, 0);
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
            <div
              id="custom-time"
              className="grid grid-cols-3 gap-2 sm:grid-cols-[1fr_1fr_1fr_auto_auto]"
            >
              <SegmentedPicker
                label="Hour"
                value={customHour}
                options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
                onChange={setCustomHour}
              />
              <SegmentedPicker
                label="Minute"
                value={customMinute}
                options={["00", "15", "30", "45"]}
                onChange={setCustomMinute}
              />
              <SegmentedPicker
                label="Period"
                value={customPeriod}
                options={["PM", "AM"]}
                onChange={(value) => setCustomPeriod(value as "PM" | "AM")}
              />
              <Button onClick={handleCustomSubmit}>
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
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-rose-700/55">
              Custom time, no default clock popup
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

function SegmentedPicker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-rose-700/60">
        {label}
      </div>
      <div className="grid max-h-36 grid-cols-2 gap-1 overflow-y-auto rounded-sm border border-rose-200 bg-cream-50 p-1">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "rounded-sm px-2 py-1.5 text-sm font-semibold transition",
                active
                  ? "bg-rose-900 text-cream-50"
                  : "text-rose-900 hover:bg-rose-100",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
