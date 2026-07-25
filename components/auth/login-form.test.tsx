import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { signInAction } from "@/actions/auth";

import { LoginForm } from "./login-form";

// A action é mockada: o formulário nunca alcança o BetterAuth nem o banco.
vi.mock("@/actions/auth", () => ({
  signInAction: vi.fn(),
}));

const signInActionMock = vi.mocked(signInAction);

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    signInActionMock.mockResolvedValue({ data: undefined });
  });

  it("mostra os campos de e-mail e senha e o botão de entrar", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  // Sem method="post" o fallback do navegador é GET, e um submit nativo (quando
  // o JS falha ou ainda não hidratou) joga a senha na URL, no histórico e nos
  // logs de acesso.
  it("usa method=post para nunca expor a senha na URL", () => {
    render(<LoginForm />);

    const form = screen.getByRole("button", { name: "Entrar" }).closest("form");

    expect(form).toHaveAttribute("method", "post");
  });

  it("acusa e-mail inválido em português e não chama a action", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("E-mail"), "não-é-email");
    await user.type(screen.getByLabelText("Senha"), "senha-secreta");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("E-mail inválido.")).toBeInTheDocument();
    expect(signInActionMock).not.toHaveBeenCalled();
  });

  it("cobra a senha quando o campo fica vazio", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("E-mail"), "ana@exemplo.com");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("Informe sua senha.")).toBeInTheDocument();
    expect(signInActionMock).not.toHaveBeenCalled();
  });

  it("envia e-mail e senha quando o formulário está válido", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("E-mail"), "ana@exemplo.com");
    await user.type(screen.getByLabelText("Senha"), "senha-secreta");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await vi.waitFor(() => {
      expect(signInActionMock).toHaveBeenCalledWith({
        email: "ana@exemplo.com",
        password: "senha-secreta",
      });
    });
  });

  it("exibe o erro devolvido pelo servidor", async () => {
    signInActionMock.mockResolvedValue({
      serverError: "E-mail ou senha incorretos.",
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("E-mail"), "ana@exemplo.com");
    await user.type(screen.getByLabelText("Senha"), "senha-errada");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(
      await screen.findByText("E-mail ou senha incorretos."),
    ).toBeInTheDocument();
  });
});
