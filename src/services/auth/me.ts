import api from "../api";

export async function me() {
  const response = await api.get("api/v1/me");

  return response.data;
}
