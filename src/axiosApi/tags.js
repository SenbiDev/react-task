import api from "./apiConfig"

// 🔹 Ambil semua tag
export const getTags = async () => {
  try {
    const res = await api.get("tags/")
    return res.data || []
  } catch (error) {
    console.error("Gagal memuat tags:", error.response?.data || error.message)
    return [] // tetap return [] agar UI tidak error saat render
  }
}

// 🔹 Tambah tag baru
export const createTag = async (payload) => {
  try {
    const res = await api.post("tags/", payload)
    return res.data
  } catch (error) {
    console.error("Gagal membuat tag:", error.response?.data || error.message)
    throw error // biarkan ditangani oleh store atau komponen
  }
}

// 🔹 Update tag berdasarkan ID
export const updateTag = async (id, payload) => {
  try {
    const res = await api.put(`tags/${id}/`, payload)
    return res.data
  } catch (error) {
    console.error("Gagal memperbarui tag:", error.response?.data || error.message)
    throw error
  }
}

// 🔹 Hapus tag
export const deleteTag = async (id) => {
  try {
    await api.delete(`tags/${id}/`)
    return true
  } catch (error) {
    console.error("Gagal menghapus tag:", error.response?.data || error.message)
    throw error
  }
}