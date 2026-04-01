import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NotFoundState } from "./NotFoundState";

describe("NotFoundState", () => {
  it("renderiza mensagem de anuncio nao encontrado", () => {
    render(<NotFoundState />);
    expect(screen.getByText("Anuncio nao encontrado")).toBeInTheDocument();
  });
});
