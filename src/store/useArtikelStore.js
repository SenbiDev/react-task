import { create } from "zustand";

export const useArtikelStore = create((set) => ({
  artikelEdit: null,

  setArtikelEdit: (artikel) => set({ artikelEdit: artikel }),
  clearArtikelEdit: () => set({ artikelEdit: null }),
}));