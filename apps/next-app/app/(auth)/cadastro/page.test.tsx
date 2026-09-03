import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CadastroPage from "@/app/(auth)/cadastro/page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/cadastro",
}));

describe("CadastroPage", () => {
  it("monta o card de cadastro com as abas, login social e formulário", () => {
    render(<CadastroPage />);

    expect(
      screen.getByRole("heading", { name: "Crie sua conta" })
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "cadastrar" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(
      screen.getByRole("button", { name: /continuar com github/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("nome")).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("senha")).toBeInTheDocument();
    expect(screen.getByLabelText("confirmar senha")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar conta" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "entrar" })
    ).toHaveAttribute("href", "/login");
  });
});
