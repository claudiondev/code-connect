import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuthTemplate } from "@/components/templates/AuthTemplate";

vi.mock("next/navigation", () => ({
  usePathname: () => "/login",
}));

describe("AuthTemplate", () => {
  it("renderiza o hero e o conteúdo passado como children", () => {
    render(
      <AuthTemplate>
        <p>Conteúdo da rota</p>
      </AuthTemplate>
    );

    expect(screen.getByText("devhub")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo da rota")).toBeInTheDocument();
    expect(screen.getByText(/feito por devs/)).toBeInTheDocument();
  });
});
