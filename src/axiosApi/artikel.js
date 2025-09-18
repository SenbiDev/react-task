import api from "./apiConfig";

export async function getArtikelList() {
  try {
    const res = await api.get("artikel/");
    const data = res.data;
    return data.results || [];
  } catch (error) {
    console.error("Gagal fetch artikel:", error);
    throw error;
  }
}

export async function createArticle(payload) {
  try {
    const res = await api.post("artikel/", payload);
    return res.data;
  } catch (error) {
    console.error("Gagal membuat artikel:", error);
    throw error;
  }
}