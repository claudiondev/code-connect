import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AuthLayout from "@/app/(auth)/layout";

vi.mock("next/navigation", () => ({
  usePathname: () => "/login",
}));

describe("AuthLayout", () => {
  it("envolve o conteúdo da rota com o AuthTemplate", () => {
    render(
      <AuthLayout>
        <p>Página filha</p>
      </AuthLayout>
    );

    expect(screen.getByText("devhub")).toBeInTheDocument();
    expect(screen.getByText("Página filha")).toBeInTheDocument();
  });
});
