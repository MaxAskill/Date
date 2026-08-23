"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RestaurantCard } from "./RestaurantCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getRestaurants } from "@/lib/restaurants";
import type { Restaurant, RestaurantCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: RestaurantCategory | "All"; label: string; emoji: string }[] = [
  { id: "All", label: "All", emoji: "✨" },
  { id: "Italian", label: "Italian", emoji: "🍝" },
  { id: "Japanese", label: "Japanese", emoji: "🍣" },
  { id: "Steak", label: "Steak", emoji: "🥩" },
  { id: "Korean", label: "Korean", emoji: "🍜" },
  { id: "Cafe", label: "Café", emoji: "☕" },
  { id: "Dessert", label: "Dessert", emoji: "🍰" },
  { id: "Casual", label: "Casual", emoji: "🍽️" },
  { id: "Fine Dining", label: "Nice Dinner", emoji: "✨" },
];

type Props = {
  selected: Restaurant | null;
  customRestaurant: string | null;
  onSelectRestaurant: (r: Restaurant) => void;
  onSelectSurprise: () => void;
  onSelectCustom: (name: string) => void;
};

export function RestaurantSelector({
  selected,
  customRestaurant,
  onSelectRestaurant,
  onSelectSurprise,
  onSelectCustom,
}: Props) {
  const [filter, setFilter] = useState<RestaurantCategory | "All">("All");
  const [customMode, setCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const all = useMemo(() => getRestaurants(), []);

  const filtered = useMemo(() => {
    if (filter === "All") return all;
    return all.filter((r) => r.category === filter);
  }, [all, filter]);

  const handleCustomSubmit = () => {
    if (!customValue.trim()) return;
    onSelectCustom(customValue.trim());
    setCustomMode(false);
  };

  return (
    <div>
      <SectionHeader
        eyebrow="Step 3 of 5"
        title="Where should we eat?"
        subtitle="Pick somewhere you'd enjoy — this part is completely up to you. Most options are around Ortigas, Capitol Commons, Estancia, and Podium."
      />

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {CATEGORIES.map((c) => {
          const isActive = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={cn(
                "shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition border",
                isActive
                  ? "bg-rose-500 text-white border-rose-500 shadow-soft"
                  : "bg-white text-rose-700 border-rose-200 hover:border-rose-300",
              )}
            >
              <span aria-hidden>{c.emoji}</span> {c.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filtered.map((r) => (
          <RestaurantCard
            key={r.id}
            restaurant={r}
            selected={selected?.id === r.id}
            onSelect={() => onSelectRestaurant(r)}
          />
        ))}
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <Card
          className={cn(
            "p-4 sm:p-5 cursor-pointer transition border",
            customRestaurant && !selected
              ? "border-rose-400 bg-rose-50"
              : "border-rose-100 hover:border-rose-300",
          )}
          onClick={() => {
            if (customRestaurant) {
              onSelectCustom(customRestaurant);
            } else {
              setCustomMode(true);
            }
          }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl" aria-hidden>💡</span>
            <div className="flex-1">
              <div className="font-display text-lg text-rose-900">
                I have somewhere else in mind
              </div>
              <p className="text-sm text-rose-900/70 mt-1">
                {customRestaurant
                  ? `Currently: ${customRestaurant}`
                  : "Suggest your own restaurant."}
              </p>
            </div>
          </div>
        </Card>

        <Card
          className={cn(
            "p-4 sm:p-5 cursor-pointer transition border",
            selected?.id === "surprise"
              ? "border-rose-400 bg-rose-50"
              : "border-rose-100 hover:border-rose-300",
          )}
          onClick={onSelectSurprise}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl" aria-hidden>🎁</span>
            <div className="flex-1">
              <div className="font-display text-lg text-rose-900">
                Surprise me
              </div>
              <p className="text-sm text-rose-900/70 mt-1">
                Pick something thoughtful for us.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {customMode && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <Card className="p-4 sm:p-5">
            <label
              htmlFor="custom-restaurant"
              className="block text-sm font-medium text-rose-900 mb-2"
            >
              What restaurant did you have in mind?
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="custom-restaurant"
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder="e.g. Wild Flour, Estancia"
                className="flex-1 rounded-full border border-rose-200 px-4 py-2.5 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
              />
              <Button onClick={handleCustomSubmit} disabled={!customValue.trim()}>
                Use this place
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
        </motion.div>
      )}
    </div>
  );
}
