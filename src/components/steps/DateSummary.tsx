"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDateLong } from "@/lib/utils";
import type { DatePlan } from "@/lib/types";

type Props = {
  plan: DatePlan;
  onConfirm: () => void;
  onEdit: () => void;
  isSubmitting?: boolean;
};

export function DateSummary({ plan, onConfirm, onEdit, isSubmitting }: Props) {
  const { date, time, restaurant, customRestaurant, activity, customActivity } =
    plan;

  const restaurantName =
    restaurant?.name === "Surprise me"
      ? "A surprise I'll pick thoughtfully"
      : restaurant?.name || customRestaurant || "TBD";
  const activityName =
    activity?.label === "Let's decide later"
      ? "We'll decide in the moment"
      : activity?.label || customActivity || "We'll see in the moment";

  return (
    <div>
      <SectionHeader
        eyebrow="One last check"
        title="Our date 💕"
        subtitle="One last look before we make this official…"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 sm:p-8 max-w-xl mx-auto">
          <ul className="space-y-4">
            <Row
              emoji="📅"
              label="Date"
              value={date ? formatDateLong(date.date) : "Not set"}
            />
            <Row
              emoji="🕕"
              label="Time"
              value={time?.label || "Not set"}
            />
            <Row
              emoji="📍"
              label="Where"
              value={
                restaurant?.location
                  ? `${restaurantName} — ${restaurant.location}`
                  : restaurantName
              }
            />
            <Row
              emoji="🍽️"
              label="Restaurant"
              value={restaurantName}
            />
            <Row
              emoji="✨"
              label="After"
              value={activityName}
            />
            {plan.personalMessage && (
              <Row
                emoji="💌"
                label="Note"
                value={`"${plan.personalMessage}"`}
              />
            )}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={onConfirm}
              disabled={isSubmitting}
            >
              <span aria-hidden>❤️</span> It&apos;s a date!
            </Button>
            <Button size="lg" variant="secondary" onClick={onEdit}>
              <span aria-hidden>✏️</span> Change something
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function Row({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-xl sm:text-2xl shrink-0" aria-hidden>
        {emoji}
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-rose-700/60">
          {label}
        </div>
        <div className="text-rose-900 font-medium mt-0.5">{value}</div>
      </div>
    </li>
  );
}
