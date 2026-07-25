import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppHeader } from "@/components/app-header";
import { auth } from "@/lib/auth";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Esta é a checagem que vale: consulta a sessão no banco. O middleware só
  // olha a presença do cookie, para evitar o flash de tela errada.
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <AppHeader userName={session.user.name} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
