import { API_URL } from "./config";

export async function getKategori() {
    const token = localStorage.getItem("access");
    const res = await fetch(`${API_BASE}kategori/`, {
        headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await res.json().catch(() => ([]));
    if (!res.ok) throw new Error(data.detail || "gagal ambil kategori");
    return data;
}

export async function createKategori(nama) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${API_BASE}kategori/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({ nama }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "gagal membuat kategori");
}

export async function updateKategori(id, nama) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${API_BASE}kategori/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({ nama }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "gagal update kategori");
}

export async function deleteKategori(id) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${API_BASE}kategori/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "gagal delete kategori");
}