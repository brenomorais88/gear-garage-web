import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DetailPage from "./page";

vi.mock("@/services/publicVehicleDetailService", () => ({
  publicVehicleDetailService: {
    getByListingId: vi.fn().mockResolvedValue({
      anuncioId: "1",
      titulo: "Toyota Corolla",
      descricao: "Descricao",
      preco: 100000,
      anoFabricacao: 2022,
      anoModelo: 2023,
      quilometragem: 12345,
      cambio: "Automatico",
      combustivel: "Flex",
      cor: "Preto",
      tipo: "CARRO",
      imagens: [],
      imagemPrincipal: null,
      loja: {
        nome: "Loja Centro",
        cidade: "Sao Paulo",
        descricao: "Loja premium",
        whatsappPublico: "11999999999",
        telefonePublico: "11888888888",
        contatoPrincipal: "11999999999",
      },
      especificacoes: {},
    }),
  },
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("DetailPage", () => {
  it("renderiza dados principais da tela", async () => {
    const view = await DetailPage({ params: Promise.resolve({ id: "1" }) });
    render(view);

    expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
    expect(screen.getByText("Descricao")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Falar no WhatsApp sobre Toyota Corolla/i })).toBeInTheDocument();
  });
});
