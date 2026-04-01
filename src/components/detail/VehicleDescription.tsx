type VehicleDescriptionProps = {
  descricao: string | null;
};

export function VehicleDescription({ descricao }: VehicleDescriptionProps) {
  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <h2 className="text-lg font-semibold">Descricao do anuncio</h2>
      <p className="mt-3 text-sm leading-6 text-brand-blue-dark/90">
        {descricao ?? "Descricao nao informada para este anuncio."}
      </p>
    </section>
  );
}
