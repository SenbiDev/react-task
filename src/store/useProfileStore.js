import { create } from "zustand";

const safeGet = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        return null;
    }
};

export const useProfileStore = create((set) => ({
    user: safeGet("user") || { username: "Guest", role: "visitor" },
    avatarUrl: localStorage.getItem("avatarUrl") || null,
    website: localStorage.getItem("website") || "",

    theme: localStorage.getItem("theme") || "light",

    setTheme: (mode) => {
        localStorage.setItem("theme", mode);
        if (mode === "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        set({ theme: mode });
    },

    setProfile: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },

    setAvatarUrl: (url) => {
        if (url) localStorage.setItem("avatarUrl", url);
        else localStorage.removeItem("avatarUrl");
        set({ avatarUrl: url });
    },

    clearProfile: () => {
        localStorage.clear();
        set({
        user: { username: "Guest", role: "visitor" },
        avatarUrl: null,
        website: "",
        theme: "light",
        });
    },
}));