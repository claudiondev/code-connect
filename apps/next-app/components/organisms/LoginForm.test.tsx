import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "@/components/organisms/LoginForm";
import { signInWithPassword } from "@/lib/auth";
import type { AuthResult } from "@/lib/auth";

vi.mock("@/lib/auth", () => ({
  signInWithPassword: vi.fn(),
}));

const mockedSignIn = vi.mocked(signInWithPassword);

describe("LoginForm", () => {
  beforeEach(() => {
    mockedSignIn.mockReset();
  });

  it("bloqueia o submit com email inválido e senha curta", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("email"), "nao-e-email");
    await user.type(screen.getByLabelText("senha"), "123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(
      await screen.findByText("Informe um email válido.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("A senha precisa de pelo menos 8 caracteres.")
    ).toBeInTheDocument();
    expect(mockedSignIn).not.toHaveBeenCalled();
  });

  it("envia as credenciais e mostra o estado de loading ao submeter dados válidos", async () => {
    let resolveSignIn: (value: AuthResult) => void = () => {};
    mockedSignIn.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSignIn = resolve;
        })
    );

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("email"), "dev@example.com");
    await user.type(screen.getByLabelText("senha"), "12345678");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(mockedSignIn).toHaveBeenCalledWith({
      email: "dev@example.com",
      password: "12345678",
    });
    expect(screen.getByRole("button", { name: "Entrar" })).toBeDisabled();

    resolveSignIn({ ok: true });

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Entrar" })).not.toBeDisabled()
    );
  });

  it("mostra o erro de credenciais quando o login falha", async () => {
    mockedSignIn.mockResolvedValue({
      ok: false,
      error: "Email ou senha incorretos.",
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("email"), "dev@example.com");
    await user.type(screen.getByLabelText("senha"), "12345678");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Email ou senha incorretos.");
  });
});
