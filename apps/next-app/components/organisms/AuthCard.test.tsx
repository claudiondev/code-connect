import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuthCard } from "@/components/organisms/AuthCard";

vi.mock("next/navigation", () => ({
  usePathname: () => "/login",
}));

describe("AuthCard", () => {
  it("renderiza título, subtítulo, conteúdo e rodapé", () => {
    render(
      <AuthCard
        title="Bem-vindo de volta"
        subtitle="Continue de onde parou."
        footer="Rodapé"
      >
        <p>Conteúdo do formulário</p>
      </AuthCard>
    );

    expect(
      screen.getByRole("heading", { name: "Bem-vindo de volta" })
    ).toBeInTheDocument();
    expect(screen.getByText("Continue de onde parou.")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo do formulário")).toBeInTheDocument();
    expect(screen.getByText("Rodapé")).toBeInTheDocument();
  });
});
