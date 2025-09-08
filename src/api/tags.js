import { BASE_URL } from "./apiConfig";

export async function getTags() {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + "tags/", {
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ([]));
  if (!res.ok) throw new Error(data.detail || "Gagal fetch tag");
  return data;
}

export async function createTag(nama) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + "tags/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ nama })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Gagal membuat tag");
  return data;
}

export async function updateTag(id, nama) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + `tags/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ nama })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Gagal update tag");
  return data;
}

export async function deleteTag(id) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + `tags/${id}/`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Gagal hapus tag");
  }
  return true;
}