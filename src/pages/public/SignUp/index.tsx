import { useAuth } from "hooks/use-auth";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  Typography,
} from "@heroui/react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

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

  const isFormValid =
    name.trim().length >= 2 && !!email && isPasswordValid && passwordsMatch;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};

      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      navigate("/");
    } catch (error) {
      console.error("Create User Failed", error);
    }
  };

  return (
    <div
      className="
        h-screen
        flex
        flex-col
        items-center
        justify-center
        gap-8
        bg-background
        animate-in
        fade-in
        zoom-in-0
        slide-in-from-bottom-4
        duration-500
"
    >
      <div className="flex flex-col gap-3">
        <Typography className="text-xs font-medium uppercase tracking-widest text-accent">
          Seja bem vindo(a)
        </Typography>

        <Typography className="text-3xl font-semibold tracking-tight text-foreground">
          Realize seu cadastro e aproveite todos os benefícios
        </Typography>
      </div>

      <div className="w-xl">
        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="input-type-name"
              className="text-sm font-medium text-foreground"
            >
              Nome completo <span className="text-danger">*</span>
            </Label>
            <Input
              id="input-type-name"
              placeholder="João da Silva"
              type="text"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="input-type-email"
              className="text-sm font-medium text-foreground"
            >
              Seu email <span className="text-danger">*</span>
            </Label>
            <Input
              id="input-type-email"
              placeholder="joao@dominio.com"
              type="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <TextField className="w-full" name="password">
            <Label className="text-sm font-medium text-foreground">Senha</Label>
            <InputGroup>
              <InputGroup.Input
                className="w-full"
                type={isPassVisible ? "text" : "password"}
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  aria-label={isPassVisible ? "Ocultar senha" : "Mostrar senha"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsPassVisible(!isPassVisible)}
                >
                  {isPassVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlashIcon className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>

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
          </TextField>

          <TextField className="w-full" name="confirmPassword">
            <Label className="text-sm font-medium text-foreground">
              Confirmar senha
            </Label>
            <InputGroup>
              <InputGroup.Input
                className="w-full"
                type={isConfirmVisible ? "text" : "password"}
                placeholder="**********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            {confirmPassword && (
              <div
                className={`mt-2 flex items-center gap-2 text-xs font-medium ${
                  passwordsMatch ? "text-success" : "text-danger"
                }`}
              >
                <span>{passwordsMatch ? "✓" : "✕"}</span>
                {passwordsMatch
                  ? "As senhas coincidem"
                  : "As senhas não coincidem"}
              </div>
            )}
          </TextField>

          <Button type="submit" className="mt-2" isDisabled={!isFormValid}>
            Criar conta
          </Button>
        </Form>

        <Typography className="text-center text-sm text-default-400 mt-6">
          Já tem conta?{" "}
          <a href="signin" className="text-primary font-medium">
            Entrar
          </a>
        </Typography>
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
