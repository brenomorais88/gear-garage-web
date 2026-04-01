"use client";

import { ErrorState } from "@/components/listing/ErrorState";
import { PageContainer } from "@/components/layout/page-container";

export default function Error() {
  return (
    <PageContainer className="py-8">
      <ErrorState />
    </PageContainer>
  );
}
