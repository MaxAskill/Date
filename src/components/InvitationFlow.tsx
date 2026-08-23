"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LandingHero } from "@/components/steps/LandingHero";
import { InvitationMessage } from "@/components/steps/InvitationMessage";
import { DateSelector } from "@/components/steps/DateSelector";
import { TimeSelector } from "@/components/steps/TimeSelector";
import { RestaurantSelector } from "@/components/steps/RestaurantSelector";
import { ActivitySelector } from "@/components/steps/ActivitySelector";
import { PersonalMessage } from "@/components/steps/PersonalMessage";
import { DateSummary } from "@/components/steps/DateSummary";
import { ConfirmationScreen } from "@/components/steps/ConfirmationScreen";

import { ProgressDots } from "@/components/decorative/ProgressDots";
import { Button } from "@/components/ui/Button";
import { FloatingHearts } from "@/components/decorative/FloatingHearts";

import type {
  DatePlan,
  DateOption,
  TimeOption,
  Restaurant,
  ActivityOption,
} from "@/lib/types";

type Step =
  | "landing"
  | "message"
  | "date"
  | "time"
  | "restaurant"
  | "activity"
  | "note"
  | "summary"
  | "confirmed";

const PLANNER_STEPS: { id: Step; label: string }[] = [
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "restaurant", label: "Restaurant" },
  { id: "activity", label: "Activity" },
  { id: "note", label: "Note" },
  { id: "summary", label: "Review" },
];

