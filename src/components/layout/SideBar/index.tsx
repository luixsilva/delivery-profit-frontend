import type { ElementType } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Chip } from "@heroui/react";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Road,
  Car,
} from "lucide-react";
import { useSidebar } from "hooks/use-sidebar";
import { useAuth } from "hooks/use-auth";

interface NavItem {
  label: string;
  href: string;
  icon: ElementType;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Rotas", href: "/routes", icon: Road },
  { label: "Veículos", href: "/vehicles", icon: Car },
  // { label: "Tracker", href: "/tracker", icon: ListTodo, badge: "New" },
  { label: "Insights", href: "/insights", icon: BarChart3 },
  { label: "Configurações", href: "/settings", icon: Settings },
];

export default function SideBar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <>
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-30 block bg-black/40 md:hidden "
          onClick={toggleSidebar}
          aria-hidden
        />
      )}

      <aside
        className={`h-screen fixed inset-y-0 left-0 z-40 flex h-full flex-col border-r border-zinc-900 bg-zinc-950 transition-transform duration-300 ease-in-out transform md:relative md:translate-x-0 md:z-auto ${
          isCollapsed
            ? "-translate-x-full md:translate-x-0 md:w-20"
            : "translate-x-0 md:w-64"
        }`}
        aria-hidden={isCollapsed}
      >
        <div
          className={`flex items-center gap-3 px-4 py-5 ${isCollapsed ? "justify-center" : ""}`}
        >
          <Avatar
            // src={user?.avatarUrl}
            // name={user?.name}
            size="sm"
            className="shrink-0 bg-gradient-to-br from-accent to-foreground"
          />
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {user?.name ?? "Convidado"}
              </p>
              <p className="truncate text-xs text-zinc-500">{user?.email}</p>
            </div>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 pt-2">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-zinc-900"
                    : "text-zinc-400 hover:bg-accent/50 hover:text-foreground"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <item.icon size={18} className="shrink-0" />
                {!isCollapsed && (
                  <span className="flex flex-1 items-center justify-between truncate">
                    {item.label}
                    {item.badge && (
                      <Chip
                        size="sm"
                        color="success"
                        className="h-5 px-1.5 text-[10px]"
                      >
                        {item.badge}
                      </Chip>
                    )}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-1 border-t border-zinc-900 px-3 py-4">
          <Link
            to="/help"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <HelpCircle size={18} className="shrink-0" />
            {!isCollapsed && <span>Ajuda & Informação</span>}
          </Link>
          <button
            onClick={() => logout()}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={18} className="shrink-0" />
            {!isCollapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
