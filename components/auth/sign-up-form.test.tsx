import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { signUpAction } from "@/actions/auth";

import { SignUpForm } from "./sign-up-form";

// A action é mockada: o formulário nunca alcança o BetterAuth nem o banco.
vi.mock("@/actions/auth", () => ({
  signUpAction: vi.fn(),
}));

const signUpActionMock = vi.mocked(signUpAction);

async function preencherFormulario(
  user: ReturnType<typeof userEvent.setup>,
  {
    name = "Ana Souza",
    email = "ana@exemplo.com",
    password = "senha-secreta",
    confirmPassword = "senha-secreta",
  }: Partial<Record<string, string>> = {},
) {
  await user.type(screen.getByLabelText("Nome"), name);
  await user.type(screen.getByLabelText("E-mail"), email);
  await user.type(screen.getByLabelText("Senha"), password);
  await user.type(screen.getByLabelText("Confirmar senha"), confirmPassword);
}

describe("SignUpForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    signUpActionMock.mockResolvedValue({ data: undefined });
  });

  it("mostra os quatro campos e o botão de criar conta", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar senha")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar conta" }),
    ).toBeInTheDocument();
  });

  it("avisa quando as senhas não coincidem e não chama a action", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await preencherFormulario(user, { confirmPassword: "outra-senha" });
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(
      await screen.findByText("As senhas não coincidem."),
    ).toBeInTheDocument();
    expect(signUpActionMock).not.toHaveBeenCalled();
  });

  it("exige senha com pelo menos 8 caracteres", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await preencherFormulario(user, {
      password: "curta",
      confirmPassword: "curta",
    });
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(
      await screen.findByText("A senha deve ter pelo menos 8 caracteres."),
    ).toBeInTheDocument();
    expect(signUpActionMock).not.toHaveBeenCalled();
  });

  it("envia nome, e-mail e senha sem a confirmação de senha", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await preencherFormulario(user);
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    await vi.waitFor(() => {
      expect(signUpActionMock).toHaveBeenCalledWith({
        name: "Ana Souza",
        email: "ana@exemplo.com",
        password: "senha-secreta",
      });
    });
  });

  it("exibe o erro de e-mail já cadastrado vindo do servidor", async () => {
    signUpActionMock.mockResolvedValue({
      serverError: "Já existe uma conta com este e-mail.",
    });

    const user = userEvent.setup();
    render(<SignUpForm />);

    await preencherFormulario(user);
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(
      await screen.findByText("Já existe uma conta com este e-mail."),
    ).toBeInTheDocument();
  });
});
