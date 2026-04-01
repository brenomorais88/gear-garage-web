import { PageContainer } from "@/components/layout/page-container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-brand-blue-dark py-8 text-sm text-brand-white/80">
      <PageContainer className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>GearGarage - Catalogo publico de veiculos.</p>
        <p>Portal B2C conectado a camada publica do GearSales.</p>
      </PageContainer>
    </footer>
  );
}
