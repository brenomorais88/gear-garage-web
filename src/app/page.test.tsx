import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

vi.mock("@/components/public/PublicCatalogPageClient", () => ({
  PublicCatalogPageClient: () => <div data-testid="public-catalog-client">catalog</div>,
}));

describe("Home page", () => {
  it("renderiza o catalogo publico (client) dentro do Suspense", () => {
    render(<Home />);
    expect(screen.getByTestId("public-catalog-client")).toBeInTheDocument();
  });
});
