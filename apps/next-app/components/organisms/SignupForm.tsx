"use client";

import { useState } from "react";
import { FormField } from "@/components/molecules/FormField";
import { PasswordField } from "@/components/molecules/PasswordField";
import { Button } from "@/components/atoms/Button";
import { FormErrorAlert } from "@/components/atoms/FormErrorAlert";
import { signUp } from "@/lib/auth";
import { isValidEmail, MIN_PASSWORD_LENGTH } from "@/lib/validation";
import { useAuthForm } from "@/lib/useAuthForm";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { fieldErrors, formError, isLoading, handleSubmit } =
    useAuthForm<FieldErrors>({
      validate: () => {
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
      },
      submit: () => signUp({ name: name.trim(), email, password }),
      fallbackError: "Não foi possível criar a conta. Tente novamente.",
    });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {formError && <FormErrorAlert>{formError}</FormErrorAlert>}

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
