import type { Metadata } from "next";

import { AuthFormShell } from "@/components/auth/auth-form-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Entrar · Quadro",
};

export default function LoginPage() {
  return (
    <AuthFormShell
      title="Entrar"
      description="Acesse seu quadro e continue de onde parou."
      footerPrompt="Ainda não tem uma conta?"
      footerLinkLabel="Criar conta"
      footerLinkHref="/cadastro"
    >
      <LoginForm />
    </AuthFormShell>
  );
}
