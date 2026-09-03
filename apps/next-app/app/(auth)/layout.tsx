import { ReactNode } from "react";
import { AuthTemplate } from "@/components/templates/AuthTemplate";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthTemplate>{children}</AuthTemplate>;
}
