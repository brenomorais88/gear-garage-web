import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VehicleCard } from "./VehicleCard";

describe("VehicleCard", () => {
  it("renderiza dados principais do card", () => {
    render(
      <VehicleCard
        item={{
          id: "1",
          titulo: "Toyota Corolla XEi",
          marca: "Toyota",
          modelo: "Corolla",
          preco: 115000,
          anoFabricacao: 2022,
          anoModelo: 2023,
          quilometragem: 32000,
          cambio: "Automatico",
          combustivel: "Flex",
          cidade: "Sao Paulo",
          estado: "SP",
          tipo: "CARRO",
          lojaNome: "Loja Centro",
          status: "DISPONIVEL",
          imagemPrincipal: null,
        }}
      />,
    );

    expect(screen.getByText("Toyota Corolla XEi")).toBeInTheDocument();
    expect(screen.getByText(/Ano\/modelo: 2022\/2023/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver detalhes" })).toHaveAttribute("href", "/veiculos/1");
  });
});
