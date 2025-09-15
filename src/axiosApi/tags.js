// tags.js
import api from "./apiConfig";

// GET semua tags
export async function getTags() {
  const res = await api.get("tags/");
  return res.data;
}

// POST buat tag baru
export async function createTag(nama) {
  const res = await api.post("tags/", { nama });
  return res.data;
}

// PUT update tag
export async function updateTag(id, nama) {
  const res = await api.put(`tags/${id}/`, { nama });
  return res.data;
}

// DELETE hapus tag
export async function deleteTag(id) {
  await api.delete(`tags/${id}/`);
  return true;
}
