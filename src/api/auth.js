import { BASE_URL } from "./apiConfig";

export async function login(username, password) {
  try {
    const res = await fetch(BASE_URL + "login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "Login gagal");

    // simpan ke localStorage di sini agar sinkron dengan AuthContext
    if (data.access) {
      localStorage.setItem("access", data.access);
    }
    if (data.refresh) {
      localStorage.setItem("refresh", data.refresh);
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data; // {access, refresh, user}
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function register(username, email, password, password2) {
  try {
    const res = await fetch(BASE_URL + "register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, password2 }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || data.error || "Register gagal");

    // beberapa API register langsung balikin user
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}