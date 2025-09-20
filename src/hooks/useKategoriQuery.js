// hooks/useKategoriQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from "../api/kategori";

// Ambil semua kategori
export function useKategoriList() {
  return useQuery({
    queryKey: ["kategori"],
    queryFn: getKategori,
  });
}

// Tambah kategori
export function useCreateKategori() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createKategori,
    onSuccess: () => {
      queryClient.invalidateQueries(["kategori"]);
    },
  });
}

// Update kategori
export function useUpdateKategori() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, nama }) => updateKategori(id, nama),
    onSuccess: () => {
      queryClient.invalidateQueries(["kategori"]);
    },
  });
}

// Hapus kategori
export function useDeleteKategori() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteKategori,
    onSuccess: () => {
      queryClient.invalidateQueries(["kategori"]);
    },
  });
}
