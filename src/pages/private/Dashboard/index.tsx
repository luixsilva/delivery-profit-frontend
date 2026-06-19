import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";
import { SidebarProvider } from "@/providers/SideBarProvider";
// import StatCard from "@/components/Dashboard/StatCard";
// import SalesPerformanceCard from "@/components/dashboard/SalesPerformanceCard";
// import TrafficSourceCard from "@/components/dashboard/TrafficSourceCard";
// import EmployeesTable from "@/components/dashboard/EmployeesTable";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="dark flex h-screen w-full overflow-hidden bg-zinc-950">
        <SideBar />
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex flex-1 items-center justify-center p-6">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border border-zinc-800 flex items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-white">
                  Dashboard em construção
                </h1>

                <p className="max-w-sm text-sm text-zinc-500">
                  Estamos desenvolvendo uma experiência melhor para acompanhar
                  seus resultados.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
