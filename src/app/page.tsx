import type { Metadata } from "next";
import { EmptyState } from "@/components/listing/EmptyState";
import { ErrorState } from "@/components/listing/ErrorState";
import { FiltersSidebar } from "@/components/listing/FiltersSidebar";
import { MobileFiltersSheet } from "@/components/listing/MobileFiltersSheet";
import { Pagination } from "@/components/listing/Pagination";
import { SearchBar } from "@/components/listing/SearchBar";
import { SortSelect } from "@/components/listing/SortSelect";
import { VehicleGrid } from "@/components/listing/VehicleGrid";
import { PageContainer } from "@/components/layout/page-container";
import { logPublicRuntimeEnv } from "@/lib/env";
import { serializeFetchError } from "@/lib/http";
import { publicFiltersAdapter } from "@/services/publicFiltersAdapter";
import { publicCatalogService } from "@/services/publicCatalogService";
import { toURLSearchParams, type SearchParamsRecord } from "@/utils/query-params";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description: "Listagem publica de carros e motos disponiveis no GearGarage.",
  alternates: {
    canonical: "/",
  },
};

type HomeProps = {
  searchParams: Promise<SearchParamsRecord>;
};

export default async function Home({ searchParams }: HomeProps) {
  console.info("[GearGarage][Home] entry (before await searchParams)", {
    vercelEnv: process.env.VERCEL_ENV ?? null,
    nodeEnv: process.env.NODE_ENV,
  });

  const resolvedSearchParams = await searchParams;

  console.info("[GearGarage][Home] searchParams resolved", {
    keys: Object.keys(resolvedSearchParams),
    rawSearchParams: resolvedSearchParams,
  });

  const filters = publicFiltersAdapter.fromUrlSearchParams(toURLSearchParams(resolvedSearchParams));

  console.info("[GearGarage][Home] filters built (before service)", { filters });

  const locationEnabled = false;

  let result: Awaited<ReturnType<typeof publicCatalogService.list>> | null = null;
  try {
    console.info("[GearGarage][Home] calling publicCatalogService.list");
    result = await publicCatalogService.list(filters);
  } catch (error) {
    logPublicRuntimeEnv("Home catch (env snapshot on failure)");
    console.error("[GearGarage][Home] Falha ao carregar listagem publica", {
      filters,
      rawSearchParams: resolvedSearchParams,
      locationEnabled,
      serializedError: serializeFetchError(error),
      error,
    });
    result = null;
  }

  if (!result) {
    return (
      <PageContainer className="py-10">
        <ErrorState />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-6 sm:py-8">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6">
        <SearchBar filters={filters} searchParams={resolvedSearchParams} />
        <div className="flex items-center justify-between">
          <MobileFiltersSheet
            filters={filters}
            searchParams={resolvedSearchParams}
            locationEnabled={locationEnabled}
          />
          <SortSelect value={filters.sort} searchParams={resolvedSearchParams} />
        </div>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[300px_1fr]">
        <FiltersSidebar
          filters={filters}
          searchParams={resolvedSearchParams}
          locationEnabled={locationEnabled}
        />
        <section>
          {result.items.length === 0 ? <EmptyState /> : <VehicleGrid items={result.items} />}
          <Pagination page={result.page} totalPages={result.totalPages} searchParams={resolvedSearchParams} />
        </section>
      </div>
    </PageContainer>
  );
}

export function HomeFallback() {
  return (
    <PageContainer className="py-10">
      <ErrorState />
    </PageContainer>
  );
}
