import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatItem } from "@/components/molecules/StatItem";

describe("StatItem", () => {
  it("renderiza o valor e o rótulo", () => {
    render(<StatItem value="38k+" label="devs ativos" />);

    expect(screen.getByText("38k+")).toBeInTheDocument();
    expect(screen.getByText("devs ativos")).toBeInTheDocument();
  });
});
