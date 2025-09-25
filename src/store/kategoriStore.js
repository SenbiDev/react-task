// src/store/kategoriStore.js
import { create } from "zustand";
import axios from "axios";
import { API_BASE, getAuthHeader } from "../axiosApi/apiConfig";


export const useKategoriStore = create((set, get) => ({
  kategori: [],
  form: { nama: "" },
  selected: null,
  loading: false,
  error: null,

  fetchKategori: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE}/kategori/`, {
        headers: getAuthHeader(),
      });
      set({ kategori: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createKategori: async (data) => {
    try {
      await axios.post(`${API_BASE}/kategori/`, data, {
        headers: getAuthHeader(),
      });
      await get().fetchKategori();
    } catch (err) {
      set({ error: err.message });
    }
  },

  updateKategori: async (id, data) => {
    try {
      await axios.put(`${API_BASE}/kategori/${id}/`, data, {
        headers: getAuthHeader(),
      });
      await get().fetchKategori();
    } catch (err) {
      set({ error: err.message });
    }
  },

  deleteKategori: async (id) => {
    try {
      await axios.delete(`${API_BASE}/kategori/${id}/`, {
        headers: getAuthHeader(),
      });
      await get().fetchKategori();
    } catch (err) {
      set({ error: err.message });
    }
  },

  setForm: (form) => set({ form }),
  resetForm: () => set({ form: { nama: "" }, selected: null }),
  setSelected: (kategori) => set({ selected: kategori }),
}));
