// hooks/useArtikelQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../api/artikelApi";

// Ambil semua artikel
export function useArticles() {
  return useQuery({
    queryKey: ["artikel"],
    queryFn: getArticles,
  });
}

// Tambah artikel
export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      // refresh artikel list setelah create
      queryClient.invalidateQueries(["artikel"]);
    },
  });
}

// Update artikel
export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateArticle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["artikel"]);
    },
  });
}

// Hapus artikel
export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries(["artikel"]);
    },
  });
}
