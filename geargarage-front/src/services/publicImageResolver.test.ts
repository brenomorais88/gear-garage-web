import { describe, expect, it } from "vitest";
import { publicImageResolver } from "./publicImageResolver";

describe("publicImageResolver", () => {
  it("resolve imagem principal e fallback", () => {
    const main = publicImageResolver.resolveMainImage({ imagens: ["https://img/1.jpg"] });
    expect(main).toBe("https://img/1.jpg");
    expect(publicImageResolver.resolveFallbackImage()).toBe("/images/vehicle-fallback.svg");
  });
});
