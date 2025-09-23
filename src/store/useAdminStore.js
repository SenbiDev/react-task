import { create } from "zustand";


export const useKategoriStore = create ((set) => ({
    kats: [],
    newKategori:"",
    editKategoriId: null,
    editKategoriName: "",

    setNewKategori: (kategori) => set ((state) => ({
        newKategori: kategori, 
    })),
    
    setEditKategoriName: (id, nama) => set ({
        editKategoriId: id,
        editKategoriName: nama
    }),

    setDeleteKategori : (id) => set ((state) => ({
        kats : state.kats.filter((kategori) => kategori.id !== id)
    }))
    
}))

export const useTagStore = create ((set) => ({
    tgs: [],
    newTag:"",
    editTagId: null,
    editTagName: "",
    setNewTag: (tag) => set ((state) => ({
        newTag: tag, 
    })),
    
    setEditTagName: (id, nama) => set ({
        editTagId: id,
        editTagName: nama
    }),

    setDeleteTag : (id) => set ((state) => ({
        tgs : state.tgs.filter((tag) => tag.id !== id)
    }))
    
}))
