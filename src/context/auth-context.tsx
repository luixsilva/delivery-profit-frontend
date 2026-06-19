import type { SignInProps } from "types/sign-in";
import type { SignUpProps } from "types/sign-up";
import type { UserProps } from "types/user";
import { createContext } from "react";
interface AuthContextProps {
  user: UserProps | null;
  login: ({ email, password }: SignInProps) => void;
  logout: () => void;
  register: ({ name, email, password }: SignUpProps) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
