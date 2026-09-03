import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TerminalLine } from "@/components/molecules/TerminalLine";

describe("TerminalLine", () => {
  it("renderiza o texto do comando", () => {
    render(<TerminalLine>npm run dev</TerminalLine>);
    expect(screen.getByText("npm run dev")).toBeInTheDocument();
  });

  it("renderiza o cursor decorativo quando active", () => {
    const { container } = render(<TerminalLine active>npm run dev</TerminalLine>);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
