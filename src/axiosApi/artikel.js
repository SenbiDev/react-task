import api from "./apiConfig";

export async function getArtikelList() {
    try {
        const res = await api.get("artikel/");
        return res.data.results || [];
    } catch (error) {
        console.error("Gagal memuat artikel", error)
        throw error;
    }
}
export async function createArtikel(payload) {
    try {
        const res = await api.post("artikel/", payload);
        return res.data;
    } catch (error) {
        console.error("Gagal buat artikel", error)
        throw error;
    }
}
export async function updateArtikel(id, payload) {
    try {
        const res = await api.put(`artikel/${id}/`, payload);
        return res.data;
    } catch (error) {
        console.error("Gagal update artikel", error)
        throw error;
    }
}
export async function deleteArtikel(id) {
    try {
        const res = await api.delete(`artikel/${id}/`);
        return res.data;
    } catch (error) {
        console.error("Gagal hapus artikel", error)
        throw error;
    }
}

export async function getPublikArtikels() {
    try {
        const res = await api.get("public/artikel/");
        return res.data.results || [];
    } catch (error) {
        console.error("Gagal memuat artikel publik", error)
        throw error;
    }
}
export async function getMyArtikels() {
    try {
        const res = await api.get("artikel/");
        const data = res.data;
        const user = JSON.parse(localStorage.getItem("user"));

        const artikels = data.results || [];

        return artikels.filter((a) => a.penulis?.id === user?.id);
    } catch (error) {
        console.error("Gagal memuat artikel saya", error)
        throw error;
    }
}
export async function getArtikelById(id) {
    try {
        const res = await api.get(`artikel/${id}/`);
        return res.data;
    } catch (error) {
        console.error("Gagal memuat artikel detail", error)
        throw error;
    }
}