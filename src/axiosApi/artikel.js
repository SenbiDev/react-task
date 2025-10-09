import api from "./apiConfig"

// === Ambil daftar artikel dengan filter, pagination, dan search ===
export const getArtikelList = async (params = {}) => {
  try {
    const { page = 1, search = "", kategori = null, tag = null } = params
    const query = new URLSearchParams()
    query.append("page", page)

    if (kategori) query.append("kategori", kategori)
    if (tag) query.append("tag", tag) // backend hanya kenal 1 tag

    const response = await api.get(`artikel/?${query.toString()}`)
    const data = response.data || { count: 0, pages: 1, results: [] }

    // 🔍 filter pencarian hanya di sisi frontend (per halaman)
    if (search.trim()) {
      const keyword = search.toLowerCase()
      const filtered = data.results.filter(
        (a) =>
          a.judul?.toLowerCase().includes(keyword) ||
          a.konten?.toLowerCase().includes(keyword)
      )
      return {
        ...data,
        results: filtered,
        count: filtered.length,
        pages: 1,
        current_page: 1,
      }
    }

    return data
  } catch (error) {
    console.error("❌ Gagal memuat artikel:", error.response?.data || error.message)
    return { count: 0, pages: 1, current_page: 1, results: [] }
  }
}

// === Ambil 1 artikel berdasarkan ID ===
export const getArticleById = async (id) => {
  try {
    const response = await api.get(`artikel/${id}/`)
    return response.data
  } catch (error) {
    console.error("❌ Gagal memuat artikel:", error.response?.data || error.message)
    return null
  }
}

// === Buat artikel baru ===
export const createArticle = async (payload) => {
  try {
    const response = await api.post("artikel/", payload)
    return response.data
  } catch (error) {
    console.error("❌ Gagal membuat artikel:", error.response?.data || error.message)
    return null
  }
}

// === Update artikel ===
export const updateArticle = async (id, payload) => {
  try {
    const cleanPayload = {
      judul: payload.judul,
      konten: payload.konten,
      status: payload.status,
      kategori_id: payload.kategori_id,
      tag_ids: (payload.tag_ids || []).filter(Boolean),
    }

    const response = await api.put(`artikel/${id}/`, cleanPayload)
    return response.data
  } catch (error) {
    console.error("❌ Gagal memperbarui artikel:", error.response?.data || error.message)
    return null
  }
}

// === Hapus artikel ===
export const deleteArticle = async (id) => {
  try {
    await api.delete(`artikel/${id}/`)
    return true
  } catch (error) {
    console.error("❌ Gagal menghapus artikel:", error.response?.data || error.message)
    return false
  }
}

// === Ambil artikel publik (tanpa login) ===
export const getPublicArticles = async (params = {}) => {
  try {
    const { page = 1, kategori = null, tag = null } = params
    const query = new URLSearchParams()
    query.append("page", page)

    if (kategori) query.append("kategori", kategori)
    if (tag) query.append("tag", tag)

    const response = await api.get(`public/artikel/?${query.toString()}`)
    return (
      response.data || { count: 0, pages: 1, current_page: 1, results: [] }
    )
  } catch (error) {
    console.error("❌ Gagal memuat artikel publik:", error.response?.data || error.message)
    return { count: 0, pages: 1, current_page: 1, results: [] }
  }
}

// === Ambil artikel milik user login ===
export const getMyArticles = async () => {
  try {
    const response = await api.get("artikel/")
    const user = JSON.parse(localStorage.getItem("user"))
    const allArticles = response.data.results || []

    if (!user?.id) return []

    return allArticles.filter(
      (a) =>
        a.penulis?.id === user.id ||
        a.penulis_id === user.id ||
        a.is_owner
    )
  } catch (error) {
    console.error("❌ Gagal memuat artikel saya:", error.response?.data || error.message)
    return []
  }
}