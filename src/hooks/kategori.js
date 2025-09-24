import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getKategori, createKategori, updateKategori, deleteKategori } from "../axiosApi/kategori"
import { useKategoriStore } from "../store/useKategoriStore"

export function useKategoriList() {
  const setState = useKategoriStore.setState
  return useQuery({
    queryKey: ["kategoriList"],
    queryFn: getKategori,
    onSuccess: (data) => setState({ kategori: data }),
  })
}

export function useCreateKategori() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (nama) => createKategori(nama),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["kategoriList"] })
    },
  })
}

export function useUpdateKategori() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, nama }) => updateKategori(id, nama),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["kategoriList"] })
    },
  })
}

export function useDeleteKategori() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteKategori(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["kategoriList"] })
    },
  })
}