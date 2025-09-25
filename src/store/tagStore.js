// src/store/tagStore.js
import { create } from "zustand";
import axios from "axios";
import { API_BASE, getAuthHeader } from "../axiosApi/apiConfig";

export const useTagStore = create((set, get) => ({
  tags: [],
  form: { nama: "" },
  selected: null,
  loading: false,
  error: null,

  fetchTags: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE}/tag/`, {
        headers: getAuthHeader(),
      });
      set({ tags: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createTag: async (data) => {
    try {
      await axios.post(`${API_BASE}/tag/`, data, {
        headers: getAuthHeader(),
      });
      await get().fetchTags();
    } catch (err) {
      set({ error: err.message });
    }
  },

  updateTag: async (id, data) => {
    try {
      await axios.put(`${API_BASE}/tag/${id}/`, data, {
        headers: getAuthHeader(),
      });
      await get().fetchTags();
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteTag: async (id) => {
    try {
      await axios.delete(`${API_BASE}/tag/${id}/`, {
        headers: getAuthHeader(),
      });
      await get().fetchTags();
    } catch (err) {
      set({ error: err.message });
    }
  },

  setForm: (form) => set({ form }),
  resetForm: () => set({ form: { nama: "" }, selected: null }),
  setSelected: (tag) => set({ selected: tag }),
}));
