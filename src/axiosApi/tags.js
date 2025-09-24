import api from "./apiConfig";

export async function getTags() {
  const res = await api.get("tags/");
  return res.data;
}

export async function createTag(payload) {
  try {
    const res = await api.post("tags/", payload);
    return res.data;
  } catch (error) {
    console.error("Gagal membuat tag:", error.response?.data || error.message);
    throw error;
  }
}

export async function updateTag(id, payload) {
  try {
    const res = await api.put(`tags/${id}/`, payload);
    return res.data;
  } catch (error) {
    console.error("Gagal update tag:", error.response?.data || error.message);
    throw error;
  }
}

export async function deleteTag(id) {
  try {
    await api.delete(`tags/${id}/`);
    return true;
  } catch (error) {
    console.error("Gagal hapus tag:", error.response?.data || error.message);
    throw error;
  }
}