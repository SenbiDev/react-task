import { create } from "zustand";
import { updateArtikel } from "../axiosApi/artikel";

export const useArtikelStore = create((set) => ({
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

    createArt: () => set((state) => {
        const newArtikel = {
            id: Date.now(),
            judul: state.judul,
            konten: state.konten,
            kategori: state.kategori,
            tags: state.tags,
            status: state.status,
        };
        return {
            arts: [ ...state.arts, newArtikel],
            judul: "",
            konten: "",
            kategori: "",
            tags: [],
            status: "draft",
        };
    }),

    startEdit: (artikel) => set ({
        editingId: artikel.id,
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
        judul: "",
        konten: "",
        kategori: "",
        tags: [],
        status: "draft",
    }),
}));