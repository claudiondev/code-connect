import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AuthTabs } from "@/components/molecules/AuthTabs";

vi.mock("next/navigation", () => ({
  usePathname: () => "/login",
}));

describe("AuthTabs", () => {
  it("marca a aba correspondente ao pathname como ativa", () => {
    render(<AuthTabs />);

    expect(screen.getByRole("tab", { name: "entrar" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tab", { name: "cadastrar" })).toHaveAttribute(
      "aria-selected",
      "false"
    );
  });
});
