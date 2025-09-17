// tags.js
import api from "./apiConfig";

// GET 
export async function getTags() {
  try {
  const res = await api.get("tags/");
  return res.data.results || res.data;
  } catch (error) {
    console.error("gagal fetch tag:", error);
    throw error;
  }
}
// POST
export async function createTag(nama) {
  try {
  const res = await api.post("tags/", { nama });
  return res.data;
  } catch (error) {
    console.error("gagal post tag:", error);
    throw error;
  }
}

// PUT 
export async function updateTag(id, nama) {
  try {
  const res = await api.put(`tags/${id}/`, { nama });
  return res.data;
  } catch (error) {
    console.error("gagal edit tag:", error);
    throw error;
  }
}

// DELETE
export async function deleteTag(id) {
  try {
  await api.delete(`tags/${id}/`);
  return true;
  } catch (error) {
    console.error("gagal delete tag:", error);
    throw error;
  }
}
