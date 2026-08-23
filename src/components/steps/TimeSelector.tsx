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
  const [customHour, setCustomHour] = useState(6);
  const [customMinute, setCustomMinute] = useState(0);
  const [customPeriod, setCustomPeriod] = useState<"PM" | "AM">("PM");

  const handleCustomSubmit = () => {
    const hh =
      customPeriod === "PM"
        ? customHour === 12
          ? 12
          : customHour + 12
        : customHour === 12
          ? 0
          : customHour;
    const customValue = `${String(hh).padStart(2, "0")}:${String(customMinute).padStart(2, "0")}`;
    const d = new Date();
    d.setHours(hh, customMinute, 0, 0);
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
            <div id="custom-time" className="grid gap-4">
              <div className="rounded-lg border border-rose-200 bg-rose-900 p-5 text-center shadow-soft">
                <div className="text-[10px] uppercase tracking-[0.28em] text-cream-100/60">
                  custom time
                </div>
                <div className="mt-3 font-mono text-5xl font-bold tracking-[0.08em] text-cream-50 sm:text-6xl">
                  {String(customHour).padStart(2, "0")}
                  <span className="mx-1 text-cream-100/45">:</span>
                  {String(customMinute).padStart(2, "0")}
                  <span className="ml-3 align-middle text-lg tracking-[0.14em] text-cream-100/75">
                    {customPeriod}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <ClockStepper
                  label="Hour"
                  value={String(customHour).padStart(2, "0")}
                  onIncrease={() =>
                    setCustomHour((hour) => (hour === 12 ? 1 : hour + 1))
                  }
                  onDecrease={() =>
                    setCustomHour((hour) => (hour === 1 ? 12 : hour - 1))
                  }
                />
                <ClockStepper
                  label="Minute"
                  value={String(customMinute).padStart(2, "0")}
                  onIncrease={() =>
                    setCustomMinute((minute) => (minute + 5) % 60)
                  }
                  onDecrease={() =>
                    setCustomMinute((minute) => (minute === 0 ? 55 : minute - 5))
                  }
                />
                <div>
                  <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-rose-700/60">
                    Period
                  </div>
                  <div className="grid gap-1 rounded-sm border border-rose-200 bg-cream-50 p-1">
                    {(["PM", "AM"] as const).map((period) => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setCustomPeriod(period)}
                        className={cn(
                          "rounded-sm px-2 py-2 text-sm font-semibold transition",
                          customPeriod === period
                            ? "bg-rose-900 text-cream-50"
                            : "text-rose-900 hover:bg-rose-100",
                        )}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
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
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-rose-700/55">
              Digital-style custom clock
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

function ClockStepper({
  label,
  value,
  onIncrease,
  onDecrease,
}: {
  label: string;
  value: string;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div>
      <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-rose-700/60">
        {label}
      </div>
      <div className="grid gap-1 rounded-sm border border-rose-200 bg-cream-50 p-1">
        <button
          type="button"
          onClick={onIncrease}
          className="rounded-sm px-2 py-1 text-rose-900 hover:bg-rose-100"
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          +
        </button>
        <div className="rounded-sm bg-rose-50 px-2 py-2 text-center font-mono text-xl font-bold text-rose-900">
          {value}
        </div>
        <button
          type="button"
          onClick={onDecrease}
          className="rounded-sm px-2 py-1 text-rose-900 hover:bg-rose-100"
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          -
        </button>
      </div>
    </div>
  );
}
