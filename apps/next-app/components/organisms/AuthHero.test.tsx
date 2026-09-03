import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AuthHero } from "@/components/organisms/AuthHero";

describe("AuthHero", () => {
  it("renderiza logo, badge de presença e headline", () => {
    render(<AuthHero />);

    expect(screen.getByText("devhub")).toBeInTheDocument();
    expect(screen.getByText(/devs online agora/)).toBeInTheDocument();
    expect(screen.getByText("código")).toBeInTheDocument();
  });
});
