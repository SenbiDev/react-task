// src/store/artikelStore.js
import { create } from "zustand";
import axios from "axios";
import { API_BASE } from "../axiosApi/apiConfig";


export const useArtikelStore = create((set, get) => ({
  artikels: [],
  form: { judul: "", konten: "", kategori_id: "", tag_ids: [], status: "draft" },
  selected: null,
  loading: false,
  error: null,

  fetchArtikel: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE}/artikel/`, {
        headers: getAuthHeader(),
      });
      set({ artikels: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createArtikel: async (data) => {
    try {
      await axios.post(`${API_BASE}/artikel/`, data, {
        headers: getAuthHeader(),
      });
      await get().fetchArtikel(); 
    } catch (err) {
      set({ error: err.message });
    }
  },

  updateArtikel: async (id, data) => {
    try {
      await axios.put(`${API_BASE}/artikel/${id}/`, data, {
        headers: getAuthHeader(),
      });
      await get().fetchArtikel();
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteArtikel: async (id) => {
    try {
      await axios.delete(`${API_BASE}/artikel/${id}/`, {
        headers: getAuthHeader(),
      });
      await get().fetchArtikel();
    } catch (err) {
      set({ error: err.message });
    }
  },

  setForm: (form) => set({ form }),
  resetForm: () =>
    set({
      form: { judul: "", konten: "", kategori_id: "", tag_ids: [], status: "draft" },
      selected: null,
    }),
  setSelected: (artikel) => set({ selected: artikel }),
}));
