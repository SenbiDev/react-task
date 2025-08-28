const URL = "http://127.0.0.1:8000/";

export async function login(username, password) {
    const res = await fetch(`${URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "applications/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Login gagal");
    return res.json();
}

export async function register(data) {
    const res = await fetch(`${URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "applications/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Registrasi gagal");
    return res.json();
}

export async function refreshToken() {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) throw new Error();

    const res = await fetch(`${URL}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "applications/json" },
        body: JSON.stringify({refresh}),
    });
    if (!res.ok) throw new Error("Refresh gagal");
    const data = await res.json();
    localStorage.setItem("access". data.access);
    return data.access;
}

export function logout(){
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href="/login";
}