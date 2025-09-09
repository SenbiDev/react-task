const API_BASE = "http://localhost:8000/api";

export const getArticles = async () => {
  const token = localStorage.getItem("access");
  const response = await fetch(`${API_BASE}/artikel/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Gagal mengambil artikel");
  }
  return await response.json();
};

export async function createArticle(data) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_BASE}/artikel/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal membuat artikel");
  return res.json();
}

export async function updateArticle(id, data) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_BASE}/artikel/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal update artikel");
  return res.json();
}

export async function deleteArticle(id) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_BASE}/artikel/${id}/`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Gagal hapus artikel");
  return true;
}