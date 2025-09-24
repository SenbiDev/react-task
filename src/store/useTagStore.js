import { create } from "zustand"
import * as tagApi from "../axiosApi/tags"

export const useTagStore = create((set, get) => ({
  tags: [],
  isLoading: false,
  error: null,

  fetchTags: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await tagApi.getTags()
      set({ tags: data, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  addTag: async (payload) => {
    try {
      const data = await tagApi.createTag(payload)
      set({ tags: [...get().tags, data] })
    } catch (err) {
      set({ error: err.message })
    }
  },

  updateTag: async (id, payload) => {
    try {
      const data = await tagApi.updateTag(id, payload)
      set({
        tags: get().tags.map((t) => (t.id === id ? data : t)),
      })
    } catch (err) {
      set({ error: err.message })
    }
  },

  deleteTag: async (id) => {
    try {
      await tagApi.deleteTag(id)
      set({
        tags: get().tags.filter((t) => t.id !== id),
      })
    } catch (err) {
      set({ error: err.message })
    }
  },
}))