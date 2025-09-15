// kategori.js
import api from "./apiConfig";

export async function getKategori() {
  const res = await api.get("kategori/");
  return res.data;
}

export async function createKategori(nama) {
  const res = await api.post("kategori/", { nama });
  return res.data;
}

export async function updateKategori(id, nama) {
  const res = await api.put(`kategori/${id}/`, { nama });
  return res.data;
}

export async function deleteKategori(id) {
  await api.delete(`kategori/${id}/`);
  return true;
}
