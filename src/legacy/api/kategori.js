import { BASE_URL } from "./apiConfig";

export async function getKategori() {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + "kategori/", {
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ([]));
  if (!res.ok) throw new Error(data.detail || "Gagal fetch kategori");
  return data;
}

export async function createKategori(nama) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + "kategori/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ nama })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Gagal membuat kategori");
  return data;
}

export async function updateKategori(id, nama) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + `kategori/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ nama })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Gagal update kategori");
  return data;
}

export async function deleteKategori(id) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + `kategori/${id}/`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Gagal hapus kategori");
  }
  return true;
}