import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialButton } from "@/components/molecules/SocialButton";
import { GithubIcon } from "@/components/atoms/icons/GithubIcon";

describe("SocialButton", () => {
  it("renderiza o texto e mantém o ícone decorativo", () => {
    render(
      <SocialButton icon={<GithubIcon data-testid="icon" />}>
        Continuar com GitHub
      </SocialButton>
    );

    expect(
      screen.getByRole("button", { name: "Continuar com GitHub" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });
});
