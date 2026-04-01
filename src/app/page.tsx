import type { Metadata } from "next";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { PageContainer } from "@/components/layout/page-container";
import { PublicCatalogPageClient } from "@/components/public/PublicCatalogPageClient";

export const metadata: Metadata = {
  title: "Home",
  description: "Listagem publica de carros e motos disponiveis no GearGarage.",
  alternates: {
    canonical: "/",
  },
};

function CatalogSuspenseFallback() {
  return (
    <PageContainer className="py-6 sm:py-8">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6">
        <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
        <div className="flex items-center justify-between">
          <div className="h-10 w-28 animate-pulse rounded-lg bg-muted" />
          <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-[300px_1fr]">
        <aside className="hidden h-64 w-full max-w-[300px] animate-pulse rounded-xl bg-muted lg:block" />
        <ListingSkeleton />
      </div>
    </PageContainer>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<CatalogSuspenseFallback />}>
      <PublicCatalogPageClient />
    </Suspense>
  );
}
