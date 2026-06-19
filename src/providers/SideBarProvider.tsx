import { SidebarContext } from "@/context/sidebar-context";
import { useMemo, useState, type ReactNode } from "react";

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const value = useMemo(() => ({ isCollapsed, toggleSidebar }), [isCollapsed]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
