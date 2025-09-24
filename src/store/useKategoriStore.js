import { create } from "zustand"
import * as kategoriApi from "../axiosApi/kategori"

export const useKategoriStore = create((set, get) => ({
  kategori: [],
  isLoading: false,
  error: null,

  fetchKategori: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await kategoriApi.getKategori()
      set({ kategori: data, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  addKategori: async (payload) => {
    try {
      const data = await kategoriApi.createKategori(payload)
      set({ kategori: [...get().kategori, data] })
    } catch (err) {
      set({ error: err.message })
    }
  },

  updateKategori: async (id, payload) => {
    try {
      const data = await kategoriApi.updateKategori(id, payload)
      set({
        kategori: get().kategori.map((k) => (k.id === id ? data : k)),
      })
    } catch (err) {
      set({ error: err.message })
    }
  },

  deleteKategori: async (id) => {
    try {
      await kategoriApi.deleteKategori(id)
      set({
        kategori: get().kategori.filter((k) => k.id !== id),
      })
    } catch (err) {
      set({ error: err.message })
    }
  },
}))