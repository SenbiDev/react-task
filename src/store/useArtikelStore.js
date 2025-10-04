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

  fetchArtikel: async () => {
    set({ loading: true, error: null })
    try {
      const data = await getArtikelList()
      set({ artikel: data, loading: false })
    } catch (err) {
      console.error("Gagal fetch artikel:", err)
      set({ error: err.message, loading: false })
    }
  },

  addArtikel: async (payload) => {
    set({ loading: true, error: null })
    try {
      const newArtikel = await createArticle(payload)
      set((state) => ({
        artikel: [...state.artikel, newArtikel],
        loading: false,
      }))
    } catch (err) {
      console.error("Gagal tambah artikel:", err)
      set({ error: err.message, loading: false })
    }
  },

  updateArtikel: async (id, payload) => {
    set({ loading: true, error: null })
    try {
      const updated = await updateArticle(id, payload)
      set((state) => ({
        artikel: state.artikel.map((a) =>
          a.id === id ? updated : a
        ),
        loading: false,
        artikelEdit: null,
      }))
    } catch (err) {
      console.error("Gagal update artikel:", err)
      set({ error: err.message, loading: false })
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
    } catch (err) {
      console.error("Gagal hapus artikel:", err)
      set({ error: err.message, loading: false })
    }
  },

  setArtikelEdit: (artikel) => set({ artikelEdit: artikel }),

  clearArtikelEdit: () => set({ artikelEdit: null }),
}))