import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <main className="min-h-dvh flex items-center justify-center px-6 py-16 bg-romantic-gradient">
      <Card className="p-8 sm:p-12 max-w-2xl text-center">
        <span className="text-5xl sm:text-6xl block mb-5" aria-hidden>💌</span>
        <h1 className="font-display text-4xl sm:text-5xl text-rose-900 leading-tight">
          A little invitation
        </h1>
        <p className="mt-4 text-rose-900/75 text-base sm:text-lg leading-relaxed">
          This invitation is made for{" "}
          <span className="font-semibold text-rose-800">Beverly Pastrana</span>.
          Share this link with her:
          {" "}
          <code className="rounded bg-rose-50 px-2 py-0.5 text-rose-700 text-sm">
            /for/beverly-pastrana
          </code>{" "}
        </p>
        <p className="mt-3 text-sm text-rose-700/70">
          She can choose the date, time, place, activity, and save the final plan
          to her calendar.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/for/beverly-pastrana">
            <Button size="lg">Open Beverly&apos;s invite ✨</Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary">
              Creator dashboard
            </Button>
          </Link>
        </div>
        <p className="mt-8 text-xs text-rose-700/60">
          Responses are stored privately in the creator dashboard when Supabase
          is configured.
        </p>
      </Card>
    </main>
  );
}
