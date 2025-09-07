import { useState, useEffect } from "react";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../api/artikelApi";
import { logout } from "../api/auntApi";
import { getTags } from "../api/tags";
import { getKategori } from "../api/kategori";

export default function ArtikelPage({ onLogout }) {
  const [artikels, setArtikels] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    judul: "",
    konten: "",
    kategori: "",
    tags: [],
    status: "draft",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // user & role dari localStorage
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const role = localStorage.getItem("role") || "user";

  // ambil data awal
  const loadData = async () => {
    try {
      setLoading(true);
      const artikelData = await getArticles("http://127.0.0.1:8000/api/artikel/");
      const kategoriData = await getKategori();
      const tagData = await getTags();

      setArtikels(Array.isArray(artikelData) ? artikelData : artikelData?.result || []);
      setKategoriList(Array.isArray(kategoriData) ? kategoriData : kategoriData?.result || []);
      setTagList(Array.isArray(tagData) ? tagData : tagData?.result || []);
    } catch (err) {
      console.error("Error load data:", err);
      setErrorMsg("Gagal mengambil data, silakan login ulang.");
      logout();
      if (typeof onLogout === "function") onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () =>
    setForm({ judul: "", konten: "", kategori: "", tags: [], status: "draft" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        await updateArticle(selected.id, form);
      } else {
        await createArticle(form);
      }
      resetForm();
      setSelected(null);
      loadData();
    } catch (err) {
      console.error("Error submit:", err);
    }
  };

  const handleEdit = (artikel) => {
    setSelected(artikel);
    setForm({
      judul: artikel.judul,
      konten: artikel.konten,
      kategori: artikel.kategori?.id?.toString() || "",
      tags: artikel.tags?.map((t) => t.id) || [],
      status: artikel.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;
    await deleteArticle(id);
    loadData();
  };

  // filter artikel
  const myArtikel = artikels.filter((a) => a.author?.id === currentUser?.id);
  const publicArtikel = artikels.filter((a) => a.status === "published");

  // cek izin edit/hapus
  const canManage = (artikel) => {
    return role === "admin" || artikel.author?.id === currentUser?.id;
  };

  return (
    <div className="min-h-screen bg-black p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Dashboard Artikel</h1>
          <button
            onClick={() => {
              logout();
              if (typeof onLogout === "function") onLogout();
            }}
            className="bg-black hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        {/* Form Artikel */}
        <div className="bg-black p-6 rounded-xl shadow border text-white">
          <h2 className="text-lg font-semibold mb-4">
            {selected ? "Edit Artikel" : "Tambah Artikel"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="col-span-2">
              <label className="block mb-1 font-medium">Judul</label>
              <input
                type="text"
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                className="w-full border px-3 py-2 rounded text-black"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium">Konten</label>
              <textarea
                value={form.konten}
                onChange={(e) => setForm({ ...form, konten: e.target.value })}
                className="w-full border px-3 py-2 rounded text-black"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Kategori</label>
              <select
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                className="w-full border px-3 py-2 rounded text-black"
              >
                <option value="">Pilih kategori</option>
                {Array.isArray(kategoriList) &&
                  kategoriList.map((kat) => (
                    <option key={kat.id} value={kat.id}>
                      {kat.nama}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Tag</label>
              <div className="space-y-2 text-white">
                {tagList.map((tag) => (
                  <label key={tag.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={tag.id}
                      checked={form.tags.includes(tag.id)}
                      onChange={(e) => {
                        const tagId = parseInt(e.target.value);
                        if (e.target.checked) {
                          setForm({ ...form, tags: [...form.tags, tagId] });
                        } else {
                          setForm({
                            ...form,
                            tags: form.tags.filter((t) => t !== tagId),
                          });
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span>{tag.nama}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border px-3 py-2 rounded text-black"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="bg-black hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                {selected ? "Update Artikel" : "Simpan Artikel"}
              </button>
              {selected && (
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    resetForm();
                  }}
                  className="ml-3 bg-black text-white px-4 py-2 rounded-lg"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* My Artikel */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-4">My Artikel</h2>
          {loading ? (
            <p>Loading...</p>
          ) : myArtikel.length === 0 ? (
            <p className="text-gray-500">Belum ada artikel buatanmu</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Judul</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Kategori</th>
                    <th className="p-2 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {myArtikel.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{a.judul}</td>
                      <td className="p-2 border">{a.status}</td>
                      <td className="p-2 border">{a.kategori?.nama || "-"}</td>
                      <td className="p-2 border space-x-2">
                        {canManage(a) && (
                          <>
                            <button
                              onClick={() => handleEdit(a)}
                              className="px-2 py-1 text-sm bg-black text-white rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(a.id)}
                              className="px-2 py-1 text-sm bg-black text-white rounded"
                            >
                              Hapus
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Public Artikel */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-4">Public Artikel</h2>
          {loading ? (
            <p>Loading...</p>
          ) : publicArtikel.length === 0 ? (
            <p className="text-gray-500">Belum ada artikel publish</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Judul</th>
                    <th className="p-2 border">Author</th>
                    <th className="p-2 border">Kategori</th>
                    <th className="p-2 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {publicArtikel.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{a.judul}</td>
                      <td className="p-2 border">{a.author?.username || "-"}</td>
                      <td className="p-2 border">{a.kategori?.nama || "-"}</td>
                      <td className="p-2 border space-x-2">
                        {canManage(a) && (
                          <>
                            <button
                              onClick={() => handleEdit(a)}
                              className="px-2 py-1 text-sm bg-black text-white rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(a.id)}
                              className="px-2 py-1 text-sm bg-black text-white rounded"
                            >
                              Hapus
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
