import { CustomButton } from "components/ui/Button";
import {
  Button,
  Form,
  InputGroup,
  Label,
  TextField,
  Typography,
} from "@heroui/react";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { confirmNewPassword } from "services/auth/confirm-new-password";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");
  const passwordValidation = {
    hasMinLength: password.length >= 6,
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };
  const isPasswordValid =
    passwordValidation.hasMinLength &&
    passwordValidation.hasUpperCase &&
    passwordValidation.hasNumber;
  const passwordsMatch =
    confirmPassword.length > 0 && confirmPassword === password;
  const isFormValid = isPasswordValid && passwordsMatch;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!uid || !token) return;

    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};

      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      await confirmNewPassword({
        uid,
        newPassword: data.password,
        token,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Reset password failed", error);
      setError("Falha ao registrar nova senha, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-default-50 px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-default-200 p-8 shadow-default-900/10 backdrop-blur-sm transition-colors duration-300">
        <div className="mb-8 flex flex-col gap-3">
          <Typography className="text-xs font-medium uppercase tracking-widest text-accent">
            Nova senha
          </Typography>

          <Typography className="text-3xl font-semibold tracking-tight text-foreground">
            Redefina sua senha
          </Typography>

          <Typography className="text-sm leading-6 text-default-500">
            {token
              ? "Digite sua nova senha e confirme para completar a recuperação."
              : "Informe e confirme a nova senha para continuar."}
          </Typography>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-success/10 bg-success/10 p-6 text-sm text-foreground">
            Sua senha foi atualizada com sucesso.
            <div className="mt-4 text-sm text-default-500">
              Agora você pode fazer login com a nova senha.
            </div>
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium transition hover:bg-primary/90"
            >
              Voltar ao login
            </button>
          </div>
        ) : (
          <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="input-type-password"
                className="text-sm font-medium text-foreground"
              >
                Nova senha
              </Label>
              <TextField className="w-full" name="password">
                <InputGroup>
                  <InputGroup.Input
                    id="input-type-password"
                    className="w-full"
                    type={isVisible ? "text" : "password"}
                    placeholder="**********"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <InputGroup.Suffix className="pr-0">
                    <Button
                      isIconOnly
                      aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
                      size="sm"
                      variant="ghost"
                      onPress={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeSlashIcon className="size-4" />
                      )}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>
              {password && (
                <div className="mt-3 flex flex-col gap-2">
                  <PasswordRule
                    ok={passwordValidation.hasMinLength}
                    label="Mínimo de 6 caracteres"
                  />
                  <PasswordRule
                    ok={passwordValidation.hasUpperCase}
                    label="Pelo menos uma letra maiúscula"
                  />
                  <PasswordRule
                    ok={passwordValidation.hasNumber}
                    label="Pelo menos um número"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="input-type-confirm-password"
                className="text-sm font-medium text-foreground"
              >
                Confirmar senha
              </Label>
              <TextField className="w-full" name="confirmPassword">
                <InputGroup>
                  <InputGroup.Input
                    id="input-type-confirm-password"
                    className="w-full"
                    type={isConfirmVisible ? "text" : "password"}
                    placeholder="**********"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                  <InputGroup.Suffix className="pr-0">
                    <Button
                      isIconOnly
                      aria-label={
                        isConfirmVisible ? "Ocultar senha" : "Mostrar senha"
                      }
                      size="sm"
                      variant="ghost"
                      onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                    >
                      {isConfirmVisible ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeSlashIcon className="size-4" />
                      )}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>
              <div
                className={`text-xs font-medium ${passwordsMatch ? "text-success" : "text-danger"}`}
              >
                {passwordsMatch
                  ? "Senhas coincidem"
                  : "As senhas devem ser iguais."}
              </div>
            </div>

            <CustomButton type="submit" className="mt-2" isLoading={loading}>
              Salvar nova senha
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

function PasswordRule({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div
      className={`flex items-center gap-2 text-xs font-medium ${
        ok ? "text-success" : "text-default-400"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full text-white ${
          ok ? "bg-success" : "bg-default-300"
        }`}
      >
        {ok ? "✓" : ""}
      </span>
      {label}
    </div>
  );
}
