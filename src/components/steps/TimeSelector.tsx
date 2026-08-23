"use client";

import { useRef, useState } from "react";
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
          <div className="space-y-3">
            {selected?.id.startsWith("custom-") && (
              <Card className="border-rose-500 bg-rose-900 p-4 text-cream-50 shadow-soft">
                <div className="text-[10px] uppercase tracking-[0.22em] text-cream-100/65">
                  Custom time selected
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="font-mono text-4xl font-bold tracking-[0.08em]">
                    {selected.label}
                  </div>
                  <span className="text-2xl" aria-hidden>
                    ✓
                  </span>
                </div>
              </Card>
            )}
            <Button variant="ghost" onClick={() => setCustomMode(true)}>
              <span aria-hidden>🕒</span>{" "}
              {selected?.id.startsWith("custom-")
                ? "Change custom time"
                : "Suggest another time"}
            </Button>
          </div>
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
                <ScrollWheel
                  label="Hour"
                  value={String(customHour).padStart(2, "0")}
                  options={Array.from({ length: 12 }, (_, idx) =>
                    String(idx + 1).padStart(2, "0"),
                  )}
                  onChange={(value) => setCustomHour(Number(value))}
                />
                <ScrollWheel
                  label="Minute"
                  value={String(customMinute).padStart(2, "0")}
                  options={Array.from({ length: 12 }, (_, idx) =>
                    String(idx * 5).padStart(2, "0"),
                  )}
                  onChange={(value) => setCustomMinute(Number(value))}
                />
                <ScrollWheel
                  label="Period"
                  value={customPeriod}
                  options={["PM", "AM"]}
                  onChange={(value) => setCustomPeriod(value as "PM" | "AM")}
                />
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
              Scroll the wheels or tap a value
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

function ScrollWheel({
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
  const itemHeight = 44;
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      const index = Math.max(
        0,
        Math.min(options.length - 1, Math.round(target.scrollTop / itemHeight)),
      );
      onChange(options[index]);
    }, 80);
  };

  return (
    <div>
      <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-rose-700/60">
        {label}
      </div>
      <div className="relative h-40 overflow-hidden rounded-sm border border-rose-200 bg-cream-50">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-cream-50 to-cream-50/0"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-cream-50 to-cream-50/0"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-2 top-1/2 z-10 h-10 -translate-y-1/2 rounded-sm border-y border-rose-300/80 bg-rose-50/65"
          aria-hidden
        />
        <div
          className="relative z-20 h-full snap-y snap-mandatory overflow-y-auto px-1 py-[60px]"
          onScroll={handleScroll}
        >
          {options.map((option) => {
            const active = value === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                className={cn(
                  "mb-1 grid h-10 w-full snap-center place-items-center rounded-sm font-mono text-lg font-bold transition",
                  active
                    ? "bg-rose-900 text-cream-50 shadow-soft"
                    : "text-rose-900/55 hover:bg-rose-100 hover:text-rose-900",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
