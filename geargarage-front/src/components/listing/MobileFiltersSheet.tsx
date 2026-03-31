"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { PublicCatalogFilters } from "@/types/public-api";
import type { SearchParamsRecord } from "@/utils/query-params";
import { applyFiltersFromForm } from "./FiltersSidebar";
import { useRouter } from "next/navigation";

type MobileFiltersSheetProps = {
  filters: PublicCatalogFilters;
  searchParams: SearchParamsRecord;
  locationEnabled: boolean;
};

export function MobileFiltersSheet({ filters, searchParams, locationEnabled }: MobileFiltersSheetProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-4 text-sm focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filtros
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/40 p-4" role="dialog" aria-modal="true" aria-label="Filtros mobile">
          <div className="ml-auto h-full w-full max-w-sm overflow-y-auto rounded-xl bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold">Filtros</h3>
              <button onClick={() => setOpen(false)} className="text-sm text-muted-foreground focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2">
                Fechar
              </button>
            </div>
            <form
              className="grid gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                applyFiltersFromForm(router.push, searchParams, new FormData(event.currentTarget));
                setOpen(false);
              }}
            >
              <input name="marca" defaultValue={filters.marca} placeholder="Marca" className="input-field" />
              <input name="modelo" defaultValue={filters.modelo} placeholder="Modelo" className="input-field" />
              <select name="tipo" defaultValue={filters.tipo} className="input-field">
                <option value="">Tipo</option>
                <option value="CARRO">Carro</option>
                <option value="MOTO">Moto</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" inputMode="numeric" name="precoMin" defaultValue={filters.precoMin} placeholder="Preco min" className="input-field" />
                <input type="number" inputMode="numeric" name="precoMax" defaultValue={filters.precoMax} placeholder="Preco max" className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" inputMode="numeric" name="anoMin" defaultValue={filters.anoMin} placeholder="Ano min" className="input-field" />
                <input type="number" inputMode="numeric" name="anoMax" defaultValue={filters.anoMax} placeholder="Ano max" className="input-field" />
              </div>
              <input name="cambio" defaultValue={filters.cambio} placeholder="Cambio" className="input-field" />
              <input name="combustivel" defaultValue={filters.combustivel} placeholder="Combustivel" className="input-field" />
              {locationEnabled ? (
                <div className="grid grid-cols-2 gap-2">
                  <input name="cidade" defaultValue={filters.cidade} placeholder="Cidade" className="input-field" />
                  <input name="estado" defaultValue={filters.estado} placeholder="UF" className="input-field" />
                </div>
              ) : null}
              <button type="submit" className="h-10 rounded-lg bg-brand-red text-sm font-medium text-white focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2">
                Aplicar
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
