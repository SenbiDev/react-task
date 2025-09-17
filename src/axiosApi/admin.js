import api from "./apiConfig";

export async function getKategori() {
    try {
        const res = await api.get("kategori/");
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Gagal memuat kategori")
    }
}
export async function createKategori(nama) {
    try {
        const res = await api.post("kategori/", { nama });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Gagal membuat kategori")
    }
}
export async function updateKategori(id, nama) {
    try {
        const res = await api.put(`kategori/${id}/`, { nama });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Gagal update kategori")
    }
}
export async function deleteKategori(id) {
    try {
        const res = await api.delete(`kategori/${id}/`);
        return res.data;
    } catch (error) {
        console.error("Gagal hapus kategori", error)
        throw error;
    }
}


export async function getTags() {
    try {
        const res = await api.get("tags/");
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Gagal memuat tag")
    }
}
export async function createTag(nama) {
    try {
        const res = await api.post("tags/", { nama });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Gagal membuat tag")
    }
}
export async function updateTag(id, nama) {
    try {
        const res = await api.put(`tags/${id}/`, { nama });
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Gagal update tag")
    }
}
export async function deleteTag(id) {
    try {
        const res = await api.delete(`tags/${id}/`);
        return res.data;
    } catch (error) {
        console.error("Gagal hapus tag", error)
        throw error;
    }
}