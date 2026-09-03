# Página de login (`apps/next-app`)

**Data:** 2026-09-03
**Status:** aprovado
**Escopo:** rota `/login` completa, com a base de componentes e o layout reaproveitáveis pela futura rota `/cadastro`.

## Contexto

O `next-app` está no estado do `create-next-app`: Next 15 (App Router, Turbopack) + React 19, TypeScript `strict`, sem Tailwind, sem hierarquia de componentes e sem test runner. As fontes `Geist` e `Geist_Mono` já estão configuradas em `app/layout.tsx` como variáveis CSS (`--font-geist-sans`, `--font-geist-mono`) — o par exato que o layout pede (sans na interface, mono em labels, badge e terminal), então nenhuma fonte nova é necessária.

O layout de referência é uma tela dark de duas colunas: à esquerda a apresentação do produto (logo `devhub`, badge de presença, headline com destaque verde, mock de terminal, estatísticas); à direita um card de autenticação com abas `entrar`/`cadastrar`, login social, formulário de email e senha, e link para cadastro.

## Decisões

| Tema | Decisão | Motivo |
|---|---|---|
| Ícones sociais | SVG inline oficiais (GitHub monocromático via `currentColor`, Google em 4 cores) | Os PNGs em `public/` não servem: o GitHub é preto sobre transparente (invisível no card escuro) e o Google traz sombra e fundo xadrez rasterizados. SVG é nítido em qualquer DPI, sem request extra, e é o que o layout mostra. |
| Rotas | Route group `app/(auth)/` com layout compartilhado | Login e cadastro ganham URLs reais e dividem o template; o cadastro nasce como um arquivo de página mais um formulário. |
| Submit | Validação client-side com stub assíncrono isolado em `lib/auth.ts` | Entrega a página inteira sem fixar um contrato de backend que ainda não existe. |
| Testes | Vitest + React Testing Library configurados nesta entrega | O `CLAUDE.md` exige teste por componente e não havia runner. |

## Base técnica

Tailwind v4 instalado via `@tailwindcss/postcss`, com `postcss.config.mjs` e `@import "tailwindcss"` no `app/globals.css`. O `globals.css` atual (variáveis light/dark do scaffold) é substituído.

Tokens de tema declarados num bloco `@theme`, para que o dark do layout seja vocabulário e não hex espalhado pelos componentes:

| Token | Valor | Uso |
|---|---|---|
| `--color-ink-950` | `#050807` | fundo da página |
| `--color-ink-900` | `#0a100e` | card de autenticação |
| `--color-ink-800` | `#111a17` | inputs, botões sociais, corpo do terminal |
| `--color-line` | `#1c2b26` | bordas |
| `--color-accent` | `#00e5a0` | verde neon: CTA, links, palavra "código" |
| `--color-muted` | `#7d918b` | texto secundário |

O fundo decorativo (grid sutil + glow verde à direita) é uma classe utilitária no `globals.css`, não um `<div>` recriado por página.

`app/page.module.css` e a home do scaffold ficam intocados: `/` está fora deste escopo.

## Hierarquia de componentes

```
components/
  atoms/       Logo · Button · Input · Label · TextLink · Divider · StatusDot
               icons/ (GithubIcon · GoogleIcon · EyeIcon · EyeOffIcon · CodeIcon)
  molecules/   FormField · PasswordField · SocialButton · AuthTabs
               PresenceBadge · StatItem · TerminalLine
  organisms/   AuthCard · SocialAuthGroup · LoginForm · AuthHero · Terminal · StatsRow
  templates/   AuthTemplate
```

Contratos que carregam o peso do reuso:

