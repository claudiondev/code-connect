import { ReactNode } from "react";

export interface DividerProps {
  children?: ReactNode;
}

export function Divider({ children }: DividerProps) {
  if (!children) {
    return <hr className="border-line" />;
  }

  return (
    <div className="flex items-center gap-3 text-xs text-muted">
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
      {children}
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
    </div>
  );
}
