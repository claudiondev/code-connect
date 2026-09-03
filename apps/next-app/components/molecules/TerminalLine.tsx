export interface TerminalLineProps {
  children: string;
  active?: boolean;
}

export function TerminalLine({ children, active = false }: TerminalLineProps) {
  return (
    <p className="flex gap-2 text-muted">
      <span className="text-accent" aria-hidden="true">
        &gt;
      </span>
      <span>
        {children}
        {active && (
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-3.5 w-2 animate-pulse align-middle bg-accent"
          />
        )}
      </span>
    </p>
  );
}
