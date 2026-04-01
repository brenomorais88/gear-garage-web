import Image from "next/image";
import Link from "next/link";
import type { PublicCatalogItem } from "@/types/public-api";
import { formatCityState, formatCurrencyBRL } from "@/utils/formatters";

type VehicleCardProps = {
  item: PublicCatalogItem;
};

export function VehicleCard({ item }: VehicleCardProps) {
  const yearLabel =
    item.anoFabricacao && item.anoModelo
      ? `${item.anoFabricacao}/${item.anoModelo}`
      : item.anoModelo || item.anoFabricacao || "-";

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white shadow-card">
      <div className="relative aspect-[16/10] bg-muted">
        <Image
          src={item.imagemPrincipal ?? "/images/vehicle-fallback.svg"}
          alt={item.titulo}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-semibold">{item.titulo}</h3>
        <p className="mt-2 text-xl font-bold text-brand-black">{formatCurrencyBRL(item.preco)}</p>
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          <li>Ano/modelo: {yearLabel}</li>
          <li>Km: {item.quilometragem ?? "-"}</li>
          <li>Cambio: {item.cambio ?? "-"}</li>
          <li>Combustivel: {item.combustivel ?? "-"}</li>
          <li>Local: {formatCityState(item.cidade, item.estado)}</li>
          <li>Loja: {item.lojaNome ?? "-"}</li>
        </ul>
        <Link
          href={`/veiculos/${item.id}`}
          className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg bg-brand-red text-sm font-medium text-white hover:bg-brand-red/90"
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
