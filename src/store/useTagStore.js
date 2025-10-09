import { create } from "zustand"
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from "../axiosApi/tags"

export const useTagStore = create((set, get) => ({
  tags: [],
  loading: false,
  error: null,

  // 🔹 Ambil daftar tag
  fetchTags: async () => {
    set({ loading: true, error: null })
    try {
      const data = await getTags()
      set({
        tags: Array.isArray(data) ? data : [],
        loading: false,
      })
      return data
    } catch (err) {
      console.error("❌ fetchTags:", err)
      set({
        error: err.message || "Gagal memuat tags",
        loading: false,
      })
      return []
    }
  },

  // 🔹 Tambah tag baru
  addTag: async (payload) => {
    set({ loading: true, error: null })
    try {
      const newTag = await createTag(payload)
      if (!newTag) throw new Error("Tag gagal dibuat")

      set((state) => ({
        tags: [...state.tags, newTag],
        loading: false,
      }))
      return newTag
    } catch (err) {
      console.error("❌ addTag:", err)
      set({ error: err.message, loading: false })
      return null
    }
  },

  // 🔹 Update tag
  updateTag: async (id, payload) => {
    set({ loading: true, error: null })
    try {
      const updated = await updateTag(id, payload)
      if (!updated) throw new Error("Tag gagal diperbarui")

      set((state) => ({
        tags: state.tags.map((t) => (t.id === id ? updated : t)),
        loading: false,
      }))
      return updated
    } catch (err) {
      console.error("❌ updateTag:", err)
      set({ error: err.message, loading: false })
      return null
    }
  },

  // 🔹 Hapus tag
  deleteTag: async (id) => {
    set({ loading: true, error: null })
    try {
      const success = await deleteTag(id)
      if (!success) throw new Error("Tag gagal dihapus")

      set((state) => ({
        tags: state.tags.filter((t) => t.id !== id),
        loading: false,
      }))
      return true
    } catch (err) {
      console.error("❌ deleteTag:", err)
      set({ error: err.message, loading: false })
      return false
    }
  },
}))