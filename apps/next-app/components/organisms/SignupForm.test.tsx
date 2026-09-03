import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SignupForm } from "@/components/organisms/SignupForm";
import { signUp } from "@/lib/auth";
import type { AuthResult } from "@/lib/auth";

vi.mock("@/lib/auth", () => ({
  signUp: vi.fn(),
}));

const mockedSignUp = vi.mocked(signUp);

describe("SignupForm", () => {
  beforeEach(() => {
    mockedSignUp.mockReset();
  });

  it("bloqueia o submit com nome vazio, email inválido, senha curta e confirmação divergente", async () => {
    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText("email"), "nao-e-email");
    await user.type(screen.getByLabelText("senha"), "123");
    await user.type(screen.getByLabelText("confirmar senha"), "456");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(await screen.findByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Informe um email válido.")).toBeInTheDocument();
    expect(
      screen.getByText("A senha precisa de pelo menos 8 caracteres.")
    ).toBeInTheDocument();
    expect(screen.getByText("As senhas não coincidem.")).toBeInTheDocument();
    expect(mockedSignUp).not.toHaveBeenCalled();
  });

  it("envia os dados e mostra o estado de loading ao submeter dados válidos", async () => {
    let resolveSignUp: (value: AuthResult) => void = () => {};
    mockedSignUp.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSignUp = resolve;
        })
    );

    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText("nome"), "Ada Lovelace");
    await user.type(screen.getByLabelText("email"), "ada@example.com");
    await user.type(screen.getByLabelText("senha"), "12345678");
    await user.type(screen.getByLabelText("confirmar senha"), "12345678");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(mockedSignUp).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "12345678",
    });
    expect(screen.getByRole("button", { name: "Criar conta" })).toBeDisabled();

    resolveSignUp({ ok: true });

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Criar conta" })
      ).not.toBeDisabled()
    );
  });

  it("mostra o erro do servidor quando o cadastro falha", async () => {
    mockedSignUp.mockResolvedValue({
      ok: false,
      error: "Este email já está em uso.",
    });

    const user = userEvent.setup();
    render(<SignupForm />);

    await user.type(screen.getByLabelText("nome"), "Ada Lovelace");
    await user.type(screen.getByLabelText("email"), "ada@example.com");
    await user.type(screen.getByLabelText("senha"), "12345678");
    await user.type(screen.getByLabelText("confirmar senha"), "12345678");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Este email já está em uso.");
  });
});
