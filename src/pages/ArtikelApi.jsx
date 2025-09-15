import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";   
import ArtikelForm from "../components/ArtikelForm";
import KategoriTags from "../components/KategoriTags";

import {
  getPublicArticles,
  getMyArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../axiosApi/artikel";
import {
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from "../axiosApi/kategori";
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from "../axiosApi/tags";

export default function ArtikelApi() {
  const { user } = useAuth();   
  const role = user?.role || "user"; 

  // ==== state data ====
  const [publicArtikel, setPublicArtikel] = useState([]);
  const [myArtikel, setMyArtikel] = useState([]);
  const [artikelEdit, setArtikelEdit] = useState(null);
  const [kategoriList, setKategoriList] = useState([]);
  const [tagList, setTagList] = useState([]);

  // Load data saat mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setPublicArtikel(await getPublicArticles());
      setMyArtikel(await getMyArticles());
      setKategoriList(await getKategori());
      setTagList(await getTags());
    } catch (err) {
      console.error("Gagal load data:", err);
    }
  };

  // ===== artikel handlers =====
  const handleSaveArtikel = async (payloadFromForm) => {
    try {
      const payload = {
        ...payloadFromForm,
        penulis_id: user?.id,   
      };

      if (artikelEdit?.id) {
        await updateArticle(artikelEdit.id, payload);
        alert("Artikel berhasil diupdate");
      } else {
        await createArticle(payload);
        alert("Artikel berhasil dibuat");
      }
      setArtikelEdit(null);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus artikel ini?")) return;
    await deleteArticle(id);
    alert("Artikel dihapus");
    loadData();
  };

  const handleEdit = (artikel) => setArtikelEdit(artikel);
  const cancelEdit = () => setArtikelEdit(null);

  // ===== kategori & tag (CRUD) =====
  const handleAddKategori = async (nama) => {
    await createKategori(nama);
    loadData();
  };
  const handleAddTag = async (nama) => {
    await createTag(nama);
    loadData();
  };
  const handleDeleteKategori = async (id) => {
    if (!window.confirm("Yakin hapus kategori?")) return;
    await deleteKategori(id);
    loadData();
  };
  const handleDeleteTag = async (id) => {
    if (!window.confirm("Yakin hapus tag?")) return;
    await deleteTag(id);
    loadData();
  };
  const handleUpdateKategori = async (id, nama) => {
    if (!nama.trim()) return;
    await updateKategori(id, nama);
    loadData();
  };
  const handleUpdateTag = async (id, nama) => {
    if (!nama.trim()) return;
    await updateTag(id, nama);
    loadData();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">
        Dashboard ({role})
      </h2>

      {/* ================= FORM ARTIKEL ================= */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {artikelEdit ? "Edit Artikel" : "Tambah Artikel"}
        </h3>
        <ArtikelForm
          kategori={kategoriList}
          tags={tagList}
          artikelEdit={artikelEdit}
          onSubmit={handleSaveArtikel}
          onCancel={cancelEdit}
        />
      </div>

      {/* ================= ADMIN: KELOLA KATEGORI & TAGS ================= */}
      {role === "admin" && (
        <KategoriTags
          kategori={kategoriList}
          tags={tagList}
          onCreateKategori={handleAddKategori}
          onUpdateKategori={handleUpdateKategori}
          onDeleteKategori={handleDeleteKategori}
          onCreateTag={handleAddTag}
          onUpdateTag={handleUpdateTag}
          onDeleteTag={handleDeleteTag}
        />
      )}

      {/* ================= LIST ARTIKEL SAYA ================= */}
      <div className="bg-gray-800 p-4 rounded mb-6 mt-6">
        <h3 className="text-xl font-semibold mb-2">Artikel Saya</h3>
        {myArtikel.length === 0 ? (
          <p className="text-gray-400">Belum ada artikel.</p>
        ) : (
          <ul className="space-y-3">
            {myArtikel.map((a) => (
              <li
                key={a.id}
                className="bg-gray-900 p-3 rounded flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold">{a.judul}</h4>
                  <p className="text-sm text-gray-400">
                    Status: {a.status} | Kategori: {a.kategori?.nama || "-"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(a)}
                    className="bg-blue-500 px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-600 px-2 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ================= LIST ARTIKEL PUBLIK ================= */}
      {role === "admin" && (
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Artikel Publik</h3>
          {publicArtikel.length === 0 ? (
            <p className="text-gray-400">Belum ada artikel publik.</p>
          ) : (
            <ul className="space-y-3">
              {publicArtikel.map((a) => {
                const isOwner = user?.id === a.penulis?.id;
                const isAdmin = role === "admin";
                return (
                  <li
                    key={a.id}
                    className="bg-gray-900 p-3 rounded flex justify-between items-start"
                  >
                    <div>
                      <h4 className="font-bold">{a.judul}</h4>
                      <p className="text-gray-300">{a.konten}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Penulis:{" "}
                        {a.penulis?.username || a.penulis?.name || "-"} | Kategori:{" "}
                        {a.kategori?.nama || "-"} | Tags:{" "}
                        {a.tags?.map((t) => t.nama).join(", ") || "-"}
                      </p>
                    </div>
                    {(isOwner || isAdmin) && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(a)}
                          className="bg-blue-500 px-2 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="bg-red-600 px-2 py-1 rounded text-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}