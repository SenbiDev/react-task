import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getTags, createTag, updateTag, deleteTag } from "../axiosApi/tags"
import { useTagStore } from "../store/useTagStore"

export function useTagList() {
  const setState = useTagStore.setState
  return useQuery({
    queryKey: ["tagList"],
    queryFn: getTags,
    onSuccess: (data) => setState({ tags: data }),
  })
}

export function useCreateTag() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (nama) => createTag(nama),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tagList"] })
    },
  })
}

export function useUpdateTag() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, nama }) => updateTag(id, nama),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tagList"] })
    },
  })
}

export function useDeleteTag() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteTag(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tagList"] })
    },
  })
}