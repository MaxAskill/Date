"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatDateLong } from "@/lib/utils";

type Response = {
  id: string;
  status: string;
  selected_date: string | null;
  selected_time: string | null;
  selected_restaurant_id: string | null;
  selected_restaurant_name: string | null;
  custom_restaurant: string | null;
  selected_activity: string | null;
  custom_activity: string | null;
  personal_message: string | null;
  created_at: string;
};

const DEFAULT_INVITE_SLUG = "beverly-pastrana";

export function CreatorDashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [slug, setSlug] = useState(DEFAULT_INVITE_SLUG);
  const [loading, setLoading] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // We probe a lookup with a fake slug to validate the password
      const res = await fetch(
        `/api/responses/lookup?slug=__probe__`,
        {
          cache: "no-store",
          headers: { "x-dashboard-password": password },
        },
      );
      if (res.status === 401) {
        setError("That password didn't work. Try again?");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Could not sign in.");
        return;
      }
      setAuthenticated(true);
      const data = await res.json();
      setConfigured(data.configured);
      await loadResponses(DEFAULT_INVITE_SLUG, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const loadResponses = async (inviteSlug: string, dashboardPassword = password) => {
    if (!inviteSlug.trim()) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/responses/lookup?slug=${encodeURIComponent(inviteSlug.trim())}&t=${Date.now()}`,
        {
          cache: "no-store",
          headers: { "x-dashboard-password": dashboardPassword },
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Could not load responses.");
        return;
      }
      const data = await res.json();
      setConfigured(data.configured);
      setResponses(data.responses || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async (e: React.FormEvent) => {
    e.preventDefault();
    await loadResponses(slug);
  };

  if (!authenticated) {
    return (
      <main className="min-h-dvh flex items-center justify-center px-6 py-16">
        <Card className="p-8 sm:p-10 max-w-md w-full">
          <h1 className="font-display text-3xl text-rose-900 text-center">
            Creator dashboard
          </h1>
          <p className="mt-2 text-sm text-rose-700/70 text-center">
            Enter the dashboard password to view responses.
          </p>
          <form onSubmit={handleSignIn} className="mt-6 space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Dashboard password"
              className="w-full rounded-full border border-rose-200 px-4 py-2.5 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
              autoFocus
            />
            {error && (
              <p className="text-sm text-rose-700 text-center">{error}</p>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!password || loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
          <p className="mt-6 text-xs text-rose-700/60 text-center">
            Set the password via <code>DASHBOARD_PASSWORD</code> in your
            environment.
          </p>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-dvh px-4 sm:px-6 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl sm:text-4xl text-rose-900">
          Creator dashboard
        </h1>
        <p className="mt-2 text-rose-900/70">
          Look up responses for a specific invite.
        </p>

        <form
          onSubmit={handleLoad}
          className="mt-6 flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="invite slug (e.g. beverly-pastrana)"
            className="flex-1 rounded-full border border-rose-200 px-4 py-2.5 text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
          />
          <Button type="submit" disabled={!slug.trim() || loading}>
            {loading ? "Loading…" : "Look up"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={!slug.trim() || loading}
            onClick={() => loadResponses(slug)}
          >
            Refresh
          </Button>
        </form>

        {configured === false && (
          <Card className="mt-6 p-5 border-amber-200 bg-amber-50">
            <div className="text-sm text-amber-900">
              <strong>Heads up:</strong> Supabase is not configured yet. Set
              <code className="mx-1 rounded bg-amber-100 px-1.5 py-0.5">
                NEXT_PUBLIC_SUPABASE_URL
              </code>
              and
              <code className="mx-1 rounded bg-amber-100 px-1.5 py-0.5">
                SUPABASE_SERVICE_ROLE_KEY
              </code>
              in <code>.env.local</code>, then run the SQL schema from{" "}
              <code>src/lib/supabase/server.ts</code> to start saving responses.
            </div>
          </Card>
        )}

        {error && (
          <p className="mt-4 text-sm text-rose-700">{error}</p>
        )}

        <AnimatePresence>
          {responses.length === 0 && slug && !loading && configured !== false && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <Card className="p-8 text-center">
                <span className="text-4xl" aria-hidden>🌷</span>
                <p className="mt-3 text-rose-900/80">
                  No responses yet for{" "}
                  <code className="rounded bg-rose-50 px-1.5 py-0.5 text-rose-700">
                    {slug}
                  </code>
                  .
                </p>
                <p className="mt-1 text-sm text-rose-700/60">
                  Once she responds, you&apos;ll see it here.
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 space-y-4">
          {responses.map((r) => (
            <ResponseCard key={r.id} response={r} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ResponseCard({ response: r }: { response: Response }) {
  const isAccepted = r.status === "accepted";
  const statusColor = isAccepted
    ? "bg-rose-500"
    : r.status === "declined"
      ? "bg-rose-200"
      : "bg-rose-300";
  const statusLabel = isAccepted
    ? "She said yes!"
    : r.status === "declined"
      ? "Declined"
      : "Undecided";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full text-white text-xs font-semibold px-2.5 py-1 ${statusColor}`}
          >
            {isAccepted && <span aria-hidden>❤️</span>}
            {statusLabel}
          </span>
          <span className="text-xs text-rose-700/60 ml-auto">
            {new Date(r.created_at).toLocaleString()}
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {r.selected_date && (
            <Item label="Date" value={formatDateLong(r.selected_date)} />
          )}
          {r.selected_time && (
            <Item label="Time" value={r.selected_time} />
          )}
          {r.selected_restaurant_name && (
            <Item label="Restaurant" value={r.selected_restaurant_name} />
          )}
          {r.custom_restaurant && (
            <Item label="Custom restaurant" value={r.custom_restaurant} />
          )}
          {r.selected_activity && (
            <Item label="Activity" value={prettyActivity(r.selected_activity)} />
          )}
          {r.custom_activity && (
            <Item label="Custom activity" value={r.custom_activity} />
          )}
        </dl>

        {r.personal_message && (
          <div className="mt-5 rounded-2xl bg-rose-50 border border-rose-200 p-4">
            <div className="text-xs uppercase tracking-wider text-rose-700/60">
              Her message
            </div>
            <p className="mt-1 text-rose-900 italic whitespace-pre-wrap">
              &ldquo;{r.personal_message}&rdquo;
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-rose-700/60">
        {label}
      </dt>
      <dd className="mt-0.5 text-rose-900 font-medium">{value}</dd>
    </div>
  );
}

function prettyActivity(id: string): string {
  const map: Record<string, string> = {
    coffee: "Coffee",
    dessert: "Dessert",
    movie: "Movie",
    bowling: "Bowling",
    arcade: "Arcade",
    walk: "Night walk",
    drinks: "Drinks",
    "capitol-commons": "Capitol Commons",
    "podium-dessert": "Podium dessert",
    "estancia-coffee": "Estancia coffee",
    "greenfield-walk": "Greenfield stroll",
    "airbnb-ortigas": "Ortigas staycation",
    "airbnb-megamall": "Near Megamall stay",
    "airbnb-estancia": "Estancia weekend",
    "outside-date": "Just outside",
    "you-choose": "You choose",
    later: "Let's decide later",
  };
  return map[id] || id;
}
