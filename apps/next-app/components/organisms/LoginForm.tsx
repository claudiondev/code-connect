"use client";

import { useState } from "react";
import { FormField } from "@/components/molecules/FormField";
import { PasswordField } from "@/components/molecules/PasswordField";
import { Button } from "@/components/atoms/Button";
import { TextLink } from "@/components/atoms/TextLink";
import { FormErrorAlert } from "@/components/atoms/FormErrorAlert";
import { signInWithPassword } from "@/lib/auth";
import { isValidEmail, MIN_PASSWORD_LENGTH } from "@/lib/validation";
import { useAuthForm } from "@/lib/useAuthForm";

interface FieldErrors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fieldErrors, formError, isLoading, handleSubmit } =
    useAuthForm<FieldErrors>({
      validate: () => {
        const errors: FieldErrors = {};

        if (!isValidEmail(email)) {
          errors.email = "Informe um email válido.";
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
          errors.password = `A senha precisa de pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
        }

        return errors;
      },
      submit: () => signInWithPassword({ email, password }),
      fallbackError: "Não foi possível entrar. Tente novamente.",
    });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {formError && <FormErrorAlert>{formError}</FormErrorAlert>}

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
