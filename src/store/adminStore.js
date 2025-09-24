import { create } from "zustand"

const useAdminStore = create(( set ) => ({
    selectedKategori: null,
    kategoriForm: { nama: "" },
    selectedKategori: ( kategori ) => set({ selectedKategori: kategori }),
    setKategoriForm: ( form ) =>set({ kategoriForm: form }),
    resetKategori: () => set({ selectedKategori: null, kategoriForm: { nama: "" } }),
    
    selectedTag: null,
    tagForm: { nama: "" },
    selectedTag: ( tag ) => set({ selectedTag: tag }),
    setTagForm: ( form ) =>set({ tagForm: form }),
    resetTag: () => set({ selectedTag: null, tagForm: { nama: "" } }),
}))

export default useAdminStore;