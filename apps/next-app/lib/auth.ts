export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResult {
  ok: boolean;
  error?: string;
}

/**
 * Stub de autenticação client-side. Isolado aqui para que trocar por uma
 * Server Action ou por `POST /api/auth/sessions` (quando o backend REST
 * existir) seja a mudança de um único arquivo, sem tocar em LoginForm.
 */
export async function signInWithPassword(
  credentials: Credentials
): Promise<AuthResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  void credentials;

  return { ok: true };
}

/**
 * Pontos de integração para login social. Sem provedor real nesta entrega —
 * ligar a um fluxo OAuth (GitHub/Google) fica para quando o backend existir.
 */
export function signInWithGithub(): void {}
export function signInWithGoogle(): void {}
