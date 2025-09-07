import React, { useEffect, useState } from "react";
import { getKategori, createKategori, updateKategori, deleteKategori } from "../api/kategori";
import { getTags, createTag, updateTag, deleteTag } from "../api/tags";
import { logout } from "../api/auntApi";

export default function AdminPage({ onLogout }) {
  const [kategoriList, setKategoriList] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [kategoriForm, setKategoriForm] = useState({ nama: "" });
  const [tagForm, setTagForm] = useState({ nama: "" });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const kategoriData = await getKategori();
      const tagData = await getTags();

      setKategoriList(Array.isArray(kategoriData) ? kategoriData : []);
      setTagList(Array.isArray(tagData) ? tagData : []);
    } catch (err) {
      console.error("Error load data", err);
      setErrorMsg("Gagal mengambil data, silahkan login ulang");
      logout();
      if (typeof onLogout === "function") onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 🔒 Proteksi role admin
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Akses ditolak! Halaman ini hanya untuk admin.");
      logout();
      if (typeof onLogout === "function") onLogout();
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetFormKategori = () => setKategoriForm({ nama: "" });
  const resetFormTag = () => setTagForm({ nama: "" });

  const handleSubmitKategori = async (e) => {
    e.preventDefault();
    if (!kategoriForm.nama.trim()) {
      alert("Nama kategori tidak boleh kosong!");
      return;
    }
    try {
      if (selectedKategori) {
        await updateKategori(selectedKategori.id, kategoriForm.nama.trim());
      } else {
        await createKategori(kategoriForm.nama.trim());
      }
      resetFormKategori();
      setSelectedKategori(null);
      loadData();
    } catch (err) {
      console.error("Error submit kategori:", err);
    }
  };

  const handleEditKategori = (kat) => {
    setSelectedKategori(kat);
    setKategoriForm({ nama: kat.nama });
  };

  const handleDeleteKategori = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kategori ini?")) return;
    await deleteKategori(id);
    loadData();
  };

  const handleSubmitTag = async (e) => {
    e.preventDefault();
    if (!tagForm.nama.trim()) {
      alert("Nama tag tidak boleh kosong!");
      return;
    }
    try {
      if (selectedTag) {
        await updateTag(selectedTag.id, tagForm.nama.trim());
      } else {
        await createTag(tagForm.nama.trim());
      }
      resetFormTag();
      setSelectedTag(null);
      loadData();
    } catch (err) {
      console.error("Error submit tag:", err);
    }
  };

  const handleEditTag = (tag) => {
    setSelectedTag(tag);
    setTagForm({ nama: tag.nama });
  };

  const handleDeleteTag = async (id) => {
    if (!window.confirm("Yakin ingin menghapus tag ini?")) return;
    await deleteTag(id);
    loadData();
  };

  return (
    <div className="min-h-screen bg-black p-8 font-sans text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <button
            onClick={() => {
              logout();
              if (typeof onLogout === "function") onLogout();
            }}
            className="bg-black text-white px-4 py-2 rounded-lg border"
          >
            Logout
          </button>
        </div>
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      </div>

      {/* Form Kategori */}
      <div className="bg-black p-6 rounded-xl shadow border mt-6">
        <h2 className="text-lg font-semibold mb-4">
          {selectedKategori ? "Edit Kategori" : "Tambah Kategori"}
        </h2>
        <form onSubmit={handleSubmitKategori} className="flex space-x-2">
          <input
            type="text"
            value={kategoriForm.nama}
            onChange={(e) =>
              setKategoriForm({ ...kategoriForm, nama: e.target.value })
            }
            placeholder="Nama kategori"
            className="w-full border px-3 py-2 rounded text-black"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg border"
          >
            {selectedKategori ? "Update" : "Simpan"}
          </button>
          {selectedKategori && (
            <button
              type="button"
              onClick={() => {
                setSelectedKategori(null);
                resetFormKategori();
              }}
              className="bg-black text-white px-4 py-2 rounded-lg border"
            >
              Batal
            </button>
          )}
        </form>
      </div>

      {/* Tabel Kategori */}
      <div className="bg-white p-6 rounded-xl shadow border text-black mt-6">
        <h2 className="text-lg font-semibold mb-4">Daftar Kategori</h2>
        {loading ? (
          <p>Loading...</p>
        ) : kategoriList.length === 0 ? (
          <p className="text-gray-500">Belum ada kategori</p>
        ) : (
          <ul className="space-y-2">
            {kategoriList.map((k) => (
              <li
                key={k.id}
                className="flex justify-between items-center opacity-100"
              >
                <span>{k.nama}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditKategori(k)}
                    className="px-3 py-1 text-sm bg-black text-white rounded"
                    disabled={!!selectedKategori} // 🛠 disable kalau sedang edit
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteKategori(k.id)}
                    className="px-3 py-1 text-sm bg-black text-white rounded"
                    disabled={!!selectedKategori} // 🛠 disable kalau sedang edit
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form Tag */}
      <div className="bg-black p-6 rounded-xl shadow border mt-6">
        <h2 className="text-lg font-semibold mb-4">
          {selectedTag ? "Edit Tag" : "Tambah Tag"}
        </h2>
        <form onSubmit={handleSubmitTag} className="flex space-x-2">
          <input
            type="text"
            value={tagForm.nama}
            onChange={(e) =>
              setTagForm({ ...tagForm, nama: e.target.value })
            }
            placeholder="Nama tag"
            className="w-full border px-3 py-2 rounded text-black"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg border"
          >
            {selectedTag ? "Update" : "Simpan"}
          </button>
          {selectedTag && (
            <button
              type="button"
              onClick={() => {
                setSelectedTag(null);
                resetFormTag();
              }}
              className="bg-black text-white px-4 py-2 rounded-lg border"
            >
              Batal
            </button>
          )}
        </form>
      </div>

      {/* Tabel Tag */}
      <div className="bg-white p-6 rounded-xl shadow border text-black mt-6">
        <h2 className="text-lg font-semibold mb-4">Daftar Tag</h2>
        {loading ? (
          <p>Loading...</p>
        ) : tagList.length === 0 ? (
          <p className="text-gray-500">Belum ada tag</p>
        ) : (
          <ul className="space-y-2">
            {tagList.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center opacity-100"
              >
                <span>{t.nama}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditTag(t)}
                    className="px-3 py-1 text-sm bg-black text-white rounded"
                    disabled={!!selectedTag} // 🛠 disable kalau sedang edit
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTag(t.id)}
                    className="px-3 py-1 text-sm bg-black text-white rounded"
                    disabled={!!selectedTag} // 🛠 disable kalau sedang edit
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
