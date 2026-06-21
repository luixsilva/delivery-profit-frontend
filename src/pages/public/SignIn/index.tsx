import { SignInForm } from "components/pages/SignIn/SignInForm";

export default function SignIn() {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="absolute left-6 top-6 z-10 flex items-center gap-2 lg:left-10 lg:top-10">
        <img
          src="/assets/drive-pro-icon.png"
          alt="LOGO DRIVE PRO ICON"
          className="h-10 w-full object-cover"
        />

        <img
          src="/assets/drive-pro-removebg-preview.png"
          alt="LOGO DRIVE PRO"
          className="h-8 w-full "
        />
      </div>

      <div className="relative z-10 flex items-center justify-center px-6 py-20">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-widest text-default-400">
              Bem-vindo de volta
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Entre na sua conta
            </h1>
            <p className="text-sm text-default-500">
              Acesse seu painel e continue de onde parou.
            </p>
          </div>

          <SignInForm />

          <p className="text-center text-sm text-default-500">
            Não tem uma conta?{" "}
            <a
              href="signup"
              className="font-medium text-primary hover:underline"
            >
              Criar conta
            </a>
          </p>
        </div>
      </div>

      <div className="relative hidden items-center justify-center p-6 lg:flex">
        <div className="relative h-[90%] w-full overflow-hidden rounded-3xl  shadow-default-900/10">
          <img
            src="/assets/new-dash-login.png"
            alt="Visão geral do painel"
            className="h-full w-full object-cover object-[22%_center]"
          />
        </div>
      </div>
    </div>
  );
}
