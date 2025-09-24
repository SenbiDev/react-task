import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as artikelApi from "../axiosApi/artikel"
import { useArtikelStore } from "../store/useArtikelStore"

export const usePublicArticles = () => {
  const setState = useArtikelStore.setState
  return useQuery({
    queryKey: ["publicArticles"],
    queryFn: artikelApi.getPublicArticles,
    onSuccess: (data) => setState({ artikel: data }),
  })
}

export const useMyArticles = () => {
  const setState = useArtikelStore.setState
  return useQuery({
    queryKey: ["myArticles"],
    queryFn: artikelApi.getMyArticles,
    onSuccess: (data) => setState({ artikel: data }),
  })
}

export const useCreateArticle = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: artikelApi.createArticle,
    onSuccess: () => {
      qc.invalidateQueries(["publicArticles"])
      qc.invalidateQueries(["myArticles"])
    },
  })
}

export const useUpdateArticle = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => artikelApi.updateArticle(id, data),
    onSuccess: () => {
      qc.invalidateQueries(["publicArticles"])
      qc.invalidateQueries(["myArticles"])
    },
  })
}

export const useDeleteArticle = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: artikelApi.deleteArticle,
    onSuccess: () => {
      qc.invalidateQueries(["publicArticles"])
      qc.invalidateQueries(["myArticles"])
    },
  })
}