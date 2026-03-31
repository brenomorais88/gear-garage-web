export function ErrorState() {
  return (
    <div className="rounded-xl border border-brand-red/30 bg-brand-red/5 p-8 text-center">
      <h3 className="text-lg font-semibold text-brand-black">Falha ao carregar a listagem</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Verifique configuracao da API publica e tente novamente.
      </p>
    </div>
  );
}
