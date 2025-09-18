import { useMutation } from "@tanstack/react-query";
import { login, register } from "../axiosApi/auth";

export function useLogin() {
    return useMutation({
        mutationFn: ({ username, password }) => login(username, password),
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: ({ username, email, password, password2 }) => register(username, email, password, password2),
    });
}