import { create } from "zustand"
import {
  getArtikelList,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../axiosApi/artikel"

export const useArtikelStore = create((set, get) => ({
  artikel: [],
  artikelEdit: null,
  loading: false,
  error: null,
  pagination: {
    count: 0,
    pages: 0,
    current_page: 1,
  },

  // === Fetch artikel (support filter kategori & 1 tag) ===
  fetchArtikel: async (params = {}) => {
    set({ loading: true, error: null })
    try {
      const {
        page = 1,
        kategori = null,
        tags = [],
        search = "",
      } = params

      // backend hanya mengenal 1 tag → ambil tag pertama
      const tag = Array.isArray(tags) && tags.length > 0 ? tags[0] : null

      const data = await getArtikelList({
        page,
        kategori,
        tag, // kirim ke backend sebagai 'tag'
        search,
      })

      set({
        artikel: data?.results || [],
        pagination: {
          count: data?.count || 0,
          pages: data?.pages || 1,
          current_page: data?.current_page || 1,
        },
        loading: false,
      })

      return data
    } catch (error) {
      console.error("Fetch artikel gagal:", error)
      set({
        error: error.message || "Gagal memuat artikel",
        loading: false,
        artikel: [],
      })
      return null
    }
  },

  // === Tambah artikel baru ===
  addArtikel: async (payload) => {
    set({ loading: true, error: null })
    try {
      const newArtikel = await createArticle(payload)
      if (!newArtikel) throw new Error("Artikel gagal dibuat")

      set((state) => ({
        artikel: [newArtikel, ...state.artikel],
        loading: false,
      }))
      return newArtikel
    } catch (error) {
      console.error("Add artikel gagal:", error)
      set({ error: error.message, loading: false })
      return null
    }
  },

  // === Update artikel ===
  updateArtikel: async (id, payload) => {
    set({ loading: true, error: null })
    try {
      const updated = await updateArticle(id, payload)
      if (!updated) throw new Error("Artikel gagal diperbarui")

      set((state) => ({
        artikel: state.artikel.map((a) => (a.id === id ? updated : a)),
        loading: false,
        artikelEdit: null,
      }))
      return updated
    } catch (error) {
      console.error("Update artikel gagal:", error)
      set({ error: error.message, loading: false })
      return null
    }
  },

  // === Hapus artikel ===
  deleteArtikel: async (id) => {
    set({ loading: true, error: null })
    try {
      const success = await deleteArticle(id)
      if (!success) throw new Error("Artikel gagal dihapus")

      set((state) => ({
        artikel: state.artikel.filter((a) => a.id !== id),
        loading: false,
      }))
      return true
    } catch (error) {
      console.error("Delete artikel gagal:", error)
      set({ error: error.message, loading: false })
      return false
    }
  },

  // === Edit state handler ===
  setArtikelEdit: (artikel) => set({ artikelEdit: artikel }),
  clearArtikelEdit: () => set({ artikelEdit: null }),
}))