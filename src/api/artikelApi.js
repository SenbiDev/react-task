const API_URL = "http://127.0.0.1:8000/";

export async function getArticles() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Gagal mengambil artikel");
  return res.json();
}

export async function createArticle(data) {
  const res = await fetch(API_URL, {
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
