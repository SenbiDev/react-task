import api from "./apiConfig";

export async function getTags() {
  try {
    const res = await api.get("tags/");
    return res.data;
  } catch (error) {
    console.error("Gagal fetch tag:", error);
    throw error;
  }
}
export async function createTag(nama) {
  try {
    const res = await api.post("tags/", { nama });
    return res.data;
  } catch (error) {
    console.error("Gagal membuat tag:", error);
    throw error;
  }
}
export async function updateTag(id, nama) {
  try {
    const res = await api.put(`tags/${id}/`, { nama });
    return res.data;
  } catch (error) {
    console.error("Gagal update tag:", error);
    throw error;
  }
}
export async function deleteTag(id, nama) {
  try {
    await api.delete(`tags/${id}/`, { nama });
    return true;
  } catch (error) {
    console.error("Gagal hapus tag:", error);
    throw error;
  }
}