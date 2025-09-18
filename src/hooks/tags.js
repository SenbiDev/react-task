import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getTags,
    createTag,
    updateTag,
    deleteTag,
} from "../axiosApi/tags"

export function useTagList() {
    return useQuery({
        queryKey: ["tagList"],
        queryFn: getTags,
    });
}

export function useCreateTag() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (nama) => createTag(nama),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tagList"] });
        },
    });
}

export function useUpdateTag() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ( {id, nama} ) => updateTag(id, nama),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tagList"] });
        },
    });
}

export function useDeleteTag() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteTag(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tagList"] });
        },
    });
}