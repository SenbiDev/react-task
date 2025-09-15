import api from "./apiConfig";

export async function getArtikelList() {
  try {
    const res = await api.get("artikel/");
    return res.data.result || [];
  } catch (error) {
    console.error("Gagal fetch artikel:", error);
    throw error;
  }
}

export async function getArtikelById(id) {
  try {
    const res = await api.get(`artikel/${id}/`);
    return res.data
  } catch (error) {
    console.error("Gagal fetch detail artikel:", error);
    throw error;
  }
}

export async function createArticle(payload) {
  try {
    const res = await api.post("artikel/", payload);
    return res.data
  } catch (error) {
    console.error("Gagal membuat artikel:", error);
    throw error;
  }
}

export async function updateArticle(id, payload) {
  try {
    const res = await api.put(`artikel/${id}/`);
    return res.data
  } catch (error) {
    console.error("Gagal update artikel:", error);
    throw error;
  }
}

export async function deleteArticle(id) {
  try {
    await api.delete(`artikel/${id}/`);
    return true;
  } catch (error) {
    console.error("Gagal hapus artikel:", error);
    throw error;
  }
}

export async function getPublicArticles() {
  try {
    const res = await api.get("public/artikel/");
    return res.data.result || [];
  } catch (error) {
    console.error("Gagal fetch artikel publik:", error);
    throw error;
  }
}
export async function getMyArticles() {
  try {
    const res = await api.get("artikel/");
    const data = res.data;
    const user = JSON.parse(localStorage.getItem("user"));

    const articles = data.result || [];

    return articles.filter((a) => a.penulis?.id === user?.id);
  } catch (error) {
    console.error("Gagal fetch artikel saya:", error);
    throw error;
  }
}