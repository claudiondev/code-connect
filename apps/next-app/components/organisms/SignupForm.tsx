"use client";

import { FormEvent, useState } from "react";
import { FormField } from "@/components/molecules/FormField";
import { PasswordField } from "@/components/molecules/PasswordField";
import { Button } from "@/components/atoms/Button";
import { signUp } from "@/lib/auth";
import { isValidEmail, MIN_PASSWORD_LENGTH } from "@/lib/validation";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type Status = "idle" | "loading" | "error";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};

    if (!name.trim()) {
      errors.name = "Informe seu nome.";
    }

    if (!isValidEmail(email)) {
      errors.email = "Informe um email válido.";
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `A senha precisa de pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = "As senhas não coincidem.";
    }

    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const errors = validate();
    setFieldErrors(errors);
    setFormError(null);

    if (Object.keys(errors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const result = await signUp({ name, email, password });

    if (!result.ok) {
      setStatus("error");
      setFormError(result.error ?? "Não foi possível criar a conta. Tente novamente.");
      return;
    }

    setStatus("idle");
  }

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {formError && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-400"
        >
          {formError}
        </p>
      )}

      <FormField
        label="nome"
        type="text"
        placeholder="Ada Lovelace"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={fieldErrors.name}
        disabled={isLoading}
      />

      <FormField
        label="email"
        type="email"
        placeholder="dev@example.com"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldErrors.email}
        disabled={isLoading}
      />

      <PasswordField
        label="senha"
        placeholder="••••••••"
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={fieldErrors.password}
        disabled={isLoading}
      />

      <PasswordField
        label="confirmar senha"
        placeholder="••••••••"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        error={fieldErrors.confirmPassword}
        disabled={isLoading}
      />

      <Button type="submit" fullWidth loading={isLoading}>
        Criar conta
      </Button>
    </form>
  );
}
