import Link from "next/link";

/**
 * Moldura compartilhada pelas telas de entrar e criar conta: título, descrição,
 * o formulário e o link para a outra tela.
 */
export function AuthFormShell({
  title,
  description,
  footerPrompt,
  footerLinkLabel,
  footerLinkHref,
  children,
}: {
  title: string;
  description: string;
  footerPrompt: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm text-pretty text-muted-foreground">
        {description}
      </p>

      <div className="mt-8">{children}</div>

      <p className="mt-8 text-sm text-muted-foreground">
        {footerPrompt}{" "}
        <Link
          href={footerLinkHref}
          className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
        >
          {footerLinkLabel}
        </Link>
      </p>
    </div>
  );
}
