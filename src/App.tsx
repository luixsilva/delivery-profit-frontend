import "./App.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <AuthProvider>
        <div className="min-h-screen w-ful bg-background">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
