import { Button } from "@heroui/react";
import { PanelLeft, Search, Bell, UserPlus } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { getGreeting } from "@/utils/getGreeting";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const { user } = useAuth();

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-zinc-900 bg-zinc-950 px-6">
      <div className="flex items-center gap-4">
        <Button
          isIconOnly
          variant="light"
          radius="lg"
          size="sm"
          onPress={toggleSidebar}
          aria-label="Alternar menu lateral"
          className="text-zinc-400 hover:text-white"
        >
          <PanelLeft size={18} />
        </Button>
        <h1 className="text-xl font-semibold text-white">
          {getGreeting()}, {user?.name?.split(" ")[0] ?? "visitante"}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          variant="light"
          radius="full"
          size="sm"
          aria-label="Buscar"
          className="text-zinc-400 hover:text-white"
        >
          <Search size={18} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          radius="full"
          size="sm"
          aria-label="Notificações"
          className="text-zinc-400 hover:text-white"
        >
          <Bell size={18} />
        </Button>
        <Button
          color="primary"
          radius="lg"
          size="sm"
          startContent={<UserPlus size={16} />}
        >
          Invite
        </Button>
      </div>
    </header>
  );
}
