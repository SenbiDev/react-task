export const BASE_URL = "http://127.0.0.1:8000/api/";

let isRefreshing = false;

export function forceLogout() {
  localStorage.clear();
  window.location.reload();
}

export async function refreshToken() {
  if (isRefreshing) return;
  isRefreshing = true;

  const refresh = localStorage.getItem("refresh");
  if (!refresh) {
    isRefreshing = false;
    forceLogout();
    throw new Error("Refresh token tidak ditemukan");
  }

  const res = await fetch(BASE_URL + "token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access) {
    isRefreshing = false;
    forceLogout();
    throw new Error("Refresh token gagal, silakan login ulang");
  }

  localStorage.setItem("access", data.access);
  isRefreshing = false;
  return data.access;
}