import { LabelHTMLAttributes } from "react";

export function Label({
  className = "",
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={["mb-1.5 block font-mono text-xs text-muted", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
