import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Contexto não encontrado.");

  return context;
}
