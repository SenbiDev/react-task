import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as artikel from "../axiosApi/artikel";

export function useMyArtikels() {
    return useQuery({
        queryKey: ["my-artikels"],
        queryFn: artikel.getMyArtikels,
    });
}

export function usePublikArtikels(enabled = false) {
    return useQuery({
        queryKey: ["publik-artikels"],
        queryFn: artikel.getPublikArtikels,
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
