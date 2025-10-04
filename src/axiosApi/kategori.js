import api from "./apiConfig";

export async function getKategori() {
  const res = await api.get("kategori/");
  return res.data;
}

export async function createKategori(payload) {
  try {
    const res = await api.post("kategori/", payload);
    return res.data;
  } catch (error) {
    console.error("Gagal membuat kategori:", error.response?.data || error.message);
    throw error;
  }
}

export async function updateKategori(id, payload) {
  try {
    const res = await api.put(`kategori/${id}/`, payload);
    return res.data;
  } catch (error) {
    console.error("Gagal update kategori:", error.response?.data || error.message);
    throw error;
  }
}

export async function deleteKategori(id) {
  try {
    await api.delete(`kategori/${id}/`);
    return true;
  } catch (error) {
    console.error("Gagal hapus kategori:", error.response?.data || error.message);
    throw error;
  }
}