import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VehicleGallery } from "./VehicleGallery";

describe("VehicleGallery", () => {
  it("usa fallback de imagem quando nao ha fotos", () => {
    render(<VehicleGallery titulo="Veiculo" imagemPrincipal={null} imagens={[]} />);
    const image = screen.getByRole("img");
    expect(image.getAttribute("src")).toContain("/images/vehicle-fallback.svg");
  });
});
