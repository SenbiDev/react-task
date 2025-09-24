import { create } from "zustand";

export const useTagStore = create((set) => ({
    selectedTag: null, tagForm: { nama: "" },

    setSelectedTag: ( tag ) => set({ selectedTag : tag, tagForm: { nama: tag?.nama || "" }}),
    resetTag: () => set({ selectedTag: null, tagForm: { nama: "" }})
}));