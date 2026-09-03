import type { Metadata } from "next";
import { AuthCard } from "@/components/organisms/AuthCard";
import { SocialAuthGroup } from "@/components/organisms/SocialAuthGroup";
import { SignupForm } from "@/components/organisms/SignupForm";
import { TextLink } from "@/components/atoms/TextLink";

export const metadata: Metadata = {
  title: "Cadastrar — devhub",
  description: "Crie sua conta na devhub e junte-se à comunidade.",
};

export default function CadastroPage() {
  return (
    <AuthCard
      title="Crie sua conta"
      subtitle="Junte-se à comunidade devhub."
      footer={
        <>
          Já tem conta? <TextLink href="/login">entrar</TextLink>
        </>
      }
    >
      <SocialAuthGroup />
      <SignupForm />
    </AuthCard>
  );
}
