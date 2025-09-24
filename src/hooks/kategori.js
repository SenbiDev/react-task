import { useEffect } from "react"
import { useKategoriStore } from "../store/useKategoriStore"

export function useKategoriList() {
  const { kategori, fetchKategori, isLoading, error } = useKategoriStore()

  useEffect(() => {
    fetchKategori()
  }, [fetchKategori])

  return { kategori, isLoading, error }
}

export function useCreateKategori() {
  const { addKategori, error } = useKategoriStore()
  return { addKategori, error }
}

export function useUpdateKategori() {
  const { updateKategori, error } = useKategoriStore()
  return { updateKategori, error }
}

export function useDeleteKategori() {
  const { deleteKategori, error } = useKategoriStore()
  return { deleteKategori, error }
}