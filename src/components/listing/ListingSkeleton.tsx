export function ListingSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-xl border border-border bg-white">
          <div className="aspect-[16/10] bg-muted" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-2/3 rounded bg-muted" />
            <div className="h-5 w-1/2 rounded bg-muted" />
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-5/6 rounded bg-muted" />
            <div className="h-10 w-full rounded bg-muted" />
          </div>
        </div>
      ))}
    </section>
  );
}
