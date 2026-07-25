import { AuthBoardPanel } from "@/components/auth/auth-board-panel";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-dvh flex-1 lg:grid-cols-[1.05fr_1fr]">
      <AuthBoardPanel />
      <main className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <p className="mb-10 font-display text-xl font-semibold tracking-tight lg:hidden">
            Quadro
          </p>
          {children}
        </div>
      </main>
    </div>
  );
}
