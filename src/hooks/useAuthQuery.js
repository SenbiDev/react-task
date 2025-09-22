// hooks/useAuthQuery.js
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser, logout } from "../axiosApi/authApi";

// Login
export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}

// Register
export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
  });
}

// Logout
export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
