import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center justify-center px-6 py-16">
      <Card className="p-8 sm:p-12 max-w-md text-center">
        <span className="text-5xl block mb-4" aria-hidden>💌</span>
        <h1 className="font-display text-3xl text-rose-900">Page not found</h1>
        <p className="mt-3 text-rose-900/70">
          That invitation link doesn&apos;t exist — but you can always start one
          fresh.
        </p>
        <Link href="/" className="inline-block mt-6">
          <Button>Go home</Button>
        </Link>
      </Card>
    </main>
  );
}
