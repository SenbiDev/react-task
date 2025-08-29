import React, { useEffect, useState } from "react";
import { getArticles, createArticle, updateArticle, deleteArticle } from "../api/artikelApi";

const ArtikelPage = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({ judul: "", konten: "", draft: false });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.judul || !formData.konten) {
      alert("Judul dan konten wajib diisi");
      return;
    }

    try {
      if (editId) {
        await updateArticle(editId, formData); // PUT
        setEditId(null);
      } else {
        await createArticle(formData); // POST
      }
      setFormData({ judul: "", konten: "", draft: false });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau hapus artikel ini?")) {
      try {
        await deleteArticle(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (article) => {
    setFormData({
      judul: article.judul,
      konten: article.konten,
      draft: article.draft,
    });
    setEditId(article.id);
  };

  return (
    <div className="container">
      <h1>Manajemen Artikel</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul"
          value={formData.judul}
          onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
        />
        <br />
        <textarea
          placeholder="Konten"
          value={formData.konten}
          onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
        />
        <br />
        <label>
          <input
            type="checkbox"
            checked={formData.draft}
            onChange={(e) => setFormData({ ...formData, draft: e.target.checked })}
          />
          Draft
        </label>
        <br />
        <button type="submit">{editId ? "Update" : "Simpan"}</button>
      </form>

      <h2>Daftar Artikel</h2>
      {articles.length === 0 ? (
        <p>Belum ada artikel.</p>
      ) : (
        <ul>
          {articles.map((a) => (
            <li key={a.id}>
              <strong>{a.judul}</strong> {a.draft && "(Draft)"}
              <button onClick={() => handleEdit(a)}>Edit</button>
              <button onClick={() => handleDelete(a.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtikelPage;
