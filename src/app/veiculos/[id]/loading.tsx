import { DetailSkeleton } from "@/components/detail/DetailSkeleton";
import { PageContainer } from "@/components/layout/page-container";

export default function Loading() {
  return (
    <PageContainer className="py-8">
      <DetailSkeleton />
    </PageContainer>
  );
}
