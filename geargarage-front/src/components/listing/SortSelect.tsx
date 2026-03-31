"use client";

import { useRouter } from "next/navigation";
import type { SearchParamsRecord } from "@/utils/query-params";
import { mergeQuery } from "@/utils/query-params";

const SORT_OPTIONS = [
  { value: "recentes", label: "Mais recentes" },
  { value: "preco-menor", label: "Menor preco" },
  { value: "preco-maior", label: "Maior preco" },
  { value: "ano-mais-novo", label: "Ano mais novo" },
  { value: "km-menor", label: "Menor km" },
];

type SortSelectProps = {
  value?: string;
  searchParams: SearchParamsRecord;
};

export function SortSelect({ value, searchParams }: SortSelectProps) {
  const router = useRouter();

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Ordenar por</span>
      <select
        id="sort-select"
        aria-label="Ordenacao da listagem"
        value={value ?? "recentes"}
        onChange={(event) => router.push(mergeQuery(searchParams, { sort: event.target.value, page: 1 }))}
        className="h-10 rounded-lg border border-border bg-white px-3 focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export { SORT_OPTIONS };
