import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoginPage from "@/app/(auth)/login/page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/login",
}));

describe("LoginPage", () => {
  it("monta o card de login com as abas, login social e formulário", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("heading", { name: "Bem-vindo de volta" })
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "entrar" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(
      screen.getByRole("button", { name: /continuar com github/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });
});
