import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useAuthForm } from "@/lib/useAuthForm";
import type { AuthResult } from "@/lib/auth";
import type { FormEvent } from "react";

interface Errors {
  email?: string;
}

function submitEvent() {
  return {
    preventDefault: vi.fn(),
  } as unknown as FormEvent<HTMLFormElement>;
}

describe("useAuthForm", () => {
  it("não chama submit quando validate retorna erros", async () => {
    const submit = vi.fn();
    const { result } = renderHook(() =>
      useAuthForm<Errors>({
        validate: () => ({ email: "Informe um email válido." }),
        submit,
        fallbackError: "fallback",
      })
    );

    await act(async () => {
      await result.current.handleSubmit(submitEvent());
    });

    expect(submit).not.toHaveBeenCalled();
    expect(result.current.fieldErrors.email).toBe("Informe um email válido.");
    expect(result.current.isLoading).toBe(false);
  });

  it("fica loading durante o submit e volta a idle no sucesso", async () => {
    let resolveSubmit: (value: AuthResult) => void = () => {};
    const submit = vi.fn(
      () =>
        new Promise<AuthResult>((resolve) => {
          resolveSubmit = resolve;
        })
    );

    const { result } = renderHook(() =>
      useAuthForm<Errors>({
        validate: () => ({}),
        submit,
        fallbackError: "fallback",
      })
    );

    let submitPromise!: Promise<void>;
    act(() => {
      submitPromise = result.current.handleSubmit(submitEvent());
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolveSubmit({ ok: true });
      await submitPromise;
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.formError).toBeNull();
  });

  it("usa o fallbackError quando o resultado falha sem error próprio ou com string vazia", async () => {
    const submit = vi.fn(async (): Promise<AuthResult> => ({ ok: false, error: "" }));

    const { result } = renderHook(() =>
      useAuthForm<Errors>({
        validate: () => ({}),
        submit,
        fallbackError: "Não foi possível entrar.",
      })
    );

    await act(async () => {
      await result.current.handleSubmit(submitEvent());
    });

    await waitFor(() =>
      expect(result.current.formError).toBe("Não foi possível entrar.")
    );
  });

  it("ignora um segundo submit enquanto o primeiro está em loading", async () => {
    let resolveSubmit: (value: AuthResult) => void = () => {};
    const submit = vi.fn(
      () =>
        new Promise<AuthResult>((resolve) => {
          resolveSubmit = resolve;
        })
    );

    const { result } = renderHook(() =>
      useAuthForm<Errors>({
        validate: () => ({}),
        submit,
        fallbackError: "fallback",
      })
    );

    let firstSubmit!: Promise<void>;
    act(() => {
      firstSubmit = result.current.handleSubmit(submitEvent());
    });

    await act(async () => {
      await result.current.handleSubmit(submitEvent());
    });

    expect(submit).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveSubmit({ ok: true });
      await firstSubmit;
    });
  });
});
