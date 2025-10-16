// src/store/ArtikelStore.js
import { create } from "zustand";
import axios from "axios";
import { API_BASE, getAuthHeader } from "../axiosApi/apiConfig";

export const useArtikelStore = create((set, get) => ({
  artikels: [],
  kategoriList: [],
  tagList: [], 

  form: {
    judul: "",
    konten: "",
    kategori_id: "",
    tag_ids: [],
    status: "draft",
  },
  selected: null,
  loading: false,
  error: null,

  // 🔹 Fetch semua artikel
  fetchArtikel: async (page = 1, pageSize = 10, search = "") => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE}/artikel/`, {
        headers: getAuthHeader(),
        params: { page, page_size: pageSize, search },
      });

      set({
        artikels: {
          results: res.data.results || [],
          count: res.data.count || (res.data.results?.length ?? 0),
        },
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("Gagal fetch artikel:", err);
      set({ error: err.message, loading: false });
    }
  },

  // 🔹 Fetch kategori (dipakai di filter)
  fetchKategori: async () => {
    try {
      const res = await axios.get(`${API_BASE}/kategori/`, {
        headers: getAuthHeader(),
      });
      set({ kategoriList: res.data });
    } catch (err) {
      console.error("Gagal fetch kategori:", err);
    }
  },

  // 🔹 Fetch tag (dipakai di filter)
  fetchTag: async () => {
    try {
      const res = await axios.get(`${API_BASE}/tags/`, {
        headers: getAuthHeader(),
      });
      set({ tagList: res.data });
    } catch (err) {
      console.error("Gagal fetch tag:", err);
    }
  },

  // 🔹 CRUD artikel
  createArtikel: async (data) => {
    try {
      const res = await axios.post(`${API_BASE}/artikel/`, data, {
        headers: getAuthHeader(),
      });
      await get().fetchArtikel();
      return res.data;
    } catch (err) {
      console.error("Gagal membuat artikel:", err);
      set({ error: err.message });
      throw err;
    }
  },

  updateArtikel: async (id, data) => {
    try {
      const res = await axios.put(`${API_BASE}/artikel/${id}/`, data, {
        headers: getAuthHeader(),
      });
      await get().fetchArtikel();
      return res.data;
    } catch (err) {
      console.error("Gagal update artikel:", err);
      set({ error: err.message });
      throw err;
    }
  },

  deleteArtikel: async (id) => {
    try {
      await axios.delete(`${API_BASE}/artikel/${id}/`, {
        headers: getAuthHeader(),
      });
      await get().fetchArtikel();
    } catch (err) {
      console.error("Gagal hapus artikel:", err);
      set({ error: err.message });
    }
  },

  setForm: (form) => set({ form }),
  resetForm: () =>
    set({
      form: {
        judul: "",
        konten: "",
        kategori_id: "",
        tag_ids: [],
        status: "draft",
      },
      selected: null,
    }),
  setSelected: (artikel) => set({ selected: artikel }),
}));
