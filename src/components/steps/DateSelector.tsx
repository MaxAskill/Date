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
  const [viewDate, setViewDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const suggested = getSuggestedDates();

  const selectCustomDate = (date: Date) => {
    const iso = toLocalIsoDate(date);
    const label = date.toLocaleDateString("en-US", { weekday: "long" });
    onSelect({
      id: `custom-${iso}`,
      label,
      date: iso,
      helper: formatDateShort(iso),
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
          <div className="space-y-3">
            {selected?.id.startsWith("custom-") && (
              <Card className="border-rose-500 bg-rose-900 p-4 text-cream-50 shadow-soft">
                <div className="text-[10px] uppercase tracking-[0.22em] text-cream-100/65">
                  Custom date selected
                </div>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-display text-2xl leading-tight">
                      {selected.label}
                    </div>
                    <div className="mt-1 text-sm text-cream-100/80">
                      {formatDateShort(selected.date)}
                    </div>
                  </div>
                  <span className="text-2xl" aria-hidden>
                    ✓
                  </span>
                </div>
              </Card>
            )}
            <Button variant="ghost" onClick={() => setCustomMode(true)}>
              <span aria-hidden>📅</span>{" "}
              {selected?.id.startsWith("custom-")
                ? "Change custom date"
                : "Suggest another date"}
            </Button>
          </div>
        ) : (
          <Card className="p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-rose-700/60">
                  Pick a date
                </div>
                <div className="mt-1 font-display text-2xl text-rose-900">
                  {viewDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setViewDate(addMonths(viewDate, -1))}
                  className="grid h-9 w-9 place-items-center rounded-sm border border-rose-200 text-rose-900 hover:bg-rose-100"
                  aria-label="Previous month"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setViewDate(addMonths(viewDate, 1))}
                  className="grid h-9 w-9 place-items-center rounded-sm border border-rose-200 text-rose-900 hover:bg-rose-100"
                  aria-label="Next month"
                >
                  →
                </button>
              </div>
            </div>

            <MiniCalendar viewDate={viewDate} onSelect={selectCustomDate} />

            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setCustomMode(false);
                }}
              >
                Cancel
              </Button>
            </div>
            {/* <p className="mt-3 text-xs uppercase tracking-[0.18em] text-rose-700/55">
              Themed calendar, no default browser popup
            </p> */}
          </Card>
        )}
      </div>
    </div>
  );
}

function MiniCalendar({
  viewDate,
  onSelect,
}: {
  viewDate: Date;
  onSelect: (date: Date) => void;
}) {
  const days = buildCalendarDays(viewDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 border-b border-rose-200 pb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
          <div
            key={`${day}-${idx}`}
            className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-700/60"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {days.map(({ date, inMonth }) => {
          const disabled = date < today;
          const isToday = toLocalIsoDate(date) === toLocalIsoDate(today);
          return (
            <button
              key={toLocalIsoDate(date)}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={cn(
                "aspect-square rounded-sm text-sm font-semibold transition",
                inMonth ? "text-rose-900" : "text-rose-900/30",
                isToday && "ring-1 ring-rose-400",
                disabled
                  ? "cursor-not-allowed opacity-30"
                  : "hover:bg-rose-900 hover:text-cream-50",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildCalendarDays(viewDate: Date): { date: Date; inMonth: boolean }[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());

  return Array.from({ length: 42 }, (_, idx) => {
    const date = new Date(start);
    date.setDate(start.getDate() + idx);
    date.setHours(0, 0, 0, 0);
    return { date, inMonth: date.getMonth() === month };
  });
}

function addMonths(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount);
  return next;
}

function toLocalIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
