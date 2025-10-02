import { create } from "zustand";
import { updateArtikel } from "../axiosApi/artikel";
import api from "../axiosApi/apiConfig";

export const useArtikelStore = create((set, get) => ({
    arts:[],
    judul: "",
    konten: "",
    kategori: "",
    tags: [],
    status: "draft",
    editingId: null,

    setJudul: (val) => set({ judul: val }),
    setKonten: (val) => set({ konten: val }),
    setStatus: (val) => set({ status: val }),
    setKategori: (val) => set({ kategori: val }),
    setTags: (val) => set({ tags: val}),
    toggleTag: (id) =>
        set((state) => ({
            tags: state.tags.includes(id) ? state.tags.filter((t) => t !== id) : [...state.tags, id],
        })),

    createArt: async () => {
        const state = get();
        const payload = {
            id: Date.now(),
            judul: state.judul,
            konten: state.konten,
            kategori_id: state.kategori,
            tag_ids: Array.isArray(state.tags) ? state.tags: [],
            status: state.status,
        };
        try {
            const res = await api.post("/artikel/", payload);

            const detail = await api.get(`/artikel/${res.data.id}`);

            set ((state) => ({
                arts: [ ...state.arts, res.data],
                judul: "",
                konten: "",
                kategori: "",
                tags: [],
                status: "draft",
            }));

            return res.data;
        } catch (err) {
            console.log("Gagam membuat artikel", err.response?.data || err.message);
            throw err;
        }
    },

    editingId: null,
    editingArtikel: null,

    startEdit: (artikel) => set ({
        editingId: artikel.id,
        editingArtikel: artikel,
        judul: artikel.judul || "",
        konten: artikel.konten || "",
        kategori: artikel.kategori?.id || "",
        tags: artikel.tags?.map((t) => t.id) || [],
        status: artikel.status || "draft",
    }),

    updateArt: () => set((state) => {
        if (!state.editingId) return state;
            const updatedArt = state.arts.map((a) => a.id === state.editingId ? {
                ...a,
                judul: state.judul,
                konten: state.konten,
                kategori: state.kategori,
                tags: state.tags,
                status: state.status,
            }
            : a
        );
        return {
            arts: updatedArt,
            editingId: null,
            editingArtikel: null,
            judul: "",
            konten: "",
            kategori: "",
            tags: [],
            status: "draft",
        };
    }),

    deleteArt: (id) => set((state) => ({
        arts: state.arts.filter((a) => a.id !== id),
    })),

    resForm: () => set({
        editingId: null,
        editingArtikel: null,
        judul: "",
        konten: "",
        kategori: "",
        tags: [],
        status: "draft",
    }),
}));