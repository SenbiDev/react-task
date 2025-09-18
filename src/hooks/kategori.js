import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
    getKategori,
    createKategori,
    updateKategori,
    deleteKategori,
} from "../axiosApi/kategori"

export function useKategoriList() {
    return useQuery({
        queryKey: ["kategoriList"],
        queryFn: getKategori,
    });
}

export function useCreateKategori() {
    const queryClient =  useQueryClient();

    return useMutation({
        mutationFn: (nama) => createKategori(nama),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["kategoriList"] });
        },
    });
}

export function useUpdateKategori() {
    const queryClient =  useQueryClient();

    return useMutation({
        mutationFn: ({ id, nama }) => updateKategori( id, nama ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["kategoriList"] });
        },
    });
}

export function useDeleteKategori() {
    const queryClient =  useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteKategori(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["kategoriList"] });
        },
    });
}