import type { SignUpProps } from "@/types/sign-up";
import api from "../api";

export async function signUp({ name, email, password }: SignUpProps) {
  const response = await api.post("/api/v1/users/", {
    name,
    email,
    password,
  });

  return response.data;
}
