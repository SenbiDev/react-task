// hooks/useTagsQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTags, createTag, updateTag, deleteTag } from "../axiosApi/tags";

// Ambil semua tag
export function useTagsList() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
}

// Tambah tag
export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
    },
  });
}

// Update tag
export function useUpdateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, nama }) => updateTag(id, nama),
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
    },
  });
}

// Hapus tag
export function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
    },
  });
}
