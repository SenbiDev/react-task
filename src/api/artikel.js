import { API_URL, getAuthHeader, refreshToken } from "./config";

export async function getArtikelList() {
  let res = await fetch(`${API_URL}artikel/`,{
    headers: getAuthHeader()
  });
  if (res.status === 401) {
    await refreshToken();
    res = await fetch(`${API_URL}artikel/`,{
      headers: getAuthHeader()
    });
  }
  const data = await res.json()
  .catch(() => ([]));
  if (!res.ok)
  throw new Error(data.detail || "Gagal fetch artikel");
  return data.results || [];
}

export async function createArtikel(payload) {
  const res = await fetch(`${API_URL}artikel/`,{
    method: "POST",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json()
  .catch(() => ({}));
  if (!res.ok)
  throw new Error(data.detail || "Gagal membuat artikel");
  return data;
}

export async function updateArtikel(id, payload) {
  const res = await fetch(`${API_URL}artikel/${id}/`,{
    method: "PUT",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json()
  .catch(() => ({}));
  if (!res.ok)
  throw new Error(data.detail || "Gagal update artikel");
  return data;
}

export async function deleteArtikel(id) {
  const res = await fetch(`${API_URL}artikel/${id}/`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  if (!res.ok) {
    const data = await res.json()
    .catch(() => ({}));
    throw new Error(data.detail || "Gagal hapus artikel");
  }
  return true;
}

export async function getPublikArtikels() {
  const res = await fetch(`${API_URL}public/artikel/`);
  const data = await res.json()
  .catch(() => ([]));
  if (!res.ok)
  throw new Error(data.detail || "Gagal fetch artikel publik");
  return data.results || [];
}

export async function getMyArtikels() {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(`${API_URL}artikel/`,{
    headers: getAuthHeader()
  });
  const data = await res.json()
  .catch(() => ({}));
  if (!res.ok)
  throw new Error(data.detail || "Gagal fetch artikel saya");

  const artikels = data.results || [];
  // if (user?.role === "admin") return artikels;
  return artikels.filter((a) => a.penulis?.id === user?.id);
}

export async function getArtikelById(id) {
  let res = await fetch(`${API_URL}artikel/${id}/`,{
    headers: getAuthHeader()
  });
  if (res.statusm === 401){
    await refreshToken();
    res = await fetch(`${API_URL}artikel/${id}/`,{
    headers: getAuthHeader()
  });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail||"Gagal fetch artikel");
  return data;
}