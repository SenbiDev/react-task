import { useMutation } from "@tanstack/react-query";
import { login } from "../axiosApi/auth";

export function useLogin() {
  return useMutation({
    mutationFn: ({ username, password }) => login(username, password),
  });
}
