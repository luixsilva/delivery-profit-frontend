import api from "../api";

export async function resetPassword({ email }: { email: string }) {
  const response = await api.post("/v1/reset-password/", {
    email,
  });

  return response.data;
}
