import { APIError } from "better-auth/api";
import { describe, expect, it } from "vitest";

import {
  AuthActionError,
  MENSAGEM_ERRO_GENERICA,
  traduzirErroDeAuth,
} from "./auth-errors";

function erroDoBetterAuth(code: string) {
  return new APIError("BAD_REQUEST", { message: "English message", code });
}

function mensagemPara(erro: unknown) {
  try {
    traduzirErroDeAuth(erro);
  } catch (traduzido) {
    return traduzido;
  }

  throw new Error("traduzirErroDeAuth deveria sempre lançar.");
}

describe("traduzirErroDeAuth", () => {
  // Os códigos abaixo foram observados nas respostas reais da API do BetterAuth.
  it.each([
    [
      "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
      "Já existe uma conta com este e-mail.",
    ],
    ["INVALID_EMAIL_OR_PASSWORD", "E-mail ou senha incorretos."],
    ["PASSWORD_TOO_SHORT", "A senha deve ter pelo menos 8 caracteres."],
  ])("traduz %s para português", (codigo, mensagemEsperada) => {
    const resultado = mensagemPara(erroDoBetterAuth(codigo));

    expect(resultado).toBeInstanceOf(AuthActionError);
    expect((resultado as AuthActionError).message).toBe(mensagemEsperada);
  });

  it("usa a mensagem genérica para códigos desconhecidos, sem vazar inglês", () => {
    const resultado = mensagemPara(erroDoBetterAuth("SOME_UNMAPPED_CODE"));

    expect((resultado as AuthActionError).message).toBe(MENSAGEM_ERRO_GENERICA);
  });

  it("repassa erros que não vêm do BetterAuth", () => {
    const original = new Error("falha de rede");

    expect(mensagemPara(original)).toBe(original);
  });
});
