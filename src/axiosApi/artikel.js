import api from "./apiConfig";


function buildQuery (params={}){
    const query = new URLSearchParams()
    Object.entries(params).forEach(([Key, value]) => {
        if(Array.isArray(value)&&value.length>0){
            value.forEach((v) => query.append(Key, v))
        } else if(value != null && value !== ""){
            query.append(Key, value)
        }
    })
    return query.toString()
}

export async function getArtikelList({page=1, search="", kategori=null, tags=[]}={}) {
    try {
        const res = await api.get(`artikel/?${buildQuery({page, search, kategori, tag:tags})}`);
        return res.data || {count:0, pages:1, results:[]};
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

export async function getPublikArtikels({page=1, kategori=null, tags=[]} = {}) {
    try {
        const res = await api.get(`public/artikel/?${buildQuery({page, kategori, tag:tags})}`);
        return res.data || {count:0, pages:1, current_page:1, results:[]};
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