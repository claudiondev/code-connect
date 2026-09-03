import { ReactNode } from "react";
import { AuthTabs } from "@/components/molecules/AuthTabs";

export interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-line bg-ink-900 p-6 sm:p-8">
      <AuthTabs />

      <div className="mt-6">
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>

      <div className="mt-6 space-y-4">{children}</div>

      {footer && (
        <div className="mt-6 text-center text-sm text-muted">{footer}</div>
      )}
    </div>
  );
}
