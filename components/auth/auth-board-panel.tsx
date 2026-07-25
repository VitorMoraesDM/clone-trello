import { cn } from "@/lib/utils";

type Coluna = {
  titulo: string;
  cards: string[];
  /** Marca de onde o card em movimento saiu, deixando o espaço vazio na coluna. */
  temEspacoVazio?: boolean;
};

const COLUNAS: Coluna[] = [
  {
    titulo: "A fazer",
    cards: [
      "Revisar a proposta do cliente",
      "Escrever o roteiro de onboarding",
    ],
    temEspacoVazio: true,
  },
  {
    titulo: "Em andamento",
    cards: ["Migrar o banco para Postgres", "Ajustar o layout do checkout"],
  },
  {
    titulo: "Concluído",
    cards: ["Publicar a landing page", "Fechar a sprint 12"],
  },
];

function CardDoQuadro({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-board-line bg-card px-3 py-2.5 text-sm leading-snug text-card-foreground shadow-xs",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Assinatura visual das telas de autenticação: o próprio quadro do produto,
 * com um card levantado no caminho entre duas colunas, alinhado ao espaço
 * tracejado que deixou para trás. É decorativo, então fica fora da árvore de
 * acessibilidade — e o `h1` da página pertence ao formulário.
 */
export function AuthBoardPanel() {
  return (
    <section className="relative hidden flex-col justify-between overflow-hidden border-r border-board-line bg-board p-12 lg:flex xl:p-16">
      <p className="font-display text-xl font-semibold tracking-tight">
        Quadro
      </p>

      <div className="max-w-md">
        <p className="font-display text-4xl leading-[1.1] font-semibold tracking-tight text-balance xl:text-5xl">
          Suas tarefas, em colunas.
        </p>
        <p className="mt-4 text-base text-pretty text-muted-foreground">
          Crie cards, mova entre as colunas e veja o trabalho avançar.
        </p>
      </div>

      <div aria-hidden className="relative -mb-4 select-none">
        <div className="grid grid-cols-3 items-start gap-4">
          {COLUNAS.map((coluna) => (
            <div key={coluna.titulo} className="flex flex-col gap-2.5">
              <span className="px-0.5 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                {coluna.titulo}
              </span>

              {coluna.temEspacoVazio && (
                <div className="h-11 rounded-md border border-dashed border-board-line/80" />
              )}

              {coluna.cards.map((card) => (
                <CardDoQuadro key={card}>{card}</CardDoQuadro>
              ))}
            </div>
          ))}
        </div>

        {/* O card levantado: única peça saturada da tela. Sai do espaço
            tracejado em "A fazer" e atravessa para "Em andamento". */}
        <CardDoQuadro className="absolute top-[1.9rem] left-[22%] w-[31%] rotate-[-4deg] border-primary/50 bg-primary text-primary-foreground shadow-lg motion-safe:animate-[card-lift_5s_ease-in-out_infinite]">
          Definir as metas do trimestre
        </CardDoQuadro>
      </div>
    </section>
  );
}
