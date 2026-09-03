import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "@/components/atoms/Input";

describe("Input", () => {
  it("aceita digitação e dispara onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="email" onChange={onChange} />);

    await user.type(screen.getByLabelText("email"), "dev@example.com");

    expect(onChange).toHaveBeenCalled();
    expect(screen.getByLabelText("email")).toHaveValue("dev@example.com");
  });

  it("marca aria-invalid quando invalid está ativo", () => {
    render(<Input aria-label="senha" invalid />);
    expect(screen.getByLabelText("senha")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });
});
