import { create } from "zustand";
import * as authApi from "../axiosApi/auth";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  avatarUrl: null,
  isLoading: false,
  error: null,

  // 🌗 Theme global state
  theme: localStorage.getItem("theme") || "light",

  // Setter theme global (update localStorage + <html data-theme>)
  setTheme: (mode) => {
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
    set({ theme: mode });
  },

  // 🔄 Inisialisasi user dari localStorage
  init: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isLoading: false });
    } else {
      set({ user: null, isLoading: false });
    }
  },

  // 🔐 Login API
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

  // 📝 Register API
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

  // 🚪 Logout
  logout: () => {
    localStorage.clear();
    set({ user: null, avatarUrl: null });
  },

  // 🖼️ Set avatar URL user
  setAvatarUrl: (url) => {
    set({ avatarUrl: url });
  },
}));