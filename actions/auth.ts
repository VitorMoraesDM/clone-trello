"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { traduzirErroDeAuth } from "@/lib/auth-errors";
import { actionClient } from "@/lib/safe-action";
import { loginSchema, signUpSchema } from "@/lib/validations/auth";

export const signUpAction = actionClient
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    try {
      await auth.api.signUpEmail({ body: { name, email, password } });
    } catch (error) {
      traduzirErroDeAuth(error);
    }

    // Fora do try: redirect() sinaliza navegação lançando uma exceção de
    // controle do Next, que não deve ser tratada como erro de autenticação.
    redirect("/board");
  });

export const signInAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await auth.api.signInEmail({ body: { email, password } });
    } catch (error) {
      traduzirErroDeAuth(error);
    }

    redirect("/board");
  });

export const signOutAction = actionClient.action(async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    traduzirErroDeAuth(error);
  }

  redirect("/login");
});
