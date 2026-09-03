import type { Metadata } from "next";
import { AuthCard } from "@/components/organisms/AuthCard";
import { SocialAuthGroup } from "@/components/organisms/SocialAuthGroup";
import { LoginForm } from "@/components/organisms/LoginForm";
import { TextLink } from "@/components/atoms/TextLink";

export const metadata: Metadata = {
  title: "Entrar — devhub",
  description: "Entre na devhub para continuar de onde parou.",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Bem-vindo de volta"
      subtitle="Continue de onde parou."
      footer={
        <>
          Ainda não tem conta? <TextLink href="/cadastro">cadastrar</TextLink>
        </>
      }
    >
      <SocialAuthGroup />
      <LoginForm />
    </AuthCard>
  );
}