- **`Button`** — `variant: 'primary' | 'social' | 'ghost'`, `fullWidth`, `loading`. Fonte única de verdade para altura, raio, estado de foco e spinner.
- **`Input`** — input estilizado com `ref` encaminhada e estado de erro; sem hooks próprios.
- **`FormField`** — compõe `Label` + `Input` + mensagem de erro, ligando `id` e `aria-describedby` automaticamente. `PasswordField` o estende com o toggle de visibilidade.
- **`Divider`** — linha com label opcional ao centro (`"ou via email"`).
- **`AuthCard`** — a casca do card: recebe `title`, `subtitle`, `children` (o formulário) e `footer`, e sempre renderiza `AuthTabs`. É o eixo do reuso — o cadastro passa outros textos e outro formulário, nada além disso.
- **`SocialAuthGroup`** — os dois `SocialButton` mais o `Divider`; idêntico nas duas páginas.
- **`AuthTemplate`** — grid de duas colunas, fundo, `AuthHero` à esquerda, `children` à direita, footer de copyright. Colapsa para uma coluna no mobile, com o hero acima do card.

## Rotas

```
app/(auth)/layout.tsx        → <AuthTemplate>{children}</AuthTemplate>
app/(auth)/login/page.tsx    → <AuthCard title="Bem-vindo de volta"
                                         subtitle="Continue de onde parou."
                                         footer={…link para cadastro}>
                                  <SocialAuthGroup />
                                  <LoginForm />
                                </AuthCard>
app/(auth)/cadastro/page.tsx → (entrega futura) mesma composição, com <SignupForm />
```

`AuthTabs` lê `usePathname()` para marcar a aba ativa e navega por `<Link>`, então as abas são navegação real — link direto, botão voltar e SEO funcionam.

## Client vs Server Components

`'use client'` somente onde há estado ou hook de navegação: `AuthTabs` (`usePathname`), `PasswordField` (toggle) e `LoginForm` (estado do formulário). `AuthTemplate`, `AuthHero`, `Terminal`, `StatsRow`, `AuthCard`, `SocialAuthGroup` e os átomos permanecem server components — o hero e a casca do card não entram no bundle do cliente.

## Formulário, estados e erros

`LoginForm` é controlado e opera uma máquina de estados `idle | loading | error`:

1. No submit, valida email (formato válido) e senha (mínimo de 8 caracteres).
2. Erro de campo aparece sob o respectivo campo via `FormField.error`, com `aria-invalid` no input e `role="alert"` na mensagem.
3. Formulário válido entra em `loading`: botão com spinner, campos desabilitados, submit bloqueado contra duplo envio.
4. Falha de credenciais é exibida como erro no topo do formulário, também com `role="alert"`.

A chamada de autenticação fica isolada em `lib/auth.ts`, exportando `signInWithPassword` — nesta entrega um stub assíncrono. Substituir por Server Action ou por `POST /api/auth/sessions` depois é mudança de um único arquivo.

Os botões sociais são `type="button"` sem handler real; o ponto de integração fica marcado no mesmo `lib/auth.ts`.

## Testes

Setup em `apps/next-app`: `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`; `vitest.config.ts` com o alias `@/*` do `tsconfig.json`; `vitest.setup.ts` carregando `jest-dom`; script `test` no app e `test:next` na raiz.

Cobertura — o uso essencial de cada componente:

| Alvo | Verifica |
|---|---|
| `Button` | renderiza o label, dispara `onClick`, `loading` bloqueia o clique |
| `FormField` | label associado ao input, mensagem de erro anunciada |
| `PasswordField` | toggle alterna o `type` entre `password` e `text` |
| `SocialButton` | renderiza texto e ícone acessível |
| `AuthTabs` | marca a aba ativa conforme o pathname mockado |
| `AuthCard` | renderiza `title`, `subtitle`, `children` e `footer` |
| `LoginForm` | email inválido e senha curta bloqueiam o submit; submit válido chama `signInWithPassword`; estado de loading |
| `Terminal`, `StatsRow`, `AuthHero` | render sem erro, com o conteúdo esperado |
| `/login` | teste de integração da página montada |

## Fora de escopo

`SignupForm` e a rota `/cadastro`, autenticação real e OAuth, a home `/`, e o `apps/react-app` — nada muda lá.
