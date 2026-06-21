export default function Dashboard() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border border-zinc-800 flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-accent" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibol">Dashboard em construção</h1>

          <p className="max-w-sm text-sm text-zinc-500">
            Estamos desenvolvendo uma experiência melhor para acompanhar seus
            resultados.
          </p>
        </div>
      </div>
    </div>
  );
}
