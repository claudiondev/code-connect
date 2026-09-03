import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PresenceBadge } from "@/components/molecules/PresenceBadge";

describe("PresenceBadge", () => {
  it("formata a contagem recebida", () => {
    render(<PresenceBadge count={4812} />);
    expect(screen.getByText(/4\.812 devs online agora/)).toBeInTheDocument();
  });
});
