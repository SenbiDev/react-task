import { API_URL, getAuthHeader, refreshToken } from "./config";

export async function getKategori() {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_URL}kategori/`,{
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await res.json()
  .catch(() => ([]));
  if (!res.ok)
  throw new Error(data.detail || "Gagal fetch kategori");
  return data;
}

export async function createKategori(nama) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_URL}kategori/`,{
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ nama })
  });
  const data = await res.json()
  .catch(() => ({}));
  if (!res.ok)
  throw new Error(data.detail || "Gagal membuat kategori");
  return data;
}

export async function updateKategori(id, nama) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_URL}kategori/${id}/`,{
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ nama })
  });
  const data = await res.json()
  .catch(() => ({}));
  if (!res.ok)
  throw new Error(data.detail || "Gagal update kategori");
  return data;
}

export async function deleteKategori(id) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_URL}kategori/${id}/`,{
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` 
      
    }
  });
  if (!res.ok) {
    const data = await res.json()
    .catch(() => ({}));
    throw new Error(data.detail || "Gagal hapus kategori");
  }
  return true;
}

export async function getTags() {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_URL}tags/`,{
    headers: { "Authorization": `Bearer ${token}`},
  });
  const data = await res.json().catch(() => ([]));
  if (!res.ok) throw new Error(data.detail || "Gagal fetch tag");
  return data;
}

export async function createTag(nama) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_URL}tags/`,{
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ nama })
  });
  const data = await res.json()
  .catch(() => ({}));
  if (!res.ok)
  throw new Error(data.detail || "Gagal membuat tag");
  return data;
}

export async function updateTag(id, nama) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_URL}tags/${id}/`,{
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ nama })
  });
  const data = await res.json()
  .catch(() => ({}));
  if (!res.ok)
  throw new Error(data.detail || "Gagal update tag");
  return data;
}

export async function deleteTag(id) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_URL}tags/${id}/`,{
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}`}
  });
  if (!res.ok) {
    const data = await res.json()
    .catch(() => ({}));
    throw new Error(data.detail || "Gagal hapus tag");
  }
  return true;
}
