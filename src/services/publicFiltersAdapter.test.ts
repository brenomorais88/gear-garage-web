import { describe, expect, it } from "vitest";
import { publicFiltersAdapter } from "./publicFiltersAdapter";

describe("publicFiltersAdapter", () => {
  it("parseia query params em filtros", () => {
    const input = new URLSearchParams(
      "page=2&pageSize=24&search=corolla&marca=toyota&precoMin=50000&anoMax=2022",
    );
    const result = publicFiltersAdapter.fromUrlSearchParams(input);

    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(24);
    expect(result.search).toBe("corolla");
    expect(result.marca).toBe("toyota");
    expect(result.precoMin).toBe(50000);
    expect(result.anoMax).toBe(2022);
  });

  it("converte pagina da URL (1-based) para API (0-based)", () => {
    const result = publicFiltersAdapter.toApiQueryString({
      page: 1,
      pageSize: 12,
      tipo: "CARRO",
    });

    expect(result).toContain("page=0");
    expect(result).toContain("size=12");
    expect(result).toContain("tipo=CARRO");
  });
});
