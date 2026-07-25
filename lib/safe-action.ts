import { createSafeActionClient } from "next-safe-action";

import { AuthActionError, MENSAGEM_ERRO_GENERICA } from "@/lib/auth-errors";

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    // Mensagens de AuthActionError já estão em português e são seguras de
    // mostrar. Qualquer outra coisa é erro inesperado: registra e generaliza.
    if (error instanceof AuthActionError) {
      return error.message;
    }

    console.error("Erro em server action:", error);
    return MENSAGEM_ERRO_GENERICA;
  },
});
