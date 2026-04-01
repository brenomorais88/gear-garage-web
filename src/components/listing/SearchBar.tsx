"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PublicCatalogFilters } from "@/types/public-api";
import type { SearchParamsRecord } from "@/utils/query-params";
import { mergeQuery } from "@/utils/query-params";

type SearchBarProps = {
  filters: PublicCatalogFilters;
  searchParams: SearchParamsRecord;
};

export function SearchBar({ filters, searchParams }: SearchBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState(filters.search ?? "");

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        router.push(mergeQuery(searchParams, { search, page: 1 }));
      }}
      className="flex items-center gap-2"
    >
      <div className="flex h-10 flex-1 items-center rounded-lg border border-border bg-white px-3">
        <Search className="mr-2 h-4 w-4 text-muted-foreground" />
        <input
          id="search"
          aria-label="Busca textual"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por marca, modelo ou versao"
          className="w-full border-0 bg-transparent text-sm outline-none"
        />
      </div>
      <button
        type="submit"
        className="h-10 rounded-lg bg-brand-red px-4 text-sm font-medium text-white hover:bg-brand-red/90 focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
      >
        Buscar
      </button>
    </form>
  );
}
