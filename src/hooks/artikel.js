import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as artikelApi from "../axiosApi/artikel"
import { useArtikelStore } from "../store/useArtikelStore"

const QUERY_KEYS = {
  PUBLIC: "publicArticles",
  MY: "myArticles",
}

export const usePublicArticles = (filters = {}) => {
  const setState = useArtikelStore((state) => state.setState)
  const { search = "", kategori = "", tag = "" } = filters

  return useQuery({
    queryKey: [QUERY_KEYS.PUBLIC, { search, kategori, tag }],
    queryFn: () => artikelApi.getPublicArticles({ search, kategori, tag }),
    onSuccess: (data) => setState({ artikel: data }),
  })
}

export const useMyArticles = () => {
  const setState = useArtikelStore((state) => state.setState)
  return useQuery({
    queryKey: [QUERY_KEYS.MY],
    queryFn: artikelApi.getMyArticles,
    onSuccess: (data) => setState({ artikel: data }),
  })
}

export const useCreateArticle = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: artikelApi.createArticle,
    onSuccess: () => {
      Promise.all([
        qc.invalidateQueries([QUERY_KEYS.PUBLIC]),
        qc.invalidateQueries([QUERY_KEYS.MY]),
      ])
    },
    onError: (err) => console.error("Gagal membuat artikel:", err),
  })
}

export const useUpdateArticle = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => artikelApi.updateArticle(id, data),
    onSuccess: () => {
      Promise.all([
        qc.invalidateQueries([QUERY_KEYS.PUBLIC]),
        qc.invalidateQueries([QUERY_KEYS.MY]),
      ])
    },
    onError: (err) => console.error("Gagal memperbarui artikel:", err),
  })
}

export const useDeleteArticle = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: artikelApi.deleteArticle,
    onSuccess: () => {
      Promise.all([
        qc.invalidateQueries([QUERY_KEYS.PUBLIC]),
        qc.invalidateQueries([QUERY_KEYS.MY]),
      ])
    },
    onError: (err) => console.error("Gagal menghapus artikel:", err),
  })
}