import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu quadro · Quadro",
};

export default function BoardPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Meu quadro
      </h1>
      <p className="mt-2 text-muted-foreground">
        Ainda não há colunas por aqui. Em breve você vai criar colunas e mover
        cards entre elas.
      </p>
    </div>
  );
}
