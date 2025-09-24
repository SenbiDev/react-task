import { useMutation } from "@tanstack/react-query"
import { login, register } from "../axiosApi/auth"
import { useAuthStore } from "../store/useAuthStore"

export function useLogin() {
  const setState = useAuthStore.setState
  return useMutation({
    mutationFn: ({ username, password }) => login(username, password),
    onSuccess: (data) => {
      if (data.user) {
        setState({ user: data.user })
        localStorage.setItem("user", JSON.stringify(data.user))
      }
    },
  })
}

export function useRegister() {
  const setState = useAuthStore.setState
  return useMutation({
    mutationFn: ({ username, email, password, password2 }) =>
      register(username, email, password, password2),
    onSuccess: (data) => {
      if (data.user) {
        setState({ user: data.user })
        localStorage.setItem("user", JSON.stringify(data.user))
      }
    },
  })
}