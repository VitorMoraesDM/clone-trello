import type { Metadata } from "next";

import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Criar conta · Quadro",
};

export default function CadastroPage() {
  return (
    <AuthFormShell
      title="Criar conta"
      description="Monte seu primeiro quadro em poucos segundos."
      footerPrompt="Já tem uma conta?"
      footerLinkLabel="Entrar"
      footerLinkHref="/login"
    >
      <SignUpForm />
    </AuthFormShell>
  );
}
