import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

vi.mock("@/components/listing/SearchBar", () => ({
  SearchBar: () => <div>searchbar</div>,
}));
vi.mock("@/components/listing/SortSelect", () => ({
  SortSelect: () => <div>sortselect</div>,
}));
vi.mock("@/components/listing/FiltersSidebar", () => ({
  FiltersSidebar: () => <div>sidebar</div>,
}));
vi.mock("@/components/listing/MobileFiltersSheet", () => ({
  MobileFiltersSheet: () => <div>mobilesheet</div>,
}));

vi.mock("@/services/publicCatalogService", () => ({
  publicCatalogService: {
    list: vi.fn().mockResolvedValue({
      items: [],
      page: 1,
      totalPages: 0,
    }),
  },
}));

describe("Home page", () => {
  it("renderiza estado vazio", async () => {
    const view = await Home({ searchParams: Promise.resolve({}) });
    render(view);
    expect(screen.getByText("Nenhum anuncio encontrado")).toBeInTheDocument();
  });
});
