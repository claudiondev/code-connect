"use client";

import { FormEvent, useState } from "react";
import type { AuthResult } from "@/lib/auth";

export interface UseAuthFormOptions<Errors extends object> {
  /** Roda no submit; retorna os erros de campo (chave ausente = campo válido). */
  validate: () => Errors;
  /** Chamada de auth (login/cadastro) disparada quando a validação passa. */
  submit: () => Promise<AuthResult>;
  /** Mensagem exibida quando `submit` falha sem uma `error` própria. */
  fallbackError: string;
}

export interface UseAuthFormResult<Errors extends object> {
  fieldErrors: Errors;
  formError: string | null;
  isLoading: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * Estado de submit compartilhado por LoginForm/SignupForm: valida, evita
 * duplo submit, dispara a chamada de auth e resolve erro de campo vs. erro
 * geral do formulário.
 */
export function useAuthForm<Errors extends object>({
  validate,
  submit,
  fallbackError,
}: UseAuthFormOptions<Errors>): UseAuthFormResult<Errors> {
  const [fieldErrors, setFieldErrors] = useState<Errors>({} as Errors);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const errors = validate();
    setFieldErrors(errors);
    setFormError(null);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);

    const result = await submit();

    if (!result.ok) {
      setFormError(result.error || fallbackError);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }

  return { fieldErrors, formError, isLoading, handleSubmit };
}
