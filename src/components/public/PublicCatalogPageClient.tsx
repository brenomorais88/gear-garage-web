"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/listing/EmptyState";
import { ErrorState } from "@/components/listing/ErrorState";
import { FiltersSidebar } from "@/components/listing/FiltersSidebar";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { MobileFiltersSheet } from "@/components/listing/MobileFiltersSheet";
import { Pagination } from "@/components/listing/Pagination";
import { SearchBar } from "@/components/listing/SearchBar";
import { SortSelect } from "@/components/listing/SortSelect";
import { VehicleGrid } from "@/components/listing/VehicleGrid";
import { PageContainer } from "@/components/layout/page-container";
import { getPublicApiConfig, logPublicRuntimeEnv } from "@/lib/env";
import { joinUrl, serializeFetchError } from "@/lib/http";
import { publicCatalogService } from "@/services/publicCatalogService";
import { publicFiltersAdapter } from "@/services/publicFiltersAdapter";
import type { PublicCatalogResult } from "@/types/public-api";
import { searchParamsLikeToRecord } from "@/utils/query-params";

const LOG_PREFIX = "[GearGarage][PublicCatalog][Client]";

const locationEnabled = false;

type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: PublicCatalogResult }
  | { status: "error" };

function resolveCatalogUrl(filters: Parameters<typeof publicFiltersAdapter.toApiQueryString>[0]): string {
  const { baseUrl, catalogPath } = getPublicApiConfig();
  const endpoint = joinUrl(baseUrl, catalogPath);
  const queryString = publicFiltersAdapter.toApiQueryString(filters);
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

export function PublicCatalogPageClient() {
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();

  const urlParams = useMemo(() => new URLSearchParams(queryKey), [queryKey]);
  const searchParamsRecord = useMemo(() => searchParamsLikeToRecord(urlParams), [urlParams]);
  const filters = useMemo(() => publicFiltersAdapter.fromUrlSearchParams(urlParams), [urlParams]);

  const [loadState, setLoadState] = useState<LoadState>({ status: "idle" });

  useEffect(() => {
    const ac = new AbortController();
    let stale = false;

    const run = async () => {
      const filtersForRequest = publicFiltersAdapter.fromUrlSearchParams(new URLSearchParams(queryKey));

      let catalogUrl: string;
      try {
        catalogUrl = resolveCatalogUrl(filtersForRequest);
      } catch (configError) {
        logPublicRuntimeEnv("PublicCatalogPageClient — getPublicApiConfig failed (before fetch)");
        console.error(`${LOG_PREFIX} missing or invalid public API config`, {
          serializedError: serializeFetchError(configError),
          filters: filtersForRequest,
          queryKey,
        });
        if (!stale) setLoadState({ status: "error" });
        return;
      }

      console.info(`${LOG_PREFIX} fetch scheduled`, {
        queryKey,
        filters: filtersForRequest,
        catalogUrl,
      });

      if (!stale) setLoadState({ status: "loading" });

      try {
        const data = await publicCatalogService.list(filtersForRequest, { signal: ac.signal });
        if (stale) return;
        console.info(`${LOG_PREFIX} success`, {
          catalogUrl,
          page: data.page,
          pageSize: data.pageSize,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
          itemsOnPage: data.items.length,
        });
        setLoadState({ status: "success", data });
      } catch (error) {
        if (ac.signal.aborted) {
          console.info(`${LOG_PREFIX} fetch aborted (superseded navigation)`, { catalogUrl });
          return;
        }
        logPublicRuntimeEnv("PublicCatalogPageClient — list failed");
        console.error(`${LOG_PREFIX} list error`, {
          catalogUrl,
          filters: filtersForRequest,
          queryKey,
          serializedError: serializeFetchError(error),
          error,
        });
        if (!stale) setLoadState({ status: "error" });
      }
    };

    void run();

    return () => {
      stale = true;
      ac.abort();
    };
  }, [queryKey]);

  if (loadState.status === "error") {
    return (
      <PageContainer className="py-10">
        <ErrorState />
      </PageContainer>
    );
  }

  const showSkeleton = loadState.status === "idle" || loadState.status === "loading";
  const result = loadState.status === "success" ? loadState.data : null;

  return (
    <PageContainer className="py-6 sm:py-8">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6">
        <SearchBar key={queryKey} filters={filters} searchParams={searchParamsRecord} />
        <div className="flex items-center justify-between">
          <MobileFiltersSheet
            key={queryKey}
            filters={filters}
            searchParams={searchParamsRecord}
            locationEnabled={locationEnabled}
          />
          <SortSelect value={filters.sort} searchParams={searchParamsRecord} />
        </div>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[300px_1fr]">
        <FiltersSidebar
          key={queryKey}
          filters={filters}
          searchParams={searchParamsRecord}
          locationEnabled={locationEnabled}
        />
        <section>
          {showSkeleton ? (
            <ListingSkeleton />
          ) : result && result.items.length === 0 ? (
            <EmptyState />
          ) : result ? (
            <VehicleGrid items={result.items} />
          ) : null}
          {!showSkeleton && result ? (
            <Pagination page={result.page} totalPages={result.totalPages} searchParams={searchParamsRecord} />
          ) : null}
        </section>
      </div>
    </PageContainer>
  );
}
