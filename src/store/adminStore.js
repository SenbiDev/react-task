import { create } from "zustand";

const useAdminStore = create((set) => ({
  // Kategori state
  selectedKategori: null,
  kategoriForm: { nama: "" },
  setSelectedKategori: (kategori) => set({ selectedKategori: kategori }),
  setKategoriForm: (form) => set({ kategoriForm: form }),
  resetKategori: () => set({ selectedKategori: null, kategoriForm: { nama: "" } }),

  // Tag state
  selectedTag: null,
  tagForm: { nama: "" },
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setTagForm: (form) => set({ tagForm: form }),
  resetTag: () => set({ selectedTag: null, tagForm: { nama: "" } }),
}));

export default useAdminStore;
