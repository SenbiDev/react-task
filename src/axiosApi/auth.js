import api from "./apiConfig";

export async function login(username, password) {
    try {
        const res = await api.post("login/", { username, password });
        const data = res.data;

        if (data.access) localStorage.setItem("access", data.access);
        if (data.refresh) localStorage.setItem("refresh", data.refresh);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        return data;
    } catch (error) {
        const msg = error.response?.data?.detail || "Login gagal";
        console.error("Login error:", msg);
        throw new Error(msg);
    }
}

export async function register(username, email, password, password2) {
    try {
        const res = await api.post("register/", { username, email, password, password2 });
        const data = res.data;

        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }

        return data;
    } catch (error) {
        const msg = error.response?.data?.detail || "Registrasi gagal";
        console.error("Registrasi error:", msg);
        throw new Error(msg);
    }
}