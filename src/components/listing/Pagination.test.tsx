import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renderiza navegacao basica de pagina", () => {
    render(<Pagination page={2} totalPages={5} searchParams={{ search: "civic" }} />);

    expect(screen.getByText("Pagina 2 de 5")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Anterior" })).toHaveAttribute("href", "?search=civic&page=1");
    expect(screen.getByRole("link", { name: "Proxima" })).toHaveAttribute("href", "?search=civic&page=3");
  });
});
