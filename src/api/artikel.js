import App from "../App";
import { refreshToken, logout } from "./auth";

const API_URL = "http://127.0.0.1:8000/api";

function getAuthHeader() {
    const token = localStorage.getItem("access");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchWithAuth(url, options = {}) {
    try{
        let res = await fetch(url, {
            ...options,
            headers:{
                "Content-Type": "application/json",
                ...getAuthHeader(),
                ...options.headers,
            },
        });
        
        if (res.status === 401){
            try{
                const newToken = await refreshToken();
                res = await fetch (url, {
                    ...options,
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${newToken}`,
                        ...options.headers,
                    },
                });
            } catch (err) {
                logout();
                throw new Error("Sesi habis")
            }
        }

        if (!res.ok) throw new Error("Request gagal");
        if (res.status === 204) return {};
        return await res.json();
    } catch (err) {
        console.error("Fetch error", err);
        throw err;
    }
}

export function fetchArtikel({status, kategori, tag, penulis, page} = {}) {
    let query = [];
    if (status) query.push(`status=${status}`);
    if (kategori) query.push(`kategori=${kategori}`);
    if (tag) query.push(`tag=${tag}`);
    if (penulis) query.push(`penulis=${penulis}`);
    if (page) query.push(`page=${page}`);
    const url = `${API_URL}/artikel/${query.length ? "?" + query.join("&") : ""}`;
    return fetchWithAuth(url);
}

export function createArtikel(data) {
    return fetchWithAuth(`${API_URL}api/artikel/`,{
        method: "POST",
        headers:{
                "Content-Type": "application/json",
                ...getAuthHeader(),
        },
        body: JSON.stringify(data),
    });
}

export function updateArtikel(id, data) {
    return fetchWithAuth(`${API_URL}api/artikel/${id}/`, {
        method: "PUT",
        headers:{
                "Content-Type": "application/json",
                ...getAuthHeader(),
        },
        body: JSON.stringify({
            judul: data.judul,
            konten: data.konten,
            kategori: data.kategori,
            tag: data.tag,
            status: data.status,
        })
    });
}

export function deleteArtikel(id) {
    return fetchWithAuth(`${API_URL}api/artikel/${id}/`, {
        method: "DELETE",
    });
}

export function fetchPublicArtikel({ kategori, tag, page }) {
    let query = [];
    if (kategori) query.push(`kategori=${kategori}`);
    if (tag) query.push(`tag=${tag}`);
    if (page) query.push(`page=${page}`);
    const url = `${API_URL}api/public/artikel/${query.length ? "?" + query.join("&") : ""}`;
    return fetchWithAuth(url);
}

export function fetchPublicArtikelDetail(id) {
    return fetchWithAuth(`${API_URL}api/artikel/${id}/`);
}

export function fecthKategori() {
    return fetchWithAuth(`${API_URL}kategori/`);
}
export function fecthTag() {
    return fetchWithAuth(`${API_URL}tag/`);
}