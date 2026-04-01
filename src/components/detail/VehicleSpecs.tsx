import type { PublicVehicleDetail } from "@/types/public-api";

type VehicleSpecsProps = {
  detail: PublicVehicleDetail;
};

export function VehicleSpecs({ detail }: VehicleSpecsProps) {
  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <h2 className="text-lg font-semibold">Dados tecnicos</h2>
      <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-lg bg-muted/50 p-3">
          <dt className="text-muted-foreground">Tipo</dt>
          <dd className="font-medium">{detail.tipo}</dd>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <dt className="text-muted-foreground">Cor</dt>
          <dd className="font-medium">{detail.cor ?? "-"}</dd>
        </div>
        {Object.entries(detail.especificacoes).map(([key, value]) => (
          <div key={key} className="rounded-lg bg-muted/50 p-3">
            <dt className="text-muted-foreground">{key}</dt>
            <dd className="font-medium">{value ?? "-"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
