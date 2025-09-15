import api from "./apiConfig";

export async function getKategori() {
  try {
    const res = await api.get("kategori/");
    return res.data;
  } catch (error) {
    console.error("Gagal fetch kategori:", error);
    throw error;
  }
}
export async function createKategori(nama) {
  try {
    const res = await api.post("kategori/", { nama });
    return res.data;
  } catch (error) {
    console.error("Gagal membuat kategori:", error);
    throw error;
  }
}
export async function updateKategori(id, nama) {
  try {
    const res = await api.put(`kategori/${id}/`, { nama });
    return res.data;
  } catch (error) {
    console.error("Gagal update kategori:", error);
    throw error;
  }
}
export async function deleteKategori(id, nama) {
  try {
    await api.delete(`kategori/${id}/`, { nama });
    return true;
  } catch (error) {
    console.error("Gagal hapus kategori:", error);
    throw error;
  }
}