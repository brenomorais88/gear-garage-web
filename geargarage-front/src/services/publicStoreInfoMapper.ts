import type { PublicStoreInfo } from "@/types/public-api";
import { isRecord, readString } from "@/utils/object";

function normalizePhone(value: string | null): string | null {
  if (!value) {
    return null;
  }
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 ? digits : null;
}

export const publicStoreInfoMapper = {
  map(payload: unknown): PublicStoreInfo {
    const store = isRecord(payload) ? payload : {};

    const whatsappPublico = normalizePhone(readString(store.whatsappPublico));
    const telefonePublico = normalizePhone(readString(store.telefonePublico));

    return {
      nome: readString(store.nome),
      cidade: readString(store.cidade),
      descricao: readString(store.descricao) ?? readString(store.descricaoPublica),
      whatsappPublico,
      telefonePublico,
      contatoPrincipal: whatsappPublico ?? telefonePublico,
    };
  },
};
