import type { PublicVehicleDetail } from "@/types/public-api";
import { formatCurrencyBRL } from "@/utils/formatters";

type VehicleDetailHeaderProps = {
  detail: PublicVehicleDetail;
};

export function VehicleDetailHeader({ detail }: VehicleDetailHeaderProps) {
  const year =
    detail.anoFabricacao && detail.anoModelo
      ? `${detail.anoFabricacao}/${detail.anoModelo}`
      : detail.anoModelo || detail.anoFabricacao || "-";

  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <h1 className="text-2xl font-semibold tracking-tight">{detail.titulo}</h1>
      <p className="mt-2 text-3xl font-bold text-brand-black">{formatCurrencyBRL(detail.preco)}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground sm:grid-cols-4">
        <p>Ano/modelo: {year}</p>
        <p>Km: {detail.quilometragem ?? "-"}</p>
        <p>Cambio: {detail.cambio ?? "-"}</p>
        <p>Combustivel: {detail.combustivel ?? "-"}</p>
      </div>
    </section>
  );
}
