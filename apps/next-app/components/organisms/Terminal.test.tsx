import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Terminal } from "@/components/organisms/Terminal";

describe("Terminal", () => {
  it("renderiza o cabeçalho e as linhas de comando", () => {
    render(<Terminal />);

    expect(screen.getByText("terminal — devhub")).toBeInTheDocument();
    expect(
      screen.getByText("git commit -m 'feat: add auth flow'")
    ).toBeInTheDocument();
  });
});
