import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatsRow } from "@/components/organisms/StatsRow";

describe("StatsRow", () => {
  it("renderiza as três estatísticas", () => {
    render(<StatsRow />);

    expect(screen.getByText("38k+")).toBeInTheDocument();
    expect(screen.getByText("devs ativos")).toBeInTheDocument();
    expect(screen.getByText("12k+")).toBeInTheDocument();
    expect(screen.getByText("290+")).toBeInTheDocument();
  });
});
