import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";

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
      className={cn("text-accent hover:underline underline-offset-2", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
