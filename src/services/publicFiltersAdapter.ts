import type { PublicCatalogFilters } from "@/types/public-api";

function setNumberIfPresent(params: URLSearchParams, key: string, value?: number): void {
  if (typeof value === "number" && Number.isFinite(value)) {
    params.set(key, String(value));
  }
}

export const publicFiltersAdapter = {
  fromUrlSearchParams(searchParams: URLSearchParams): PublicCatalogFilters {
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "12");
    const precoMin = searchParams.get("precoMin");
    const precoMax = searchParams.get("precoMax");

    return {
      page: Number.isFinite(page) && page > 0 ? page : 1,
      pageSize: Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 12,
      sort: searchParams.get("sort") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      marca: searchParams.get("marca") ?? undefined,
      modelo: searchParams.get("modelo") ?? undefined,
      cidade: searchParams.get("cidade") ?? undefined,
      estado: searchParams.get("estado") ?? undefined,
      tipo: searchParams.get("tipo") ?? undefined,
      precoMin: precoMin ? Number(precoMin) : undefined,
      precoMax: precoMax ? Number(precoMax) : undefined,
      anoMin: searchParams.get("anoMin") ? Number(searchParams.get("anoMin")) : undefined,
      anoMax: searchParams.get("anoMax") ? Number(searchParams.get("anoMax")) : undefined,
      cambio: searchParams.get("cambio") ?? undefined,
      combustivel: searchParams.get("combustivel") ?? undefined,
    };
  },

  toApiQueryString(filters: PublicCatalogFilters): string {
    const params = new URLSearchParams();
    const uiPage = filters.page ?? 1;
    const apiPage = uiPage > 0 ? uiPage - 1 : 0;
    const apiSize = filters.pageSize ?? 12;

    setNumberIfPresent(params, "page", apiPage);
    setNumberIfPresent(params, "size", apiSize);
    setNumberIfPresent(params, "precoMin", filters.precoMin);
    setNumberIfPresent(params, "precoMax", filters.precoMax);

    if (filters.sort) params.set("sort", filters.sort);
    if (filters.search) params.set("search", filters.search);
    if (filters.marca) params.set("marca", filters.marca);
    if (filters.modelo) params.set("modelo", filters.modelo);
    if (filters.cidade) params.set("cidade", filters.cidade);
    if (filters.estado) params.set("estado", filters.estado);
    if (filters.tipo) params.set("tipo", filters.tipo);
    if (filters.anoMin) params.set("anoMin", String(filters.anoMin));
    if (filters.anoMax) params.set("anoMax", String(filters.anoMax));
    if (filters.cambio) params.set("cambio", filters.cambio);
    if (filters.combustivel) params.set("combustivel", filters.combustivel);

    return params.toString();
  },

  toUrlSearchParams(filters: PublicCatalogFilters): URLSearchParams {
    return new URLSearchParams(this.toApiQueryString(filters));
  },
};
