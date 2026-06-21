import { Chip } from "@heroui/react";
import { Hammer } from "lucide-react";

interface UnderConstructionProps {
  title?: string;
  description?: string;
}

export function UnderConstruction({
  title = "Em construção",
  description = "Estamos desenvolvendo esta funcionalidade para entregar a melhor experiência possível.",
}: UnderConstructionProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 " />

      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full max-w-xl">
        <div className="rounded-[32px] border border-accent/10 bg-content1/60 p-10 backdrop-blur-2xl">
          <div className="flex flex-col items-center text-center">
            <Chip className="mb-8 text-accent">Work in progress</Chip>

            <div className="mb-8 flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl border">
              <Hammer size={38} className="text-accent" />
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight">{title}</h1>

            <p className="max-w-md">{description}</p>

            <div className="mt-10 flex items-center gap-2 text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              Novidades chegando em breve
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
