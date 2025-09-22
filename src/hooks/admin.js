import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as admin from "../axiosApi/admin";

export function useKategori() {
    return useQuery({
        queryKey: ["kategori"],
        queryFn: admin.getKategori,
    });
}

export function useCreateKategori() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ nama }) => admin.createKategori(nama),
        onSuccess: () => {
            queryClient.invalidateQueries(["kategori"]);
        },
    });
}
export function useUpdateKategori() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, nama }) => admin.updateKategori(id, nama),
        onSuccess: () => {
            queryClient.invalidateQueries(["kategori"]);
        },
    });
}
export function useDeleteKategori() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: admin.deleteKategori,
        onSuccess: () => {
            queryClient.invalidateQueries(["kategori"]);
        },
    });
}
export function useTags() {
    return useQuery({
        queryKey: ["tags"],
        queryFn: admin.getTags,
    });
}

export function useCreateTag() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ nama }) => admin.createTag(nama),
        onSuccess: () => {
            queryClient.invalidateQueries(["tags"]);
        },
    });
}
export function useUpdateTag() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, nama }) => admin.updateTag(id, nama),
        onSuccess: () => {
            queryClient.invalidateQueries(["tags"]);
        },
    });
}
export function useDeleteTag() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: admin.deleteTag,
        onSuccess: () => {
            queryClient.invalidateQueries(["tags"]);
        },
    });
}