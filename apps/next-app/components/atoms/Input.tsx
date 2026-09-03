import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid = false, className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid}
      className={[
        "w-full rounded-lg border bg-ink-800 px-3 py-2.5 text-sm text-white placeholder:text-muted/60",
        "outline-none transition-colors focus:border-accent",
        "disabled:cursor-not-allowed disabled:opacity-60",
        invalid ? "border-red-500/70" : "border-line",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});
