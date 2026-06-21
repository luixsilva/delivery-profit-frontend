import { Button } from "@heroui/react";
import { PanelLeft, SunIcon, MoonIcon } from "lucide-react";
import { useSidebar } from "hooks/use-sidebar";
import { useAuth } from "hooks/use-auth";
import { getGreeting } from "utils/getGreeting";
import { useTheme } from "next-themes";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b px-6">
      <div className="flex items-center gap-4">
        <Button
          isIconOnly
          size="sm"
          onPress={toggleSidebar}
          aria-label="Alternar menu lateral"
          className="hover:text-white"
        >
          <PanelLeft size={18} />
        </Button>
        <h1 className="text-xl font-semibold">
          {getGreeting()}, {user?.name?.split(" ")[0] ?? "visitante"}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* <Button
          isIconOnly
          size="sm"
          aria-label="Buscar"
          className="hover:text-primary"
        >
          <Search size={18} />
        </Button>
        <Button
          isIconOnly
          size="sm"
          aria-label="Notificações"
          className="hover:text-primary"
        >
          <Bell size={18} />
        </Button> */}

        <Button
          isIconOnly
          size="sm"
          onPress={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
          aria-label={resolvedTheme === "light" ? "Modo escuro" : "Modo claro"}
          className="hover:text-primary transition-colors"
        >
          {resolvedTheme === "light" ? (
            <MoonIcon size={18} />
          ) : (
            <SunIcon size={18} />
          )}
        </Button>
      </div>
    </header>
  );
}
