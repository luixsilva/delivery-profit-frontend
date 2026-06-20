import type { SignInProps } from "../../types/sign-in";
import api from "../api";

export async function signIn({ email, password }: SignInProps) {
  const response = await api.post("v1/login/", {
    email,
    password,
  });

  return response.data;
}
