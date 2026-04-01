import { getPublicApiConfig, logPublicRuntimeEnv } from "@/lib/env";
import { getJson, joinUrl, serializeFetchError } from "@/lib/http";
import { publicImageResolver } from "@/services/publicImageResolver";
import { publicStoreInfoMapper } from "@/services/publicStoreInfoMapper";
import type { PublicVehicleDetail, VehicleType } from "@/types/public-api";
import { isRecord, readNumeric, readString } from "@/utils/object";

function normalizeVehicleType(value: unknown): VehicleType {
  const raw = readString(value)?.toUpperCase();
  if (raw === "CARRO" || raw === "MOTO") return raw;
  return "DESCONHECIDO";
}

function resolveDetailPath(pathTemplate: string, listingId: string): string {
  if (!pathTemplate.includes("{id}")) {
    throw new Error("NEXT_PUBLIC_GEARGARAGE_PUBLIC_VEHICLE_DETAIL_PATH must contain {id}");
  }
  return pathTemplate.replace("{id}", listingId);
}

function mapVehicleSpecs(payload: Record<string, unknown>): Record<string, string | number | null> {
  const output: Record<string, string | number | null> = {};
  const specs = isRecord(payload.especificacoes) ? payload.especificacoes : {};

  for (const [key, value] of Object.entries(specs)) {
    output[key] = typeof value === "number" ? value : readString(value);
  }

  return output;
}

function mapDetail(payload: unknown): PublicVehicleDetail {
  if (!isRecord(payload)) {
    throw new Error("Invalid detail payload from public API");
  }

  const anuncio = isRecord(payload.anuncio) ? payload.anuncio : payload;
  const veiculo = isRecord(payload.veiculo) ? payload.veiculo : payload;
  const marca = isRecord(payload.marca) ? payload.marca : {};
  const modelo = isRecord(payload.modelo) ? payload.modelo : {};

  const anuncioId = readString(anuncio.anuncioId) ?? readString(anuncio.id) ?? readString(payload.id);
  if (!anuncioId) {
    throw new Error("Public detail payload missing id");
  }

  const imagens = publicImageResolver.resolveGallery(payload);
  const lojaPayload = isRecord(payload.loja) ? payload.loja : {};
  const titleFromBrandModel = [readString(marca.nome), readString(modelo.nome)].filter(Boolean).join(" ");

  return {
    anuncioId,
    titulo: readString(payload.titulo) ?? titleFromBrandModel ?? "Detalhe de veiculo",
    descricao: readString(anuncio.descricao) ?? readString(payload.descricao),
    preco: readNumeric(anuncio.valorVenda) ?? readNumeric(payload.preco),
    anoFabricacao: readNumeric(veiculo.anoFabricacao) ?? readNumeric(payload.anoFabricacao),
    anoModelo: readNumeric(veiculo.ano) ?? readNumeric(payload.anoModelo),
    quilometragem: readNumeric(veiculo.km) ?? readNumeric(payload.quilometragem),
    cambio: readString(veiculo.cambio) ?? readString(payload.cambio),
    combustivel: readString(veiculo.combustivel) ?? readString(payload.combustivel),
    cor: isRecord(payload.cor) ? readString(payload.cor.nome) : readString(payload.cor),
    tipo: normalizeVehicleType((isRecord(payload.marca) ? payload.marca.tipo : undefined) ?? payload.tipo),
    imagens,
    imagemPrincipal: publicImageResolver.resolveMainImage(payload),
    loja: publicStoreInfoMapper.map(lojaPayload),
    especificacoes: mapVehicleSpecs(payload),
  };
}

export const publicVehicleDetailService = {
  async getByListingId(listingId: string): Promise<PublicVehicleDetail> {
    console.info("[GearGarage][publicVehicleDetailService] getByListingId entered (before getPublicApiConfig)", {
      listingId,
    });

    let baseUrl: string;
    let vehicleDetailPathTemplate: string;
    try {
      const config = getPublicApiConfig();
      baseUrl = config.baseUrl;
      vehicleDetailPathTemplate = config.vehicleDetailPathTemplate;
    } catch (configError) {
      logPublicRuntimeEnv("publicVehicleDetailService.getByListingId — getPublicApiConfig failed");
      console.error("[GearGarage][publicVehicleDetailService] getPublicApiConfig error", {
        listingId,
        serializedError: serializeFetchError(configError),
        configError,
      });
      throw configError;
    }

    const detailPath = resolveDetailPath(vehicleDetailPathTemplate, listingId);
    const url = joinUrl(baseUrl, detailPath);
    const requestParams = {
      baseUrl,
      pathTemplate: vehicleDetailPathTemplate,
      detailPath,
      listingId,
      url,
      method: "GET",
    };

    console.info("[GearGarage][publicVehicleDetailService] Request", {
      requestParams,
    });

    try {
      const response = await getJson<unknown>(url);
      const mapped = mapDetail(response);
      console.info("[GearGarage][publicVehicleDetailService] Success", {
        requestParams,
        anuncioId: mapped.anuncioId,
        imagesCount: mapped.imagens.length,
      });
      return mapped;
    } catch (error) {
      console.error("[GearGarage][publicVehicleDetailService] Error", {
        requestParams,
        serializedError: serializeFetchError(error),
        errorMessage: error instanceof Error ? error.message : String(error),
        error,
      });
      throw error;
    }
  },
};
