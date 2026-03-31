import Link from "next/link";

export function NotFoundState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-white p-10 text-center">
      <h1 className="text-2xl font-semibold">Anuncio nao encontrado</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        O anuncio pode nao estar mais disponivel na camada publica.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
      >
        Voltar para listagem
      </Link>
    </div>
  );
}
