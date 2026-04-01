import type { PublicStoreInfo } from "@/types/public-api";

type StoreInfoCardProps = {
  store: PublicStoreInfo;
};

export function StoreInfoCard({ store }: StoreInfoCardProps) {
  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <h2 className="text-lg font-semibold">Loja</h2>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <span className="text-muted-foreground">Nome:</span> {store.nome ?? "-"}
        </li>
        <li>
          <span className="text-muted-foreground">Telefone publico:</span> {store.telefonePublico ?? "-"}
        </li>
        <li>
          <span className="text-muted-foreground">Cidade:</span> {store.cidade ?? "-"}
        </li>
      </ul>
      {store.descricao ? (
        <p className="mt-4 text-sm leading-6 text-brand-blue-dark/90">{store.descricao}</p>
      ) : null}
    </section>
  );
}
