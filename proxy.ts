import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

const ROTAS_DE_AUTENTICACAO = ["/login", "/cadastro"];

/**
 * Redireciona cedo para evitar um flash de tela errada. Isto é otimização de
 * UX, não segurança: só checa a presença do cookie, sem validá-lo. A
 * verificação que vale é a de `app/(app)/layout.tsx`, que consulta a sessão no
 * banco.
 */
export function proxy(request: NextRequest) {
  const temCookieDeSessao = Boolean(getSessionCookie(request));
  const { pathname } = request.nextUrl;
  const ehRotaDeAutenticacao = ROTAS_DE_AUTENTICACAO.includes(pathname);

  if (temCookieDeSessao && ehRotaDeAutenticacao) {
    return NextResponse.redirect(new URL("/board", request.url));
  }

  if (!temCookieDeSessao && !ehRotaDeAutenticacao) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/board/:path*", "/login", "/cadastro"],
};
