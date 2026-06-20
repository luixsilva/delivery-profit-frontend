import { SidebarContext } from "context/sidebar-context";
import { useMemo, useState, type ReactNode, useEffect } from "react";

export function SidebarProvider({ children }: { children: ReactNode }) {
  // `isCollapsed` controls whether the sidebar is collapsed/hidden on small screens.
  // Default to collapsed (hidden) on small devices and expanded on larger screens.
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768; // true for mobile (hidden)
  });

  useEffect(() => {
    function handleResize() {
      // when resizing across the md breakpoint, reset collapsed state so layout stays consistent
      setIsCollapsed((prev) => {
        const isMobile = window.innerWidth < 768;
        // if switching to desktop, ensure sidebar is visible (not hidden)
        if (!isMobile && prev) return false;
        // keep existing state on mobile
        return prev;
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const value = useMemo(() => ({ isCollapsed, toggleSidebar }), [isCollapsed]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
