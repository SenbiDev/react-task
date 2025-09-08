import { BASE_URL, refreshToken } from "./apiConfig";

export async function getArtikelList() {
  const token = localStorage.getItem("access");
  let res = await fetch(BASE_URL + "artikel/", {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (res.status === 401) {
    await refreshToken();
    const newToken = localStorage.getItem("access");
    res = await fetch(BASE_URL + "artikel/", {
      headers: { "Authorization": `Bearer ${newToken}` },
    });
  }
  const data = await res.json().catch(() => ([]));
  if (!res.ok) throw new Error(data.detail || "Gagal fetch artikel");
  return data.results || [];
}

export async function getArtikelById(id) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + `artikel/${id}/`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Gagal fetch detail artikel");
  return data;
}

export async function createArticle({ judul, konten, status, penulis_id, kategori_id, tag_ids }) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + "artikel/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ judul, konten, status, penulis_id, kategori_id, tag_ids }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Gagal membuat artikel");
  return data;
}

export async function updateArticle(id, { judul, konten, status, penulis_id, kategori_id, tag_ids }) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + `artikel/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ judul, konten, status, penulis_id, kategori_id, tag_ids }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Gagal update artikel");
  return data;
}

export async function deleteArticle(id) {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + `artikel/${id}/`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Gagal hapus artikel");
  }
  return true;
}

// Artikel Public dan saya
export async function getPublicArticles() {
  const res = await fetch(BASE_URL + "public/artikel/");
  const data = await res.json().catch(() => ([]));
  if (!res.ok) throw new Error(data.detail || "Gagal fetch artikel publik");
  return data.results || [];
}

export async function getMyArticles() {
  const token = localStorage.getItem("access");
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(BASE_URL + "artikel/", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Gagal fetch artikel saya");

  const articles = data.results || [];

  // Jika admin, tampilkan semua artikel
  // if (user?.role === "admin") {
  //   return articles;
  // }

  // Jika user biasa, filter miliknya saja
  return articles.filter((a) => a.penulis?.id === user?.id);
}