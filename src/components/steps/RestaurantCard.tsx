"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Restaurant } from "@/lib/types";

export function RestaurantCard({
  restaurant,
  selected,
  onSelect,
}: {
  restaurant: Restaurant;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group rounded-3xl overflow-hidden border bg-white transition-all",
        selected
          ? "border-rose-400 shadow-soft ring-2 ring-rose-200"
          : "border-rose-100 hover:border-rose-300 shadow-card",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="w-full text-left"
        aria-pressed={selected}
      >
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-rose-50">
          {/* Using <img> for simplicity & to avoid remote image config issues */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            <span className="rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-rose-700">
              {restaurant.cuisine}
            </span>
            <span className="rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-rose-700">
              {restaurant.priceRange}
            </span>
            {restaurant.vibe && (
              <span className="rounded-full bg-rose-500/90 text-white px-2.5 py-1 text-[11px] font-medium">
                {restaurant.vibe}
              </span>
            )}
          </div>
          {selected && (
            <div className="absolute top-3 right-3 rounded-full bg-rose-500 text-white text-xs font-semibold px-2.5 py-1 shadow">
              Selected ✓
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl sm:text-2xl text-rose-900 leading-tight">
              {restaurant.name}
            </h3>
          </div>
          <p className="mt-2 text-sm text-rose-900/75 leading-relaxed">
            {restaurant.description}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-700/80">
            <span aria-hidden>📍</span>
            <span>
              {restaurant.location}
              {restaurant.distanceFromOrtigas && (
                <span className="text-rose-700/60">
                  {" "}· {restaurant.distanceFromOrtigas}
                </span>
              )}
            </span>
          </div>
        </div>
      </button>

      <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-wrap gap-2">
        <a
          href={restaurant.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 px-3.5 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 transition"
        >
          <span aria-hidden>🗺️</span> Open in Google Maps
        </a>
        <button
          type="button"
          onClick={onSelect}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition",
            selected
              ? "bg-rose-500 text-white"
              : "bg-rose-100 text-rose-700 hover:bg-rose-200",
          )}
        >
          <span aria-hidden>💕</span> {selected ? "Chosen" : "Choose this place"}
        </button>
      </div>
    </motion.article>
  );
}
