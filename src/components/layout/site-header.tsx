import Link from "next/link";
import { CarFront, ChevronRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-brand-blue-dark text-brand-white">
      <PageContainer className="flex h-[72px] items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2">
          <CarFront className="h-5 w-5" />
          <span>GearGarage</span>
        </Link>

        <Link
          href="/"
          className="inline-flex h-8 items-center justify-center gap-1 rounded-md bg-brand-red px-3 text-sm font-medium text-brand-white transition-colors hover:bg-brand-red/90 focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
        >
          Ver ofertas
          <ChevronRight className="h-4 w-4" />
        </Link>
      </PageContainer>
    </header>
  );
}
