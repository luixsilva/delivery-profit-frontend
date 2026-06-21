import api from "../api";

export async function confirmNewPassword({
  uid,
  token,
  newPassword,
}: {
  uid: string;
  token: string;
  newPassword: string;
}) {
  const response = await api.post("/v1/confirm-new-password/", {
    uid,
    token,
    new_password: newPassword,
  });

  return response.data;
}
