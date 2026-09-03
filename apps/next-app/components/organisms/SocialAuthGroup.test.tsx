import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialAuthGroup } from "@/components/organisms/SocialAuthGroup";

describe("SocialAuthGroup", () => {
  it("renderiza os dois botões sociais e o divisor", () => {
    render(<SocialAuthGroup />);

    expect(
      screen.getByRole("button", { name: /continuar com github/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continuar com google/i })
    ).toBeInTheDocument();
    expect(screen.getByText("ou via email")).toBeInTheDocument();
  });
});
