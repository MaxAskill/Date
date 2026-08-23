export default function Loading() {
  return (
    <main className="min-h-dvh flex items-center justify-center">
      <div className="flex items-center gap-2 text-rose-500">
        <span className="inline-block h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
        <span className="inline-block h-2 w-2 rounded-full bg-rose-400 animate-pulse [animation-delay:120ms]" />
        <span className="inline-block h-2 w-2 rounded-full bg-rose-400 animate-pulse [animation-delay:240ms]" />
      </div>
    </main>
  );
}
