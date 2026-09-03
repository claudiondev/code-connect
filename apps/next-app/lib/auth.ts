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

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

/**
 * Stub de cadastro client-side, mesmo racional de `signInWithPassword`:
 * isolado aqui para virar Server Action ou `POST /api/auth/users` (REST) sem
 * tocar em SignupForm.
 */
export async function signUp(
  credentials: SignUpCredentials
): Promise<AuthResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  void credentials;

  return { ok: true };
}

/**
 * Pontos de integração para login/cadastro social. Sem provedor real nesta
 * entrega — ligar a um fluxo OAuth (GitHub/Google) fica para quando o
 * backend existir.
 */
export function signInWithGithub(): void {}
export function signInWithGoogle(): void {}
