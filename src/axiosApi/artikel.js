import api from "./apiConfig"

export async function getArtikelList() {
  try {
    const res = await api.get("artikel/")
    return res.data.results || []
  } catch (err) {
    throw new Error(err.response?.data?.detail || "Gagal memuat artikel")
  }
}

export async function getArticleById(id) {
  try {
    const res = await api.get(`artikel/${id}/`)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.detail || "Gagal memuat artikel")
  }
}

export async function createArticle(payload) {
  try {
    const res = await api.post("artikel/", payload)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.detail || "Gagal membuat artikel")
  }
}

export async function updateArticle(id, payload) {
  try {
    const cleanPayload = {
      judul: payload.judul,
      konten: payload.konten,
      status: payload.status,
      kategori_id: payload.kategori_id,
      tag_ids: (payload.tag_ids || []).filter((tid) => tid != null),
    }
    const res = await api.put(`artikel/${id}/`, cleanPayload)
    return res.data
  } catch (err) {
    throw new Error(err.response?.data?.detail || "Gagal mengupdate artikel")
  }
}

export async function deleteArticle(id) {
  try {
    await api.delete(`artikel/${id}/`)
    return true
  } catch (err) {
    throw new Error(err.response?.data?.detail || "Gagal menghapus artikel")
  }
}

export async function getPublicArticles() {
  try {
    const res = await api.get("public/artikel/")
    return res.data.results || []
  } catch (err) {
    throw new Error(err.response?.data?.detail || "Gagal memuat artikel publik")
  }
}

export async function getMyArticles() {
  try {
    const res = await api.get("artikel/")
    const user = JSON.parse(localStorage.getItem("user"))
    const articles = res.data.results || []
    return articles.filter((a) => a.penulis?.id === user?.id)
  } catch (err) {
    throw new Error(err.response?.data?.detail || "Gagal memuat artikel saya")
  }
}