import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { logPublicRuntimeEnv } from "@/lib/env";
import { HttpError, serializeFetchError } from "@/lib/http";
import { publicVehicleDetailService } from "@/services/publicVehicleDetailService";
import { notFound } from "next/navigation";
import { StoreInfoCard } from "@/components/detail/StoreInfoCard";
import { VehicleDescription } from "@/components/detail/VehicleDescription";
import { VehicleDetailHeader } from "@/components/detail/VehicleDetailHeader";
import { VehicleGallery } from "@/components/detail/VehicleGallery";
import { VehicleSpecs } from "@/components/detail/VehicleSpecs";
import { WhatsAppCTA } from "@/components/detail/WhatsAppCTA";
import { cache } from "react";

type DetailPageProps = {
  params: Promise<{ id: string }>;
};

const getDetail = cache(async (id: string) => {
  return publicVehicleDetailService.getByListingId(id);
});

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const detail = await getDetail(id);
    const title = detail.titulo || "Detalhe do veiculo";
    const description =
      detail.descricao ?? `Veja fotos, dados tecnicos e contato da loja para ${title} no GearGarage.`;
    const image = detail.imagemPrincipal ?? detail.imagens[0] ?? "/images/vehicle-fallback.svg";
    const canonical = `/veiculos/${id}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        type: "website",
        url: canonical,
        images: [{ url: image, alt: title }],
      },
    };
  } catch (error) {
    console.warn("[GearGarage][DetailPage] generateMetadata fallback", {
      id,
      serializedError: serializeFetchError(error),
    });
    return {
      title: "Detalhe do veiculo",
      description: "Informacoes publicas do anuncio no GearGarage.",
    };
  }
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  let detail: Awaited<ReturnType<typeof publicVehicleDetailService.getByListingId>> | null = null;

  try {
    detail = await getDetail(id);
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      notFound();
    }
    logPublicRuntimeEnv("DetailPage catch (non-404)");
    console.error("[GearGarage][DetailPage] Falha ao carregar detalhe", {
      id,
      serializedError: serializeFetchError(error),
      error,
    });
    throw error;
  }

  if (!detail) {
    notFound();
  }

  return (
    <PageContainer className="py-6 sm:py-8">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <VehicleGallery
            titulo={detail.titulo}
            imagemPrincipal={detail.imagemPrincipal}
            imagens={detail.imagens}
          />
          <VehicleDescription descricao={detail.descricao} />
        </div>

        <div className="space-y-5">
          <VehicleDetailHeader detail={detail} />
          <WhatsAppCTA store={detail.loja} vehicleTitle={detail.titulo} />
          <StoreInfoCard store={detail.loja} />
          <VehicleSpecs detail={detail} />
        </div>
      </div>
    </PageContainer>
  );
}
