"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function PersonalMessage({ value, onChange }: Props) {
  return (
    <div>
      <SectionHeader
        eyebrow="Step 5 of 5"
        title="Anything you want to tell me?"
        subtitle="Optional — leave a little message if you'd like."
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-4 sm:p-6">
          <label
            htmlFor="personal-message"
            className="block text-sm font-medium text-rose-900 mb-2"
          >
            A little note <span className="text-rose-700/50 font-normal">(optional)</span>
          </label>
          <textarea
            id="personal-message"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="You can leave me a little message here..."
            rows={5}
            maxLength={500}
            className="w-full rounded-2xl border border-rose-200 px-4 py-3 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white resize-none"
          />
          <div className="mt-2 text-xs text-rose-700/60 text-right">
            {value.length} / 500
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
