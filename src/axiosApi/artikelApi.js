// artikelApi.js
import api from "./apiConfig";

// GET
export async function getArticles() {
  const res = await api.get("artikel/");
  return res.data.results || res.data;
}

// POST
export async function createArticle(data) {
  const res = await api.post("artikel/", data);
  return res.data;
}

// PUT
export async function updateArticle(id, data) {
  const res = await api.put(`artikel/${id}/`, data);
  return res.data;
}

// DELETE
export async function deleteArticle(id) {
  await api.delete(`artikel/${id}/`);
  return true;
}
