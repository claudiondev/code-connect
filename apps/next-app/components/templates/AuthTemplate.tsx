import { ReactNode } from "react";
import { AuthHero } from "@/components/organisms/AuthHero";

export interface AuthTemplateProps {
  children: ReactNode;
}

export function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <div className="auth-backdrop min-h-screen bg-ink-950">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="lg:max-w-xl">
          <AuthHero />
        </div>

        <div className="flex w-full flex-col items-center gap-6 lg:w-auto lg:items-end">
          {children}
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} devhub — feito por devs
          </p>
        </div>
      </div>
    </div>
  );
}
