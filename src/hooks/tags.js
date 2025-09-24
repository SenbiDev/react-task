import { useEffect } from "react"
import { useTagStore } from "../store/useTagStore"

export function useTagList() {
  const { tags, fetchTags, isLoading, error } = useTagStore()

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  return { tags, isLoading, error }
}

export function useCreateTag() {
  const { addTag, error } = useTagStore()
  return { addTag, error }
}

export function useUpdateTag() {
  const { updateTag, error } = useTagStore()
  return { updateTag, error }
}

export function useDeleteTag() {
  const { deleteTag, error } = useTagStore()
  return { deleteTag, error }
}