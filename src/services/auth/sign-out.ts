import api from "../api";

export async function signOut() {
  const response = await api.post("/api/v1/logout/");

  return response.data;
}
