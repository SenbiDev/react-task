// auth.js
import api from "./apiConfig";

export async function login(username, password) {
  try {
    const res = await api.post("login/", {
      username,
      password,
    });

    const data = res.data;

    if (data.access) localStorage.setItem("access", data.access);
    if (data.refresh) localStorage.setItem("refresh", data.refresh);
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
