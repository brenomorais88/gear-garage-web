import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PublicCatalogPageClient } from "./PublicCatalogPageClient";

const useSearchParamsMock = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: () => useSearchParamsMock(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

vi.mock("@/lib/env", () => ({
  getPublicApiConfig: () => ({
    baseUrl: "https://api.test",
    catalogPath: "/garage/public/catalog",
    vehicleDetailPathTemplate: "/garage/public/catalog/{id}",
  }),
  logPublicRuntimeEnv: vi.fn(),
}));

vi.mock("@/services/publicCatalogService", () => ({
  publicCatalogService: {
    list: vi.fn(),
  },
}));

import { publicCatalogService } from "@/services/publicCatalogService";

describe("PublicCatalogPageClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSearchParamsMock.mockReturnValue(new URLSearchParams(""));
  });

  it("mostra EmptyState quando a API retorna lista vazia", async () => {
    vi.mocked(publicCatalogService.list).mockResolvedValue({
      items: [],
      page: 1,
      pageSize: 12,
      totalItems: 0,
      totalPages: 0,
    });

    render(<PublicCatalogPageClient />);

    await waitFor(() => {
      expect(screen.getByText("Nenhum anuncio encontrado")).toBeInTheDocument();
    });
  });
});
