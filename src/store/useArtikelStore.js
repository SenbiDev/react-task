import { create } from "zustand"
import {
  getArtikelList,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../axiosApi/artikel"

export const useArtikelStore = create((set) => ({
  artikel: [],
  artikelEdit: null,
  loading: false,
  error: null,
  pagination: {
    count: 0,
    pages: 0,
    current_page: 1,
  },

  fetchArtikel: async (params = {}) => {
    set({ loading: true, error: null })
    try {
      const { page = 1, search = "", kategori = null, tags = [] } = params
      const data = await getArtikelList({ page, search, kategori, tags })

      set({
        artikel: data.results || [],
        pagination: {
          count: data.count || 0,
          pages: data.pages || 0,
          current_page: data.current_page || 1,
        },
        loading: false,
      })

      return data
    } catch (err) {
      console.error("Gagal fetch artikel:", err)
      set({ error: err.message, loading: false })
      return null
    }
  },

  addArtikel: async (payload) => {
    set({ loading: true, error: null })
    try {
      const newArtikel = await createArticle(payload)
      set((state) => ({
        artikel: [newArtikel, ...state.artikel],
        loading: false,
      }))
      return newArtikel
    } catch (err) {
      console.error("Gagal tambah artikel:", err)
      set({ error: err.message, loading: false })
      return null
    }
  },

  updateArtikel: async (id, payload) => {
    set({ loading: true, error: null })
    try {
      const updated = await updateArticle(id, payload)
      set((state) => ({
        artikel: state.artikel.map((a) => (a.id === id ? updated : a)),
        loading: false,
        artikelEdit: null,
      }))
      return updated
    } catch (err) {
      console.error("Gagal update artikel:", err)
      set({ error: err.message, loading: false })
      return null
    }
  },

  deleteArtikel: async (id) => {
    set({ loading: true, error: null })
    try {
      await deleteArticle(id)
      set((state) => ({
        artikel: state.artikel.filter((a) => a.id !== id),
        loading: false,
      }))
      return true
    } catch (err) {
      console.error("Gagal hapus artikel:", err)
      set({ error: err.message, loading: false })
      return false
    }
  },

  setArtikelEdit: (artikel) => set({ artikelEdit: artikel }),
  clearArtikelEdit: () => set({ artikelEdit: null }),
}))