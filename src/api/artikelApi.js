const API_BASE = "http://localhost:8000/api"; // alamat backend Django 

export const getArticles = async () => {
  const response = await fetch(`${API_BASE}/artikel/`);
  if (!response.ok) {
    throw new Error("Gagal mengambil artikel");
  }
  return await response.json();
};

export async function createArticle(data) {
  const token = localStorage.getItem("access"); // simpan waktu login
  const res = await fetch(`${API_BASE}/artikel/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // ⬅️ penting
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal membuat artikel");
  return res.json();
}

// UPDATE artikel
export async function updateArticle(id, data) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_BASE}/artikel/${id}/`, {
    method: "PUT", // bisa PATCH kalau mau sebagian field saja
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal update artikel");
  return res.json();
}

// DELETE artikel
export async function deleteArticle(id) {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_BASE}/artikel/${id}/`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Gagal hapus artikel");
  return true; // sukses hapus
}
