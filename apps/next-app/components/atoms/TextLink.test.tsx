import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextLink } from "@/components/atoms/TextLink";

describe("TextLink", () => {
  it("renderiza como link apontando para o href recebido", () => {
    render(<TextLink href="/cadastro">cadastrar</TextLink>);

    const link = screen.getByRole("link", { name: "cadastrar" });
    expect(link).toHaveAttribute("href", "/cadastro");
  });
});
