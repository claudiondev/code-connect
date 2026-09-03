import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "@/components/molecules/FormField";

describe("FormField", () => {
  it("associa o label ao input", () => {
    render(<FormField label="email" />);
    expect(screen.getByLabelText("email")).toBeInTheDocument();
  });

  it("anuncia a mensagem de erro e marca o input como inválido", () => {
    render(<FormField label="email" error="Informe um email válido." />);

    const input = screen.getByLabelText("email");
    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent("Informe um email válido.");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", alert.id);
  });
});
