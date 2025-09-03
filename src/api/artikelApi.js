import { getToken } from "./auntApi";

const API_URL = "http://127.0.0.1:8000/api";

export async function getArticles() {
  const token = localStorage.getItem("access");
  const res = await fetch( `${API_URL}/artikel/`, {
    method: "GET",
    headers: {
       "Content-Type": "application/json" ,
       "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Gagal mengambil artikel");
  return res.json();
}

export async function createArticle(data) {
  const res = await fetch(`${API_URL}/artikel/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal membuat artikel");
  return res.json();
}

export async function updateArticle(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal update artikel");
  return res.json();
}

export async function deleteArticle(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Gagal hapus artikel");
  return res.json();
}
