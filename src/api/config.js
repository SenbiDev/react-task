export const API_URL = "http://127.0.0.1:8000/api";

export function getAuthHeader() {
    const token = localStorage.getItem("access");
    return token ? { "Authorization" : `Bearer ${token}` } : {};
}

export async function refreshToken() {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;

    try {
        const res = await fetch(`${API_URL}token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body:JSON.stringify({ refresh }),
        });
        if (!res.ok) throw new Error("gagal refresh token");
        const data = await res.json();
        if (data.access) {
            localStorage.setItem("access", data.access);
            return data.access;
        }
        return null;
    } catch (err) {
        console.error("refresh token error", err);
        return null;
    }
}