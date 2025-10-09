import { create } from "zustand"
import {
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from "../axiosApi/kategori"

export const useKategoriStore = create((set, get) => ({
  kategori: [],
  loading: false,
  error: null,

  // 🔹 Ambil daftar kategori
  fetchKategori: async () => {
    set({ loading: true, error: null })
    try {
      const data = await getKategori()
      set({
        kategori: Array.isArray(data) ? data : [],
        loading: false,
      })
      return data
    } catch (err) {
      console.error("❌ fetchKategori:", err)
      set({
        error: err.message || "Gagal memuat kategori",
        loading: false,
      })
      return []
    }
  },

  // 🔹 Tambah kategori baru
  addKategori: async (payload) => {
    set({ loading: true, error: null })
    try {
      const newKategori = await createKategori(payload)
      if (!newKategori) throw new Error("Kategori gagal dibuat")

      set((state) => ({
        kategori: [...state.kategori, newKategori],
        loading: false,
      }))
      return newKategori
    } catch (err) {
      console.error("❌ addKategori:", err)
      set({ error: err.message, loading: false })
      return null
    }
  },

  // 🔹 Update kategori
  updateKategori: async (id, payload) => {
    set({ loading: true, error: null })
    try {
      const updated = await updateKategori(id, payload)
      if (!updated) throw new Error("Kategori gagal diperbarui")

      set((state) => ({
        kategori: state.kategori.map((k) => (k.id === id ? updated : k)),
        loading: false,
      }))
      return updated
    } catch (err) {
      console.error("❌ updateKategori:", err)
      set({ error: err.message, loading: false })
      return null
    }
  },

  // 🔹 Hapus kategori
  deleteKategori: async (id) => {
    set({ loading: true, error: null })
    try {
      const success = await deleteKategori(id)
      if (!success) throw new Error("Kategori gagal dihapus")

      set((state) => ({
        kategori: state.kategori.filter((k) => k.id !== id),
        loading: false,
      }))
      return true
    } catch (err) {
      console.error("❌ deleteKategori:", err)
      set({ error: err.message, loading: false })
      return false
    }
  },
}))