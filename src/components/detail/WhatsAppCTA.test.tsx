import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WhatsAppCTA } from "./WhatsAppCTA";

describe("WhatsAppCTA", () => {
  it("prioriza whatsappPublico quando disponivel", () => {
    render(
      <WhatsAppCTA
        vehicleTitle="Honda Civic"
        store={{
          nome: "Loja",
          cidade: "SP",
          descricao: null,
          whatsappPublico: "11999999999",
          telefonePublico: "11888888888",
          contatoPrincipal: "11999999999",
        }}
      />,
    );

    const link = screen.getByRole("link", { name: /Falar no WhatsApp sobre Honda Civic/i });
    expect(link.getAttribute("href")).toContain("wa.me/5511999999999");
  });

  it("desabilita CTA sem contato valido", () => {
    render(
      <WhatsAppCTA
        vehicleTitle="Honda Civic"
        store={{
          nome: "Loja",
          cidade: "SP",
          descricao: null,
          whatsappPublico: null,
          telefonePublico: null,
          contatoPrincipal: null,
        }}
      />,
    );

    expect(screen.getByRole("button", { name: "WhatsApp indisponivel" })).toBeDisabled();
  });
});
