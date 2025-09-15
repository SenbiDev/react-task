// artikel.js
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
