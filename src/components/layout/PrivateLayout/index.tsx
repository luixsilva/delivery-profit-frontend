import { Outlet } from "react-router-dom";
import Header from "components/layout/Header";
import SideBar from "components/layout/SideBar";
import { SidebarProvider } from "providers/SideBarProvider";

export default function PrivateLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        <SideBar />

        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
