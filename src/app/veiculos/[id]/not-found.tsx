import { NotFoundState } from "@/components/detail/NotFoundState";
import { PageContainer } from "@/components/layout/page-container";

export default function NotFound() {
  return (
    <PageContainer className="py-10">
      <NotFoundState />
    </PageContainer>
  );
}
