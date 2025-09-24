import { create } from "zustand";

export const useArtikelStore = create(( set ) => ({
    form: {
        judul: "",
        konten: "",
        kategori_id: "",
        tag_ids: [],
        status: "draft",
    },
    selected: null,

    setForm: (form) => set({ form }), resetForm: () =>
        set({
            form: { judul: "", konten: "", kategori_id: "", tag_ids: [], status: "draft" },
            selected: null,
        }),
        setSelected: (artikel) => set({ selected: artikel }),
}));