export function InvitationFlow({
  inviteSlug,
  inviteeName,
}: {
  inviteSlug: string;
  inviteeName?: string;
}) {
  const [step, setStep] = useState<Step>("landing");
  const [plan, setPlan] = useState<DatePlan>({
    date: null,
    time: null,
    restaurant: null,
    customRestaurant: null,
    activity: null,
    customActivity: null,
    personalMessage: "",
    inviteeName,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentPlannerIndex = PLANNER_STEPS.findIndex((s) => s.id === step);

  const goTo = (next: Step) => {
    setError(null);
    setStep(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const updatePlan = (patch: Partial<DatePlan>) =>
    setPlan((prev) => ({ ...prev, ...patch }));

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        invite_slug: inviteSlug,
        status: "accepted" as const,
        selected_date: plan.date?.date ?? null,
        selected_time: plan.time?.value ?? null,
        selected_time_label: plan.time?.label ?? null,
        selected_restaurant_id:
          plan.restaurant?.id === "surprise" ? null : plan.restaurant?.id ?? null,
        selected_restaurant_name:
          plan.restaurant?.id === "surprise"
            ? "Surprise me"
            : plan.restaurant?.name ?? plan.customRestaurant ?? null,
        custom_restaurant: plan.customRestaurant ?? null,
        selected_activity: plan.activity?.id ?? null,
        custom_activity: plan.customActivity ?? null,
        personal_message: plan.personalMessage ?? null,
      };

      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Could not save your response.");
      }
      goTo("confirmed");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setPlan({
      date: null,
      time: null,
      restaurant: null,
      customRestaurant: null,
      activity: null,
      customActivity: null,
      personalMessage: "",
      inviteeName,
    });
    goTo("landing");
  };

  return (
    <main className="relative min-h-dvh">
      <FloatingHearts count={step === "confirmed" ? 28 : 14} />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10">
        {currentPlannerIndex >= 0 && (
          <div className="mb-6 flex items-center justify-between">
            <ProgressDots
              total={PLANNER_STEPS.length}
              current={currentPlannerIndex}
              labels={PLANNER_STEPS.map((s) => s.label)}
            />
            <span className="text-xs text-rose-700/60 hidden sm:block">
              Step {currentPlannerIndex + 1} of {PLANNER_STEPS.length}
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "landing" && (
            <motion.div key="landing" {...fadeSlide}>
              <LandingHero
                inviteeName={inviteeName}
                onContinue={() => goTo("message")}
              />
            </motion.div>
          )}

          {step === "message" && (
            <motion.div key="message" {...fadeSlide}>
              <InvitationMessage
                inviteeName={inviteeName}
                onAccept={() => goTo("date")}
                onShowPlan={() => goTo("date")}
              />
            </motion.div>
          )}

          {step === "date" && (
            <motion.div key="date" {...fadeSlide}>
              <Section>
                <DateSelector
                  selected={plan.date}
                  onSelect={(d) => updatePlan({ date: d })}
                />
                <Footer
                  onBack={() => goTo("message")}
                  onNext={() => goTo("time")}
                  canContinue={Boolean(plan.date)}
                />
              </Section>
            </motion.div>
          )}

          {step === "time" && (
            <motion.div key="time" {...fadeSlide}>
              <Section>
                <TimeSelector
                  selected={plan.time}
                  onSelect={(t) => updatePlan({ time: t })}
                />
                <Footer
                  onBack={() => goTo("date")}
                  onNext={() => goTo("restaurant")}
                  canContinue={Boolean(plan.time)}
                />
              </Section>
            </motion.div>
          )}

          {step === "restaurant" && (
            <motion.div key="restaurant" {...fadeSlide}>
              <Section>
                <RestaurantSelector
                  selected={plan.restaurant}
                  customRestaurant={plan.customRestaurant}
                  onSelectRestaurant={(r) =>
                    updatePlan({
                      restaurant: r,
                      customRestaurant: null,
                    })
                  }
                  onSelectSurprise={() =>
                    updatePlan({
                      restaurant: {
                        id: "surprise",
                        name: "Surprise me",
                        cuisine: "Surprise",
                        category: "Fine Dining",
                        priceRange: "₱₱",
                        location: "I'll pick something thoughtful",
                        description: "I'll choose somewhere special.",
                        image:
                          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
                        mapsUrl: "",
                      },
                      customRestaurant: null,
                    })
                  }
                  onSelectCustom={(name) =>
                    updatePlan({
                      restaurant: null,
                      customRestaurant: name,
                    })
                  }
                />
                <Footer
                  onBack={() => goTo("time")}
                  onNext={() => goTo("activity")}
                  canContinue={Boolean(
                    plan.restaurant || plan.customRestaurant,
                  )}
                />
              </Section>
            </motion.div>
          )}

          {step === "activity" && (
            <motion.div key="activity" {...fadeSlide}>
              <Section>
                <ActivitySelector
                  selected={plan.activity}
                  customActivity={plan.customActivity}
                  onSelect={(a) =>
                    updatePlan({ activity: a, customActivity: null })
                  }
                  onSelectCustom={(name) =>
                    updatePlan({ activity: null, customActivity: name })
                  }
                />
                <Footer
                  onBack={() => goTo("restaurant")}
                  onNext={() => goTo("note")}
                  canContinue={Boolean(plan.activity || plan.customActivity)}
                />
              </Section>
            </motion.div>
          )}

          {step === "note" && (
            <motion.div key="note" {...fadeSlide}>
              <Section>
                <PersonalMessage
                  value={plan.personalMessage || ""}
                  onChange={(v) => updatePlan({ personalMessage: v })}
                />
                <Footer
                  onBack={() => goTo("activity")}
                  onNext={() => goTo("summary")}
                  canContinue
                />
              </Section>
            </motion.div>
          )}

          {step === "summary" && (
            <motion.div key="summary" {...fadeSlide}>
              <Section>
                <DateSummary
                  plan={plan}
                  onConfirm={handleConfirm}
                  onEdit={() => goTo("date")}
                  isSubmitting={isSubmitting}
                />
                {error && (
                  <p className="mt-4 text-center text-sm text-rose-700">
                    {error}
                  </p>
                )}
                <div className="mt-6 flex justify-center">
                  <Button
                    variant="ghost"
                    onClick={() => goTo("date")}
                  >
                    ← Back to the plan
                  </Button>
                </div>
              </Section>
            </motion.div>
          )}

          {step === "confirmed" && (
            <motion.div key="confirmed" {...fadeSlide}>
              <ConfirmationScreen plan={plan} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className="py-4 sm:py-6">{children}</div>;
}

function Footer({
  onBack,
  onNext,
  canContinue,
}: {
  onBack: () => void;
  onNext: () => void;
  canContinue?: boolean;
}) {
  return (
    <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-between gap-3 sm:items-center">
      <Button variant="ghost" onClick={onBack}>
        ← Back
      </Button>
      <Button onClick={onNext} disabled={!canContinue}>
        Continue →
      </Button>
    </div>
  );
}

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;
