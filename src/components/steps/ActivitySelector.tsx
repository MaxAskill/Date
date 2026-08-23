"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { activityOptions } from "@/lib/date-options";
import type { ActivityOption } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  selected: ActivityOption | null;
  customActivity: string | null;
  onSelect: (a: ActivityOption) => void;
  onSelectCustom: (name: string) => void;
};

export function ActivitySelector({
  selected,
  customActivity,
  onSelect,
  onSelectCustom,
}: Props) {
  const [customMode, setCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const handleSubmit = () => {
    if (!customValue.trim()) return;
    onSelectCustom(customValue.trim());
    setCustomMode(false);
  };

  return (
    <div>
      <SectionHeader
        eyebrow="Step 4 of 5"
        title="Should we do something after?"
        subtitle="Totally optional — pick something, or save it for the night."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {activityOptions.map((a, idx) => {
          const isSelected = selected?.id === a.id;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "rounded-2xl border transition overflow-hidden",
                isSelected
                  ? "border-rose-400 bg-rose-50 shadow-soft"
                  : "border-rose-100 bg-white/70 hover:border-rose-300 hover:bg-white",
              )}
            >
              <button
                type="button"
                onClick={() => onSelect(a)}
                className="w-full p-4 text-left"
                aria-pressed={isSelected}
              >
                <div className="text-2xl sm:text-3xl mb-2" aria-hidden>
                  {a.emoji}
                </div>
                <div className="font-display text-lg text-rose-900 leading-tight">
                  {a.label}
                </div>
                {a.description && (
                  <div className="text-xs text-rose-900/65 mt-1">
                    {a.description}
                  </div>
                )}
              </button>
              {a.href && (
                <div className="px-4 pb-4 -mt-1">
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-xs font-semibold text-rose-600 underline underline-offset-4 hover:text-rose-800"
                  >
                    Explore options
                  </a>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6">
        {!customMode ? (
          <Button variant="ghost" onClick={() => setCustomMode(true)}>
            <span aria-hidden>💭</span> Suggest something else
          </Button>
        ) : (
          <Card className="p-4 sm:p-5">
            <label
              htmlFor="custom-activity"
              className="block text-sm font-medium text-rose-900 mb-2"
            >
              What did you have in mind?
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="custom-activity"
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder="e.g. Stroll around Capitol Commons"
                className="flex-1 rounded-full border border-rose-200 px-4 py-2.5 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
              />
              <Button onClick={handleSubmit} disabled={!customValue.trim()}>
                Use this
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

        {customActivity && (
          <div className="mt-4">
            <Card className="p-4 border-rose-300 bg-rose-50">
              <div className="text-sm text-rose-900">
                <span className="font-medium">Your suggestion:</span>{" "}
                {customActivity}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
