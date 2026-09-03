import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PasswordField } from "@/components/molecules/PasswordField";

describe("PasswordField", () => {
  it("começa oculto e alterna para texto visível ao clicar no botão", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="senha" />);

    const input = screen.getByLabelText("senha");
    expect(input).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: "Mostrar senha" }));

    expect(input).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: "Ocultar senha" })
    ).toBeInTheDocument();
  });
});
