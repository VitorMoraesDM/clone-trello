import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // Sem verificação de e-mail: não há serviço de envio configurado.
    requireEmailVerification: false,
  },
  // nextCookies precisa ser sempre o último plugin do array — é ele que grava o
  // cookie de sessão quando o login acontece dentro de uma Server Action.
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
