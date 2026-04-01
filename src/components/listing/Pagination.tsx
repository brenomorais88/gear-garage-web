import Link from "next/link";
import type { SearchParamsRecord } from "@/utils/query-params";
import { mergeQuery } from "@/utils/query-params";

type PaginationProps = {
  page: number;
  totalPages: number;
  searchParams: SearchParamsRecord;
};

export function Pagination({ page, totalPages, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 flex items-center justify-center gap-3">
      <Link
        aria-disabled={page <= 1}
        href={page <= 1 ? "#" : mergeQuery(searchParams, { page: page - 1 })}
        className="rounded-lg border border-border px-4 py-2 text-sm aria-disabled:pointer-events-none aria-disabled:opacity-40"
      >
        Anterior
      </Link>
      <span className="text-sm text-muted-foreground">
        Pagina {page} de {totalPages}
      </span>
      <Link
        aria-disabled={page >= totalPages}
        href={page >= totalPages ? "#" : mergeQuery(searchParams, { page: page + 1 })}
        className="rounded-lg border border-border px-4 py-2 text-sm aria-disabled:pointer-events-none aria-disabled:opacity-40"
      >
        Proxima
      </Link>
    </nav>
  );
}
