import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import * as artikel from "../axiosApi/artikel";

export function useMyArtikels() {
    return useQuery({
        queryKey: ["my-artikels"],
        queryFn: artikel.getMyArtikels,
    });
}

export function useAllMyArtikels(pageSize=10){
    return useQuery({
        queryKey: ["all-my-artikels", pageSize],
        queryFn: () => artikel.getAllMyArtikels(pageSize),
    });
}

export function usePublikArtikels(isAdmin, page=1, page_size=10) {
    return useQuery({
        queryKey: ["publik-artikels", isAdmin, page, page_size],
        queryFn: () => artikel.getPublikArtikels({isAdmin, page, page_size}),
        keepPreviousData: true,
    });
}

export function useAllPublikArtikels(pageSize=10, isAdmin=false){
    return useQuery({
        queryKey: ["all-publik-artikels", pageSize, isAdmin],
        queryFn: () => artikel.getAllPublikArtikels(pageSize, isAdmin),
    });
}

export function useArtikelById(id) {
    return useQuery({
        queryKey: ["artikel", id],
        queryFn: () => artikel.getArtikelById(id),
        enabled: !!id,
    });
}
export function useCreateArtikel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: artikel.createArtikel,
        onSuccess: () => {
            queryClient.invalidateQueries(["my-artikels"]);
            queryClient.invalidateQueries(["publik-artikels"]);
        },
    });
}
export function useUpdateArtikel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload}) => artikel.updateArtikel(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries(["my-artikels"]);
            queryClient.invalidateQueries(["publik-artikels"]);
        },
    });
}
export function useDeleteArtikel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: artikel.deleteArtikel,
        onSuccess: () => {
            queryClient.invalidateQueries(["my-artikels"]);
            queryClient.invalidateQueries(["publik-artikels"]);
        },
    });
}
