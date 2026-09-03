"use client";

import { FormEvent, useState } from "react";
import { FormField } from "@/components/molecules/FormField";
import { PasswordField } from "@/components/molecules/PasswordField";
import { Button } from "@/components/atoms/Button";
import { TextLink } from "@/components/atoms/TextLink";
import { signInWithPassword } from "@/lib/auth";

interface FieldErrors {
  email?: string;
  password?: string;
}

type Status = "idle" | "loading" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};

    if (!EMAIL_PATTERN.test(email)) {
      errors.email = "Informe um email válido.";
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `A senha precisa de pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
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

    const result = await signInWithPassword({ email, password });

    if (!result.ok) {
      setStatus("error");
      setFormError(result.error ?? "Não foi possível entrar. Tente novamente.");
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
        label="email"
        type="email"
        placeholder="dev@example.com"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldErrors.email}
        disabled={isLoading}
      />

      <div>
        <PasswordField
          label="senha"
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={fieldErrors.password}
          disabled={isLoading}
        />
        <div className="mt-1.5 text-right">
          <TextLink href="#" className="text-xs">
            esqueci a senha
          </TextLink>
        </div>
      </div>

      <Button type="submit" fullWidth loading={isLoading}>
        Entrar
      </Button>
    </form>
  );
}
