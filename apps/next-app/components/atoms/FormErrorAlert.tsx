import { ReactNode } from "react";

export interface FormErrorAlertProps {
  children: ReactNode;
}

export function FormErrorAlert({ children }: FormErrorAlertProps) {
  return (
    <p
      role="alert"
      className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-400"
    >
      {children}
    </p>
  );
}
