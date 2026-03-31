"use client";

import { useRouter } from "next/navigation";
import type { PublicCatalogFilters } from "@/types/public-api";
import type { SearchParamsRecord } from "@/utils/query-params";
import { mergeQuery } from "@/utils/query-params";

type FiltersSidebarProps = {
  filters: PublicCatalogFilters;
  searchParams: SearchParamsRecord;
  locationEnabled: boolean;
};

function apply(routerPush: (url: string) => void, searchParams: SearchParamsRecord, formData: FormData) {
  routerPush(
    mergeQuery(searchParams, {
      marca: formData.get("marca")?.toString(),
      modelo: formData.get("modelo")?.toString(),
      tipo: formData.get("tipo")?.toString(),
      precoMin: formData.get("precoMin")?.toString(),
      precoMax: formData.get("precoMax")?.toString(),
      anoMin: formData.get("anoMin")?.toString(),
      anoMax: formData.get("anoMax")?.toString(),
      cambio: formData.get("cambio")?.toString(),
      combustivel: formData.get("combustivel")?.toString(),
      cidade: formData.get("cidade")?.toString(),
      estado: formData.get("estado")?.toString(),
      page: 1,
    }),
  );
}

export function FiltersSidebar({ filters, searchParams, locationEnabled }: FiltersSidebarProps) {
  const router = useRouter();

  return (
    <aside className="hidden w-full max-w-[300px] rounded-xl border border-border bg-white p-4 lg:block">
      <h2 className="text-base font-semibold">Filtros</h2>
      <form
        aria-label="Filtros da listagem"
        className="mt-4 grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          apply(router.push, searchParams, new FormData(event.currentTarget));
        }}
      >
        <label className="sr-only" htmlFor="filtro-marca">Marca</label>
        <input id="filtro-marca" name="marca" defaultValue={filters.marca} placeholder="Marca" className="input-field" />
        <label className="sr-only" htmlFor="filtro-modelo">Modelo</label>
        <input id="filtro-modelo" name="modelo" defaultValue={filters.modelo} placeholder="Modelo" className="input-field" />
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
        ) : (
          <p className="text-xs text-muted-foreground">Filtro por localizacao indisponivel na API publica atual.</p>
        )}

        <button type="submit" className="h-10 rounded-lg bg-brand-red text-sm font-medium text-white focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2">
          Aplicar filtros
        </button>
        <button
          type="button"
          onClick={() =>
            router.push(
              mergeQuery(searchParams, {
                marca: undefined,
                modelo: undefined,
                tipo: undefined,
                precoMin: undefined,
                precoMax: undefined,
                anoMin: undefined,
                anoMax: undefined,
                cambio: undefined,
                combustivel: undefined,
                cidade: undefined,
                estado: undefined,
                search: undefined,
                page: 1,
              }),
            )
          }
          className="h-10 rounded-lg border border-border bg-white text-sm font-medium focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
        >
          Limpar filtros
        </button>
      </form>
    </aside>
  );
}

export { apply as applyFiltersFromForm };
