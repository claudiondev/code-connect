import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/atoms/Button";

describe("Button", () => {
  it("renderiza o label recebido", () => {
    render(<Button>Entrar</Button>);
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  it("dispara onClick ao ser clicado", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Entrar</Button>);

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("bloqueia o clique quando loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} loading>
        Entrar
      </Button>
    );

    const button = screen.getByRole("button", { name: "Entrar" });
    expect(button).toBeDisabled();

    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });
});
