export function formatCurrencyBRL(value: number | null): string {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "Preco sob consulta";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCityState(cidade: string | null, estado: string | null): string {
  if (cidade && estado) return `${cidade} - ${estado}`;
  return cidade ?? estado ?? "Brasil";
}
