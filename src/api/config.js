export const API_URL = "http://127.0.0.1:8000/api/";

export function getAuthHeader() {
  const token = localStorage.getItem("access");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

export function onLogout() {
  localStorage.clear();
  window.location.href = "/login";
}

let isRefreshing = false;

export async function refreshToken() {
  if (isRefreshing) return;
  isRefreshing = true;

  const refresh = localStorage.getItem("refresh");
  if (!refresh) {
    onLogout();
    throw new Error("Refresh token tidak ditemukan.");
  }

  const res = await fetch(API_URL + "token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access) {
    onLogout();
    throw new Error("Refresh token gagal, silakan login ulang.");
  }

  localStorage.setItem("access", data.access);
  isRefreshing = false;
  return data.access;
}