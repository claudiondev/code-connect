import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "@/components/atoms/Logo";

describe("Logo", () => {
  it("renderiza o nome da marca", () => {
    render(<Logo />);
    expect(screen.getByText("devhub")).toBeInTheDocument();
  });
});
