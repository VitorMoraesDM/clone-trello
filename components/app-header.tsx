import { SignOutButton } from "@/components/sign-out-button";

export function AppHeader({ userName }: { userName: string }) {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4">
      <p className="font-display text-lg font-semibold tracking-tight">
        Quadro
      </p>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-muted-foreground sm:inline">
          {userName}
        </span>
        <SignOutButton />
      </div>
    </header>
  );
}
