import api from "./apiConfig"

// 🔹 Ambil semua kategori
export const getKategori = async () => {
  try {
    const res = await api.get("kategori/")
    return res.data || []
  } catch (error) {
    console.error("Gagal memuat kategori:", error.response?.data || error.message)
    return [] // tetap return array kosong agar frontend gak error
  }
}

// 🔹 Tambah kategori baru
export const createKategori = async (payload) => {
  try {
    const res = await api.post("kategori/", payload)
    return res.data
  } catch (error) {
    console.error("Gagal membuat kategori:", error.response?.data || error.message)
    throw error // lempar agar store bisa tangkap & tampilkan message
  }
}

// 🔹 Update kategori berdasarkan ID
export const updateKategori = async (id, payload) => {
  try {
    const res = await api.put(`kategori/${id}/`, payload)
    return res.data
  } catch (error) {
    console.error("Gagal memperbarui kategori:", error.response?.data || error.message)
    throw error
  }
}

// 🔹 Hapus kategori
export const deleteKategori = async (id) => {
  try {
    await api.delete(`kategori/${id}/`)
    return true
  } catch (error) {
    console.error("Gagal menghapus kategori:", error.response?.data || error.message)
    throw error
  }
}