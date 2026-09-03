import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "@/components/atoms/Divider";

describe("Divider", () => {
  it("renderiza como linha simples sem children", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  it("renderiza o conteúdo central quando há children", () => {
    render(<Divider>ou via email</Divider>);
    expect(screen.getByText("ou via email")).toBeInTheDocument();
  });
});
