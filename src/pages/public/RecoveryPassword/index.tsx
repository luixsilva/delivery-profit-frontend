import { CustomButton } from "components/ui/Button";
import { Form, Input, Label, Typography } from "@heroui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "services/auth";

export default function RecoveryPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = email.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};

      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      setSubmitted(true);
      await resetPassword({ email: data.email });
    } catch (error) {
      console.error("Reset password failed", error);
      setError("Erro ao solicitar mudança de senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen 
        flex items-center
        justify-center
        bg-default-50
        px-4 py-10 
        animate-in
        fade-in
        zoom-in-0
        slide-in-from-bottom-4
        duration-500"
    >
      <div className="w-full max-w-md rounded-[32px] border border-default-200 p-8 shadow-default-900/10 backdrop-blur-sm transition-colors duration-300">
        <div className="mb-8 flex flex-col gap-3">
          <Typography className="text-xs font-medium uppercase tracking-widest text-accent">
            Recuperação de senha
          </Typography>

          <Typography className="text-3xl font-semibold tracking-tight text-foreground">
            Esqueceu a senha?
          </Typography>

          <Typography className="text-sm leading-6 text-default-500">
            Informe o e-mail da sua conta e nós enviaremos um link para
            redefinir sua senha.
          </Typography>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-success/10 bg-success/10 p-6 text-sm text-foreground">
            Enviamos um link de redefinição para{" "}
            <span className="font-semibold">{email}</span>. Verifique sua caixa
            de entrada e siga as instruções.
          </div>
        ) : (
          <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="input-type-email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <Input
                id="input-type-email"
                type="email"
                name="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <CustomButton type="submit" className="mt-2" isLoading={loading}>
              Enviar link
            </CustomButton>
          </Form>
        )}

        <div className="mt-6 text-center text-sm text-default-500">
          <Link
            to="/signin"
            className="font-medium text-primary hover:underline"
          >
            Voltar para o login
          </Link>
        </div>

        <div className="text-center">
          <p className="text-danger">{error}</p>
        </div>
      </div>
    </div>
  );
}
