import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getArtikelList, createArticle } from "../axiosApi/artikel";

export function useArtikelList() {
  return useQuery({
    queryKey: ["artikelList"],
    queryFn: getArtikelList,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      // Refetch daftar artikel setelah post berhasil
      queryClient.invalidateQueries({ queryKey: ["artikelList"] });
    },
    onError: (error) => {
      console.error("Gagal membuat artikel:", error);
    },
  });
}
