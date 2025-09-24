import { create } from "zustand";

export const useKategoriStore = create((set) => ({
    selectedKategori: null, kategoriForm: { nama: "" },

    setSelectedKategori: ( kategori) => set({ selectedKategori : kategori, kategoriForm: { nama: kategori?.nama || "" }}),
    resetKategori: () => set({ selectedKategori: null, kategoriForm: { nama: "" }})
}));