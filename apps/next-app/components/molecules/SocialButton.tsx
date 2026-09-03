import { ReactNode } from "react";
import { Button, ButtonProps } from "@/components/atoms/Button";

export interface SocialButtonProps
  extends Omit<ButtonProps, "variant" | "children"> {
  icon: ReactNode;
  children: ReactNode;
}

export function SocialButton({ icon, children, ...props }: SocialButtonProps) {
  return (
    <Button variant="social" fullWidth {...props}>
      <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center">
        {icon}
      </span>
      {children}
    </Button>
  );
}
