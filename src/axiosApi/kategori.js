// kategori.js
import api from "./apiConfig";

export async function getKategori() {
  try {
  const res = await api.get("kategori/");
  return res.data.results || res.data;
  } catch (error) {
    console.error("gagal fetch kategori:", error);
    throw error;
  }
}

export async function createKategori(nama) {
  try {
  const res = await api.post("kategori/", { nama });
  return res.data;
  } catch (error) {
    console.error("gagal post kategori:", error);
    throw error;
  }
}
export async function updateKategori(id, nama) {
  try {
  const res = await api.put(`kategori/${id}/`, { nama });
  return res.data;
  } catch (error) {
    console.error("gagal edit kategori:", error);
    throw error;
  }
}

export async function deleteKategori(id) {
  try {
  await api.delete(`kategori/${id}/`);
  return true;
  } catch (error) {
    console.error("gagal post kategori:", error);
    throw error;
  }
}
