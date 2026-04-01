import { isRecord, readString } from "@/utils/object";

function collectImageUrls(input: unknown): string[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => {
      if (typeof item === "string") return item;
      if (isRecord(item)) return readString(item.url);
      return null;
    })
    .filter((item): item is string => Boolean(item));
}

export const publicImageResolver = {
  resolveGallery(payload: unknown): string[] {
    if (!isRecord(payload)) {
      return [];
    }

    const directGallery = collectImageUrls(payload.imagens);
    if (directGallery.length > 0) {
      return directGallery;
    }

    const galleryFromFotos = collectImageUrls(payload.fotos);
    if (galleryFromFotos.length > 0) {
      return galleryFromFotos;
    }

    return [];
  },

  resolveMainImage(payload: unknown): string | null {
    if (!isRecord(payload)) {
      return null;
    }

    const direct = readString(payload.imagemPrincipal);
    if (direct) {
      return direct;
    }

    if (isRecord(payload.imagemPrincipal)) {
      const fromObject = readString(payload.imagemPrincipal.url);
      if (fromObject) return fromObject;
    }

    const [firstImage] = this.resolveGallery(payload);
    return firstImage ?? null;
  },

  resolveFallbackImage(): string {
    return "/images/vehicle-fallback.svg";
  },
};
