import { CustomButton } from "components/ui/Button";
import { useAuth } from "hooks/use-auth";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { ArrowRight, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, string> = {};

      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      await login({
        email: data.email,
        password: data.password,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="input-type-password"
            className="text-sm font-medium text-foreground"
          >
            Sua senha <span className="text-danger">*</span>
          </Label>
          <a
            href="#"
            className="text-xs font-medium text-primary hover:underline"
          >
            Esqueceu a senha?
          </a>
        </div>

        <TextField className="w-full " name="password">
          <Label>Senha</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full"
              type={isVisible ? "text" : "password"}
              placeholder="**********"
              required
            />
            <InputGroup.Suffix className="pr-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
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
      </div>

      <CustomButton className="group mt-2 w-full">
        Entrar
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </CustomButton>
    </Form>
  );
};
