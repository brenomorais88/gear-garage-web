import type { PublicStoreInfo } from "@/types/public-api";
import { buildWhatsAppLink } from "@/utils/whatsapp";

type WhatsAppCTAProps = {
  store: PublicStoreInfo;
  vehicleTitle: string;
};

export function WhatsAppCTA({ store, vehicleTitle }: WhatsAppCTAProps) {
  const url = buildWhatsAppLink(store.whatsappPublico ?? store.telefonePublico, vehicleTitle);
  const disabled = !url;

  if (disabled) {
    return (
      <button
        disabled
        className="h-12 w-full rounded-lg bg-muted text-sm font-semibold text-muted-foreground sm:h-11"
      >
        WhatsApp indisponivel
      </button>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Falar no WhatsApp sobre ${vehicleTitle}`}
      className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand-red text-sm font-semibold text-white hover:bg-brand-red/90 focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 sm:h-11"
    >
      Falar no WhatsApp
    </a>
  );
}
