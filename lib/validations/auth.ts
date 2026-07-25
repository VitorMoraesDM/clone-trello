import { z } from "zod";

const TAMANHO_MINIMO_SENHA = 8;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .pipe(z.email("E-mail inválido.")),
  password: z.string().min(1, "Informe sua senha."),
});

export type LoginInput = z.infer<typeof loginSchema>;

/** Formato aceito pela server action de cadastro (sem a confirmação de senha). */
export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo.")
    .max(80, "O nome deve ter no máximo 80 caracteres."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .pipe(z.email("E-mail inválido.")),
  password: z
    .string()
    .min(
      TAMANHO_MINIMO_SENHA,
      `A senha deve ter pelo menos ${TAMANHO_MINIMO_SENHA} caracteres.`,
    ),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

/**
 * Formato do formulário no cliente. A confirmação de senha existe só para
 * evitar erro de digitação e nunca é enviada ao servidor.
 */
export const signUpFormSchema = signUpSchema
  .extend({
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((dados) => dados.password === dados.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type SignUpFormInput = z.infer<typeof signUpFormSchema>;
