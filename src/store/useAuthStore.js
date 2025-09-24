import { create } from "zustand";
import * as authApi from "../axiosApi/auth";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: true, 
  error: null,

  init: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isLoading: false });
    } else {
      set({ user: null, isLoading: false });
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authApi.login(username, password);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.access) localStorage.setItem("access", data.access);
        if (data.refresh) localStorage.setItem("refresh", data.refresh);
        set({ user: data.user, isLoading: false });
      }
      return data.user;
    } catch (error) {
      set({ isLoading: false, error: error.message || "Login gagal" });
      throw error;
    }
  },

  register: async (username, email, password, password2) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authApi.register(username, email, password, password2);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        set({ user: data.user, isLoading: false });
      } else {
        set({ isLoading: false });
      }
      return data;
    } catch (error) {
      set({ isLoading: false, error: error.message || "Register gagal" });
      throw error;
    }
  },

  logout: () => {
    localStorage.clear();
    set({ user: null });
  },
}));