const BASE_URL = "http://127.0.0.1:8000/api/";

// Auth
export async function login(username, password) {
  try {
    const res = await fetch(BASE_URL + "token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "Login gagal");

    // simpan token
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    // simpan user info (kalau backend balikin data user di response)
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function register(username, email, password, password2) {
  try {
    const res = await fetch(BASE_URL + "register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, password2 }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || data.error || "Register gagal");

    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

// Kategori
export async function getKategori() {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + "kategori/", {
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ([]));
  if (!res.ok) throw new Error(data.detail || "Gagal fetch kategori");
  return data;
}

// Tags
export async function getTags() {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + "tag/", {
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ([]));
  if (!res.ok) throw new Error(data.detail || "Gagal fetch tag");
  return data;
}

// Artikel
export async function getArtikelList() {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + "artikel/", {
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ([]));
  if (!res.ok) throw new Error(data.detail || "Gagal fetch artikel");
  return data;
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
  return data;
}

export async function getMyArticles() {
  const token = localStorage.getItem("access");
  const res = await fetch(BASE_URL + "artikel/me/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Gagal fetch artikel saya");
  }

  return await res.json();
}