// artikelApi.js
import api from "./apiConfig";

// GET
export async function getArticles() {
  try {
    const res = await api.get("artikel/");
    return res.data.results || res.data;
  } catch (error) {
    console.error("Gagal fetch artikel:", error);
    throw error;
  }
}

// POST
export async function createArticle(data) {
  try {
    const res = await api.post("artikel/", data);
    return res.data;
  } catch (error) {
    console.error("Gagal membuat artikel:", error);
    throw error;
  }
}

// PUT
export async function updateArticle(id, data) {
  try {
    const res = await api.put(`artikel/${id}/`, data);
    return res.data;
  } catch (error) {
    console.error("Gagal update artikel:", error);
    throw error;
  }
}

// DELETE
export async function deleteArticle(id) {
  try {
    await api.delete(`artikel/${id}/`);
    return true;
  } catch (error) {
    console.error("Gagal hapus artikel:", error);
    throw error;
  }
}
