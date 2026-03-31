import type { PublicCatalogItem } from "@/types/public-api";
import { VehicleCard } from "./VehicleCard";

type VehicleGridProps = {
  items: PublicCatalogItem[];
};

export function VehicleGrid({ items }: VehicleGridProps) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <VehicleCard key={item.id} item={item} />
      ))}
    </section>
  );
}
