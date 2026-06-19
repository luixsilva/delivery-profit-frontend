import "./App.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen w-full bg-background">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
