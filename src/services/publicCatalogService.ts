import { getPublicApiConfig, logPublicRuntimeEnv } from "@/lib/env";
import { getJson, joinUrl, serializeFetchError } from "@/lib/http";
import { publicFiltersAdapter } from "@/services/publicFiltersAdapter";
import { publicImageResolver } from "@/services/publicImageResolver";
import type { PublicCatalogFilters, PublicCatalogItem, PublicCatalogResult } from "@/types/public-api";
import { isRecord, readNumber, readNumeric, readString } from "@/utils/object";

function normalizeVehicleType(value: unknown): PublicCatalogItem["tipo"] {
  const raw = readString(value)?.toUpperCase();
  if (raw === "CARRO" || raw === "MOTO") return raw;
  return "DESCONHECIDO";
}

function mapCatalogItem(payload: unknown): PublicCatalogItem | null {
  if (!isRecord(payload)) return null;

  const anuncio = isRecord(payload.anuncio) ? payload.anuncio : {};
  const veiculo = isRecord(payload.veiculo) ? payload.veiculo : {};
  const marca = isRecord(payload.marca) ? payload.marca : {};
  const modelo = isRecord(payload.modelo) ? payload.modelo : {};
  const loja = isRecord(payload.loja) ? payload.loja : {};

  const id = readString(anuncio.id) ?? readString(payload.id);
  if (!id) return null;

  const marcaNome = readString(marca.nome);
  const modeloNome = readString(modelo.nome);
  const titulo = [marcaNome, modeloNome].filter(Boolean).join(" ");

  return {
    id,
    titulo: readString(payload.titulo) ?? titulo ?? "Veiculo sem titulo",
    marca: marcaNome,
    modelo: modeloNome,
    preco: readNumeric(anuncio.valorVenda) ?? readNumeric(payload.preco),
    anoFabricacao: readNumeric(veiculo.anoFabricacao),
    anoModelo: readNumeric(veiculo.ano),
    quilometragem: readNumeric(veiculo.km),
    cambio: readString(veiculo.cambio),
    combustivel: readString(veiculo.combustivel),
    cidade: readString(loja.cidade),
    estado: readString(loja.estado),
    tipo: normalizeVehicleType(marca.tipo ?? payload.tipo),
    lojaNome: readString(loja.nome),
    status: readString(anuncio.status) ?? readString(payload.status),
    imagemPrincipal: publicImageResolver.resolveMainImage(payload),
  };
}

function mapCatalogResponse(payload: unknown): PublicCatalogResult {
  if (!isRecord(payload)) {
    return { items: [], page: 1, pageSize: 12, totalItems: 0, totalPages: 0 };
  }

  const possibleItems = Array.isArray(payload.items)
    ? payload.items
    : Array.isArray(payload.anuncios)
      ? payload.anuncios
      : [];

  const items = possibleItems
    .map(mapCatalogItem)
    .filter((item): item is PublicCatalogItem => item !== null)
    .filter((item) => (item.status ? item.status.toUpperCase() === "DISPONIVEL" : true));
  const rawPage = readNumber(payload.page) ?? 0;
  const page = rawPage >= 0 ? rawPage + 1 : 1;
  const pageSize = (readNumber(payload.pageSize) ?? readNumber(payload.size) ?? items.length) || 12;
  const totalItems = readNumber(payload.totalItems) ?? items.length;
  const totalPages = readNumber(payload.totalPages) ?? (totalItems > 0 ? Math.ceil(totalItems / pageSize) : 0);

  return { items, page, pageSize, totalItems, totalPages };
}

export const publicCatalogService = {
  async list(filters: PublicCatalogFilters): Promise<PublicCatalogResult> {
    console.info("[GearGarage][publicCatalogService] list() entered (before getPublicApiConfig)", {
      filters,
    });

    let baseUrl: string;
    let catalogPath: string;
    try {
      const config = getPublicApiConfig();
      baseUrl = config.baseUrl;
      catalogPath = config.catalogPath;
    } catch (configError) {
      logPublicRuntimeEnv("publicCatalogService.list — getPublicApiConfig failed");
      console.error("[GearGarage][publicCatalogService] getPublicApiConfig error", {
        filters,
        serializedError: serializeFetchError(configError),
        configError,
      });
      throw configError;
    }
    const queryString = publicFiltersAdapter.toApiQueryString(filters);
    const endpoint = joinUrl(baseUrl, catalogPath);
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    const requestParams = {
      baseUrl,
      path: catalogPath,
      endpoint,
      queryString,
      url,
      filters,
      method: "GET",
    };

    console.info("[GearGarage][publicCatalogService] Request", {
      requestParams,
    });

    try {
      const response = await getJson<unknown>(url);
      const mapped = mapCatalogResponse(response);
      console.info("[GearGarage][publicCatalogService] Success", {
        page: mapped.page,
        pageSize: mapped.pageSize,
        totalItems: mapped.totalItems,
        itemsOnPage: mapped.items.length,
      });
      return mapped;
    } catch (error) {
      console.error("[GearGarage][publicCatalogService] Error", {
        requestParams,
        serializedError: serializeFetchError(error),
        errorMessage: error instanceof Error ? error.message : String(error),
        error,
      });
      throw error;
    }
  },
};
