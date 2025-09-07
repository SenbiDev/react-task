import { API_BASE } from "./config";

export async function getTags() {
    const token = localStorage.getItem("access"); 
    const res = await fetch(`${API_BASE}/tag/`, {
        headers: {
        "Authorization": `Bearer ${token}`,
        }
    });
    const data = await res.json().catch(() => ([]));
    if (!res.ok) throw new Error(data.detail || "gagal fetch tag");
    return data;
}

export async function createTag(nama) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${API_BASE}/tag/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({ nama }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "gagal membuat tag");
}

export async function upadateTag(id, nama) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${API_BASE}/tag/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({ nama }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "gagal update tag");
}

export async function deleteTag(id) {
    const token = localStorage.getItem("access");
    const res = await fetch(`${API_BASE}/tag/${id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || "gagal delete tag");
}
