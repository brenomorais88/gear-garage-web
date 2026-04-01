export function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-white p-8 text-center">
      <h3 className="text-lg font-semibold">Nenhum anuncio encontrado</h3>
      <p className="mt-2 text-sm text-muted-foreground">Ajuste os filtros para ampliar os resultados.</p>
    </div>
  );
}
