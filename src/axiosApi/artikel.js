import api from "./apiConfig"

export async function getArtikelList(params = {}) {
  try {
    const { page = 1, search= "", kategori = null, tags = [] } = params

    const query = new URLSearchParams()
    query.append("page", page)

    if (search) query.append("search", search)
    if (kategori) query.append("kategori", kategori)
    if (Array.isArray(tags) && tags.length > 0) {
      tags.forEach((tagsId) => query.append("tag", tagsId))
    }

    const res = await api.get(`artikel/?${query.toString()}`)
    return res.data || { count: 0, pages: 1, results: [] }
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

export async function getPublicArticles(params = {}) {
  try {
    const { page = 1, kategori = null, tags = [] } = params
    const query = new URLSearchParams()
    query.append("page", page)
    if (kategori) query.append("kategori", kategori)
    if (Array.isArray(tags) && tags.length > 0) {
      tags.forEach((tagId) => query.append("tag", tagId))
    }

    const res = await api.get(`public/artikel/?${query.toString()}`)
    return res.data || { count: 0, pages: 1, current_page: 1, results: [] }
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