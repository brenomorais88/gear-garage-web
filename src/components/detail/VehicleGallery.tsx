"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type VehicleGalleryProps = {
  imagens: string[];
  imagemPrincipal: string | null;
  titulo: string;
};

export function VehicleGallery({ imagens, imagemPrincipal, titulo }: VehicleGalleryProps) {
  const gallery = useMemo(() => {
    const merged = [imagemPrincipal, ...imagens].filter((v): v is string => Boolean(v));
    return [...new Set(merged)];
  }, [imagemPrincipal, imagens]);

  const fallback = "/images/vehicle-fallback.svg";
  const [selected, setSelected] = useState(gallery[0] ?? fallback);

  return (
    <section>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted">
        <Image
          src={selected}
          alt={titulo}
          fill
          sizes="100vw"
          className="object-cover"
          onError={() => setSelected(fallback)}
        />
      </div>
      {gallery.length > 1 ? (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {gallery.map((src, index) => (
            <button
              key={src}
              onClick={() => setSelected(src)}
              aria-label={`Selecionar imagem ${index + 1}`}
              className="relative aspect-[4/3] overflow-hidden rounded-md border border-border focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <Image src={src} alt={titulo} fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
