import { APIError } from "better-auth/api";

/**
 * Erro de negócio já traduzido para o usuário final. O `handleServerError` do
 * cliente de actions deixa a mensagem passar intacta; qualquer outro erro vira
 * uma mensagem genérica para não vazar detalhe interno.
 */
export class AuthActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthActionError";
  }
}

export const MENSAGEM_ERRO_GENERICA =
  "Não foi possível concluir. Tente novamente.";

/**
 * Códigos do BetterAuth → mensagens em português. O BetterAuth responde sempre
 * em inglês, então nada daqui pode escapar para a tela sem tradução.
 */
const MENSAGENS_POR_CODIGO: Record<string, string> = {
  USER_ALREADY_EXISTS: "Já existe uma conta com este e-mail.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "Já existe uma conta com este e-mail.",
  INVALID_EMAIL_OR_PASSWORD: "E-mail ou senha incorretos.",
  INVALID_EMAIL: "E-mail inválido.",
  INVALID_PASSWORD: "E-mail ou senha incorretos.",
  USER_NOT_FOUND: "E-mail ou senha incorretos.",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "E-mail ou senha incorretos.",
  PASSWORD_TOO_SHORT: "A senha deve ter pelo menos 8 caracteres.",
  PASSWORD_TOO_LONG: "A senha é longa demais.",
  EMAIL_NOT_VERIFIED: "Confirme seu e-mail antes de entrar.",
  FAILED_TO_CREATE_USER: "Não foi possível criar a conta. Tente novamente.",
  SESSION_EXPIRED: "Sua sessão expirou. Entre novamente.",
};

/**
 * Converte um erro vindo do BetterAuth em `AuthActionError` com mensagem em
 * português. Erros que não são do BetterAuth são repassados como estão para o
 * `handleServerError` registrar e devolver a mensagem genérica.
 */
export function traduzirErroDeAuth(error: unknown): never {
  if (error instanceof APIError) {
    const codigo = error.body?.code;
    throw new AuthActionError(
      (codigo && MENSAGENS_POR_CODIGO[codigo]) || MENSAGEM_ERRO_GENERICA,
    );
  }

  throw error;
}
