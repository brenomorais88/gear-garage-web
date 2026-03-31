"use client";

import { useMemo } from "react";
import { publicFiltersAdapter } from "@/services/publicFiltersAdapter";
import type { PublicCatalogFilters } from "@/types/public-api";

export function useCatalogFilters(searchParams: Record<string, string | string[] | undefined>) {
  return useMemo<PublicCatalogFilters>(() => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
      if (Array.isArray(value)) {
        if (value[0]) params.set(key, value[0]);
        continue;
      }
      if (value) params.set(key, value);
    }

    return publicFiltersAdapter.fromUrlSearchParams(params);
  }, [searchParams]);
}
