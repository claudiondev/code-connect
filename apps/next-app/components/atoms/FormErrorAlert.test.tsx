import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormErrorAlert } from "@/components/atoms/FormErrorAlert";

describe("FormErrorAlert", () => {
  it("renderiza o conteúdo como alert", () => {
    render(<FormErrorAlert>Não foi possível entrar.</FormErrorAlert>);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível entrar."
    );
  });
});
