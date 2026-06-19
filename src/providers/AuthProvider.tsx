import { useEffect, useState } from "react";
import { AuthContext } from "context/auth-context";
import { signIn } from "services/auth";
import type { SignInProps } from "types/sign-in";
import type { UserProps } from "types/user";
import { LoadingScreen } from "components";
import { me } from "services/auth";
import { signOut } from "services/auth";
import type { SignUpProps } from "types/sign-up";
import { signUp } from "services/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const data = await me();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login({ email, password }: SignInProps) {
    try {
      await signIn({
        email,
        password,
      });

      await loadUser();
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await signOut();

      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  }

  async function register({ name, email, password }: SignUpProps) {
    try {
      await signUp({
        name,
        email,
        password,
      });

      await loadUser();
    } catch (error) {
      console.error("Create User failed:", error);
    }
  }

  useEffect(() => {
    async function initializeAuth() {
      await loadUser();
    }

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}
