import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusDot } from "@/components/atoms/StatusDot";

describe("StatusDot", () => {
  it("renderiza como indicador puramente decorativo", () => {
    const { container } = render(<StatusDot />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
