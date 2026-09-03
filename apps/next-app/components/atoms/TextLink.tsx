import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface TextLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export function TextLink({
  className = "",
  children,
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={["text-accent hover:underline underline-offset-2", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Link>
  );
}
