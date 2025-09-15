// authApi.js
import api from "./apiConfig";

export async function loginUser(credentials) {
  const res = await api.post("login/", credentials);
  const data = res.data;

  if (data.access) localStorage.setItem("access", data.access);
  if (data.refresh) localStorage.setItem("refresh", data.refresh);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  if (data.role) localStorage.setItem("role", data.role);

  return data;
}

export async function registerUser(newUser) {
  const res = await api.post("register/", newUser);
  return res.data;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  return true;
}
