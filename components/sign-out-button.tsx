"use client";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const { execute, isPending } = useAction(signOutAction, {
    onError: ({ error }) => {
      toast.error(
        error.serverError ?? "Não foi possível sair. Tente novamente.",
      );
    },
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => execute()}
      disabled={isPending}
    >
      {isPending ? "Saindo…" : "Sair"}
    </Button>
  );
}
