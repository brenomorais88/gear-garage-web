export function DetailSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="animate-pulse rounded-xl border border-border bg-white p-4">
        <div className="aspect-[16/10] rounded-lg bg-muted" />
        <div className="mt-3 h-4 w-2/3 rounded bg-muted" />
      </div>
      <div className="animate-pulse space-y-4">
        <div className="rounded-xl border border-border bg-white p-5">
          <div className="h-5 w-1/2 rounded bg-muted" />
          <div className="mt-3 h-9 w-full rounded bg-muted" />
        </div>
        <div className="rounded-xl border border-border bg-white p-5">
          <div className="h-4 w-1/3 rounded bg-muted" />
          <div className="mt-3 h-4 w-full rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
